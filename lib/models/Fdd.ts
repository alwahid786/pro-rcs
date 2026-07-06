import mongoose, { Schema, Document } from "mongoose";

export interface IFdd extends Document {
  title: string;
  version: string;
  restaurantName: string;
  filePath: string;
  downloadName: string;
  fileSize: number;
  documentHash: string;
  country: string;
  state: string;
  isActive: boolean;
  isDeleted: boolean;
  uploadedAt: Date;
  deletedAt: Date | null;
}

const FddSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    version: { type: String, required: true },
    restaurantName: { type: String, default: "" },
    filePath: { type: String, required: true },
    downloadName: { type: String, required: true },
    fileSize: { type: Number, required: true },
    documentHash: { type: String, required: true },
    country: { type: String, default: "" },
    state: { type: String, default: "" },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
    uploadedAt: { type: Date, default: Date.now },
    deletedAt: { type: Date, default: null },
  }
);

if (mongoose.models.Fdd && !mongoose.models.Fdd.schema.paths.restaurantName) {
  delete mongoose.models.Fdd;
}

export default mongoose.models.Fdd || mongoose.model<IFdd>("Fdd", FddSchema);
