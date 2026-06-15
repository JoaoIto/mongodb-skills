import mongoose, { Document, Schema } from 'mongoose';

export interface ISubscription extends Document {
  customer_id: string;
  balance: number;
}

const SubscriptionSchema: Schema = new Schema({
  customer_id: {
    type: String,
    required: true,
    unique: true, // Garante integridade do cliente único
  },
  balance: {
    type: Number,
    required: true,
  }
});

export const SubscriptionModel = mongoose.model<ISubscription>('Subscription', SubscriptionSchema);
