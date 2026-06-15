import express, { Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import { CarModel } from './schemas/CarSchema';

dotenv.config();

export const app = express();
app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_URI || "mongodb://localhost:27017/esr_lab_db";

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ESR Rule Lab API',
      version: '1.0.0',
      description: `
Esta API testa as otimizações do banco de dados na construção de índices.
Abaixo você encontra as rotas para testar a busca rápida (ESR) versus a busca com In-Memory Sort lento (ERS).

### Mermaid Diagram
\`\`\`mermaid
erDiagram
    CAR {
        ObjectId _id PK
        string manufacturer "Equality (= 'Ford')"
        string model "Sort (.sort({model: 1}))"
        number cost "Range ($gt: 15000)"
        string status "Enum ('New', 'Used')"
        number year
    }
\`\`\`
      `,
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3001}`,
      },
    ],
  },
  apis: ['./src/server.ts'], // Lendo a própria rota para gerar os docs
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * components:
 *   schemas:
 *     Car:
 *       type: object
 *       properties:
 *         manufacturer:
 *           type: string
 *           example: "Ford"
 *         model:
 *           type: string
 *           example: "Fiesta"
 *         cost:
 *           type: number
 *           example: 25000.50
 *         status:
 *           type: string
 *           enum: [New, Used]
 *           example: "Used"
 *         year:
 *           type: integer
 *           example: 2018
 */

/**
 * @swagger
 * /api/cars/sample:
 *   get:
 *     summary: Inspeciona o Banco de Dados
 *     description: Traz 10 carros gerados no seed para você ver como a coleção foi populada.
 *     responses:
 *       200:
 *         description: Array de carros
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Car'
 */
app.get('/api/cars/sample', async (req: Request, res: Response) => {
  try {
    const cars = await CarModel.find().limit(10);
    res.json(cars);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/search/bad-index:
 *   get:
 *     summary: Testa Índice Ruim (ERS)
 *     description: Executa a busca forçando o uso de um índice que não respeita a Regra ESR. Isso causará um In-Memory Sort no Mongo.
 *     responses:
 *       200:
 *         description: Retorna as estatísticas do executionStats
 */
app.get('/api/search/bad-index', async (req: Request, res: Response) => {
  try {
    const cursor = CarModel.find({
      manufacturer: "Ford",
      cost: { $gt: 15000 }
    })
    .sort({ model: 1 })
    .hint("idx_ers_bad"); 

    const explain: any = await cursor.explain("executionStats");
    
    res.json({
      success: true,
      indexUsed: "idx_ers_bad (ERS)",
      executionStats: {
        nReturned: explain.executionStats.nReturned,
        totalKeysExamined: explain.executionStats.totalKeysExamined,
        totalDocsExamined: explain.executionStats.totalDocsExamined,
        executionTimeMillis: explain.executionStats.executionTimeMillis,
        hasInMemorySort: JSON.stringify(explain.queryPlanner).includes("SORT")
      }
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/search/good-index:
 *   get:
 *     summary: Testa Índice Perfeito (ESR)
 *     description: Executa a busca forçando o índice perfeito, onde Equality -> Sort -> Range são respeitados, otimizando CPU.
 *     responses:
 *       200:
 *         description: Retorna as estatísticas super performáticas do executionStats
 */
app.get('/api/search/good-index', async (req: Request, res: Response) => {
  try {
    const cursor = CarModel.find({
      manufacturer: "Ford",
      cost: { $gt: 15000 }
    })
    .sort({ model: 1 })
    .hint("idx_esr_good");

    const explain: any = await cursor.explain("executionStats");
    
    res.json({
      success: true,
      indexUsed: "idx_esr_good (ESR)",
      executionStats: {
        nReturned: explain.executionStats.nReturned,
        totalKeysExamined: explain.executionStats.totalKeysExamined,
        totalDocsExamined: explain.executionStats.totalDocsExamined,
        executionTimeMillis: explain.executionStats.executionTimeMillis,
        hasInMemorySort: JSON.stringify(explain.queryPlanner).includes("SORT")
      }
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Apenas escuta a porta se não for importado em testes (Jest)
if (require.main === module) {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, async () => {
    console.log(`Servidor ESR rodando na porta ${PORT}...`);
    console.log(`👉 Swagger UI disponível em: http://localhost:${PORT}/api-docs`);
    try {
      await mongoose.connect(uri);
      console.log("Conectado ao MongoDB via Mongoose!");
    } catch (e) {
      console.error(e);
    }
  });
}
