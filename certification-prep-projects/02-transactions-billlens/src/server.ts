import express, { Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import { SubscriptionModel } from './schemas/SubscriptionSchema';
import { LedgerModel } from './schemas/LedgerSchema';

dotenv.config();

export const app = express();
app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_URI || "mongodb://localhost:27017/billlens_db";
const customerId = "cust_999";
const monthlyPlanValue = 50.00;

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'BillLens Transaction API',
      version: '1.0.0',
      description: `
Esta API testa os conceitos de Transações ACID no MongoDB via Mongoose.

### Mermaid Diagram
\`\`\`mermaid
erDiagram
    SUBSCRIPTION ||--o{ BILLING_LEDGER : "gera faturas (ref)"
    
    SUBSCRIPTION {
        ObjectId _id PK
        string customer_id "Unique (ex: cust_999)"
        number balance
    }
    
    BILLING_LEDGER {
        ObjectId _id PK
        ObjectId customer_id FK "Ref: Subscription._id"
        number amount
        date date
        string status "Enum (PAID, FAILED)"
    }
\`\`\`
      `,
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3002}`,
      },
    ],
  },
  apis: ['./src/server.ts'], // Lendo as anotações deste próprio arquivo
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * components:
 *   schemas:
 *     Subscription:
 *       type: object
 *       properties:
 *         customer_id:
 *           type: string
 *           example: "cust_999"
 *         balance:
 *           type: number
 *           example: 100.00
 *     Ledger:
 *       type: object
 *       properties:
 *         customer_id:
 *           type: string
 *           example: "645..."
 *         amount:
 *           type: number
 *           example: 50.00
 *         date:
 *           type: string
 *           format: date-time
 *         status:
 *           type: string
 *           enum: [PAID, FAILED]
 */

// Setup: Garante saldo inicial via Mongoose
async function ensureSeed() {
  try {
    await SubscriptionModel.updateOne(
      { customer_id: customerId },
      { $set: { balance: 100.00 } },
      { upsert: true }
    );
    // Limpa o ledger ao reiniciar para não sujar os testes
    await LedgerModel.deleteMany({});
    console.log(`Seed Mongoose: Saldo inicial do cliente ${customerId} restaurado para $100.00`);
  } catch (err) {
    console.error("Erro no Seed:", err);
  }
}

/**
 * @swagger
 * /api/billing/balance:
 *   get:
 *     summary: Inspeciona a Carteira do Cliente
 *     description: Traz o saldo atual da assinatura do cliente.
 *     responses:
 *       200:
 *         description: O Saldo do Cliente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Subscription'
 */
app.get('/api/billing/balance', async (req: Request, res: Response) => {
  try {
    const doc = await SubscriptionModel.findOne({ customer_id: customerId });
    if (!doc) return res.status(404).json({ error: "Cliente não encontrado" });
    res.json({ customer_id: doc.customer_id, balance: doc.balance });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/billing/ledger:
 *   get:
 *     summary: Inspeciona o Livro-Razão (Histórico de Faturas)
 *     description: Lista todos os pagamentos registrados para verificar se foram gerados corretamente.
 *     responses:
 *       200:
 *         description: Array do Ledger
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Ledger'
 */
app.get('/api/billing/ledger', async (req: Request, res: Response) => {
  try {
    const docs = await LedgerModel.find().populate('customer_id');
    res.json(docs);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/billing/charge-success:
 *   post:
 *     summary: Executa Transação ACID com Sucesso
 *     description: Realiza a dedução do saldo e o registro do pagamento usando transaction session.
 *     responses:
 *       200:
 *         description: Transação confirmada.
 */
app.post('/api/billing/charge-success', async (req: Request, res: Response) => {
  const session = await mongoose.startSession();
  try {
    await session.withTransaction(async () => {
      const subscription = await SubscriptionModel.findOneAndUpdate(
        { customer_id: customerId },
        { $inc: { balance: -monthlyPlanValue } },
        { session, new: true }
      );
      if (!subscription) throw new Error("Cliente não encontrado");

      await LedgerModel.create([{
        customer_id: subscription._id, 
        amount: monthlyPlanValue,
        status: "PAID"
      }], { session });
    });
    res.json({ success: true, message: "Transação efetuada com sucesso via Mongoose!" });
  } catch (err: any) {
    res.status(500).json({ error: "Transação Abortada", details: err.message });
  } finally {
    await session.endSession();
  }
});

/**
 * @swagger
 * /api/billing/charge-fail:
 *   post:
 *     summary: Simula um Transient Error (Teste de Rollback)
 *     description: Tenta fazer a mesma transação, mas lança uma falha após descontar o dinheiro, forçando o Mongoose a ativar o Rollback.
 *     responses:
 *       500:
 *         description: O erro capturado provando a ativação do Rollback.
 */
app.post('/api/billing/charge-fail', async (req: Request, res: Response) => {
  const session = await mongoose.startSession();
  try {
    await session.withTransaction(async () => {
      const subscription = await SubscriptionModel.findOneAndUpdate(
        { customer_id: customerId },
        { $inc: { balance: -monthlyPlanValue } },
        { session, new: true }
      );
      
      // Simulador de Crash
      throw new Error("Conexão perdida com o Gateway de Pagamento! O ORM efetuará o Rollback.");
    });
  } catch (err: any) {
    res.status(500).json({ 
      success: false, 
      error: "Ocorreu um erro e o MongoDB ativou o Rollback automático", 
      details: err.message 
    });
  } finally {
    await session.endSession();
  }
});

// Apenas escuta a porta se não for importado em testes (Jest)
if (require.main === module) {
  const PORT = process.env.PORT || 3002;
  app.listen(PORT, async () => {
    console.log(`Servidor BillLens rodando na porta ${PORT}...`);
    console.log(`👉 Swagger UI disponível em: http://localhost:${PORT}/api-docs`);
    try {
      await mongoose.connect(uri);
      console.log("Conectado ao MongoDB via Mongoose!");
      await ensureSeed();
    } catch (e) {
      console.error(e);
    }
  });
}
