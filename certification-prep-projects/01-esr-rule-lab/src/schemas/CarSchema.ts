import mongoose, { Document, Schema } from 'mongoose';

// Interface Typescript para tipagem do documento
export interface ICar extends Document {
  manufacturer: string;
  model: string;
  cost: number;
  status: 'New' | 'Used';
  year: number;
}

// Modelagem do Schema do Mongoose
const CarSchema: Schema = new Schema({
  manufacturer: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
    min: 0,
  },
  status: {
    type: String,
    enum: ['New', 'Used'],
    required: true,
  },
  year: {
    type: Number,
    required: true,
    min: 1900,
    max: 2030,
  }
});

// Criação dos Índices Nativos pelo Mongoose
// Índice Ruim (Equality, Range, Sort)
CarSchema.index({ manufacturer: 1, cost: 1, model: 1 }, { name: 'idx_ers_bad' });

// Índice Bom / Regra ESR (Equality, Sort, Range)
CarSchema.index({ manufacturer: 1, model: 1, cost: 1 }, { name: 'idx_esr_good' });

export const CarModel = mongoose.model<ICar>('Car', CarSchema);
