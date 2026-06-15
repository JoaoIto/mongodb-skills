import request from 'supertest';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { app } from '../src/server';

dotenv.config();

// Conectamos ao banco antes de todos os testes
beforeAll(async () => {
  const uri = process.env.MONGO_URI || "mongodb://localhost:27017/esr_lab_db";
  await mongoose.connect(uri);
});

// Desconectamos após os testes para o Jest não ficar travado
afterAll(async () => {
  await mongoose.connection.close();
});

describe("ESR Rule Lab API Tests", () => {
  
  it("Deve retornar 200 e uma amostra de carros na rota /api/cars/sample", async () => {
    const response = await request(app).get('/api/cars/sample');
    expect(response.status).toBe(200);
    // Verifica se a resposta é um Array
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("O índice Ruim (ERS) deve fazer o MongoDB usar 'In-Memory Sort' (hasInMemorySort = true)", async () => {
    const response = await request(app).get('/api/search/bad-index');
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    
    // A pegadinha da prova comprovada via teste: ERS tem Blocking Sort!
    expect(response.body.executionStats.hasInMemorySort).toBe(true);
  }, 10000); // Timeout maior caso o banco demore

  it("O índice Perfeito (ESR) NÃO deve fazer In-Memory Sort (hasInMemorySort = false)", async () => {
    const response = await request(app).get('/api/search/good-index');
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    
    // A prova de que a Regra ESR otimizou a query e usou o Índice corretamente
    expect(response.body.executionStats.hasInMemorySort).toBe(false);
  });

});
