import mongoose, { Document, Schema } from 'mongoose';

export interface ILedger extends Document {
  customer_id: mongoose.Types.ObjectId; // Relacionamento com a coleção subscriptions
  amount: number;
  date: Date;
  status: 'PAID' | 'FAILED';
}

const LedgerSchema: Schema = new Schema({
  customer_id: {
    type: Schema.Types.ObjectId,
    ref: 'Subscription', // Mongoose População (Relacionamento Lógico)
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['PAID', 'FAILED'],
    required: true,
  }
});

// Índice para buscas rápidas de faturas de um mesmo cliente ordenado por data
LedgerSchema.index({ customer_id: 1, date: -1 });

export const LedgerModel = mongoose.model<ILedger>('BillingLedger', LedgerSchema);
