import request from 'supertest';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { app } from '../src/server';
import { SubscriptionModel } from '../src/schemas/SubscriptionSchema';
import { LedgerModel } from '../src/schemas/LedgerSchema';

dotenv.config();

const customerId = "cust_999";

beforeAll(async () => {
  const uri = process.env.MONGO_URI || "mongodb://localhost:27017/billlens_db";
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.connection.close();
});

// Reseta o estado do banco antes de cada teste
beforeEach(async () => {
  await SubscriptionModel.updateOne(
    { customer_id: customerId },
    { $set: { balance: 100.00 } },
    { upsert: true }
  );
  await LedgerModel.deleteMany({});
});

describe("BillLens Transaction API Tests", () => {
  
  it("Deve debitar a carteira e criar a fatura em uma Transação bem-sucedida", async () => {
    const response = await request(app).post('/api/billing/charge-success');
    expect(response.status).toBe(200);

    // Validação no Banco de Dados
    const sub = await SubscriptionModel.findOne({ customer_id: customerId });
    expect(sub?.balance).toBe(50.00); // 100 - 50 = 50

    const ledgers = await LedgerModel.find({});
    expect(ledgers.length).toBe(1); // Fatura foi gerada
  });

  it("Deve reverter o débito (Rollback) caso a transação falhe no meio", async () => {
    const response = await request(app).post('/api/billing/charge-fail');
    // Nosso erro proposital joga 500
    expect(response.status).toBe(500);

    // Validação no Banco de Dados (A mágica do ACID)
    const sub = await SubscriptionModel.findOne({ customer_id: customerId });
    // O saldo tem que ter voltado a ser 100!
    expect(sub?.balance).toBe(100.00); 

    const ledgers = await LedgerModel.find({});
    expect(ledgers.length).toBe(0); // Nenhuma nota fantasma foi gerada
  });

});
