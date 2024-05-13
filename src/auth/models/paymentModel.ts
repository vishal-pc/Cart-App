import mongoose, { Document, Schema } from "mongoose";

export interface IPayment extends Document {
  _id: any;
  buyerUserId: Schema.Types.ObjectId;
  totalProduct: Array<{
    _id: any;
    productId: Schema.Types.ObjectId;
    productName: string;
    productPrice: number;
    productQuantity: number;
    productDescription: string;
    cartId: string;
  }>;
  stripeUserId: string;
  totalCartAmount: number;
  paymentStatus: "Pending" | "Completed" | "Canceled";
  stripePayment: string;
  createdAt: Date;
  updatedAt: Date;
}

const PaymentSchema = new mongoose.Schema(
  {
    buyerUserId: {
      type: Schema.Types.ObjectId,
      ref: "Auth",
      required: false,
    },
    totalProduct: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: false,
        },
        productName: {
          type: String,
        },
        productPrice: {
          type: Number,
        },
        productQuantity: {
          type: Number,
        },
        productDescription: {
          type: String,
        },
        cartId: {
          type: String,
        },
      },
    ],
    totalCartAmount: {
      type: Number,
    },
    stripeUserId: {
      type: String,
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Completed", "Canceled"],
      default: "Pending",
    },
    stripePayment: {
      type: Schema.Types.Mixed,
    },
  },
  { timestamps: true }
);

const Payment = mongoose.model<IPayment>("Payment", PaymentSchema);
export default Payment;
