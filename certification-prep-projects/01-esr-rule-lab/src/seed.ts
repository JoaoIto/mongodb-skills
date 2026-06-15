import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { CarModel } from './schemas/CarSchema';

dotenv.config();

const uri = process.env.MONGO_URI || "mongodb://localhost:27017/esr_lab_db";

const manufacturers = ["Ford", "Toyota", "Honda", "Chevrolet", "Nissan", "Volkswagen"];
const statuses = ["New", "Used"];
const models = ["Fiesta", "Focus", "Mustang", "Corolla", "Civic", "Cruze", "Sentra", "Golf"];

const getRandom = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

async function seedDB() {
  try {
    await mongoose.connect(uri);
    console.log("Conectado via Mongoose! Gerando 20.000 carros...");

    // Limpa a coleção e deleta índices antigos para evitar conflitos
    await CarModel.deleteMany({});
    
    // Força a re-criação dos índices pelo Mongoose (syncIndexes)
    await CarModel.syncIndexes();

    const bulkData = [];
    for (let i = 0; i < 20000; i++) {
      bulkData.push({
        manufacturer: getRandom(manufacturers),
        model: getRandom(models),
        cost: Number((Math.random() * 50000 + 5000).toFixed(2)),
        status: getRandom(statuses),
        year: Math.floor(Math.random() * (2025 - 1990) + 1990)
      });
    }

    await CarModel.insertMany(bulkData);
    console.log("✅ Seed finalizado com sucesso!");
    
  } catch (error) {
    console.error("Erro no seed:", error);
  } finally {
    await mongoose.connection.close();
  }
}

seedDB();
