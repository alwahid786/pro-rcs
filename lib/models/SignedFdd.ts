import mongoose, { Schema, Document } from "mongoose";

export interface ISignaturePlacement {
  page: number;
  x: number;
  y: number;
  canvasWidth: number;
  canvasHeight: number;
  type?: "signature" | "title" | "printedName" | "date";
  textValue?: string;
}

export interface ISignedFdd extends Document {
  fddId: mongoose.Types.ObjectId;
  documentVersion: string;
  originalPdfPath: string;
  firstName: string;
  lastName: string;
  email: string;
  number?: string;
  jobTitle?: string;
  country: string;
  state: string;
  location: string;
  signedPdfPath: string;
  signedDocumentHash: string;
  ipAddress: string;
  userAgent: string;
  status: "pending" | "completed" | "rejected";
  signatures: ISignaturePlacement[];
  signatureImage: string;
  signedAt: Date;
}

const SignedFddSchema: Schema = new Schema(
  {
    fddId: { type: Schema.Types.ObjectId, ref: "Fdd", required: true },
    documentVersion: { type: String, required: true },
    originalPdfPath: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    number: { type: String },
    jobTitle: { type: String, default: "" },
    country: { type: String, required: true },
    state: { type: String, required: true },
    location: { type: String, required: true },
    signedPdfPath: { type: String, required: true },
    signedDocumentHash: { type: String, required: true },
    ipAddress: { type: String, required: true },
    userAgent: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "completed", "rejected"],
      default: "completed",
      required: true,
    },
    signatures: [
      {
        page: { type: Number, required: true },
        x: { type: Number, required: true },
        y: { type: Number, required: true },
        canvasWidth: { type: Number, required: true },
        canvasHeight: { type: Number, required: true },
        type: { type: String, default: "signature" },
        textValue: { type: String, default: "" },
      }
    ],
    signatureImage: { type: String, default: "" },
    signedAt: { type: Date, default: Date.now },
  }
);

export default mongoose.models.SignedFdd || mongoose.model<ISignedFdd>("SignedFdd", SignedFddSchema);
