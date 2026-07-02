import dbConnect from "@/lib/db";
import Admin, { IAdmin } from "@/lib/models/Admin";
import bcrypt from "bcryptjs";

export async function findAdminByEmail(email: string): Promise<IAdmin | null> {
  await dbConnect();
  return Admin.findOne({ email: email.toLowerCase() }).exec();
}

export async function seedAdminUser(adminData: Partial<IAdmin>): Promise<IAdmin> {
  await dbConnect();

  if (!adminData.email || !adminData.password) {
    throw new Error("Email and password are required for seeding");
  }

  const existingAdmin = await Admin.findOne({ email: adminData.email.toLowerCase() });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(adminData.password, salt);

  const finalAdminData = {
    ...adminData,
    email: adminData.email.toLowerCase(),
    password: hashedPassword,
  };

  if (existingAdmin) {
    // Update existing
    Object.assign(existingAdmin, finalAdminData);
    return existingAdmin.save();
  } else {
    // Create new
    const newAdmin = new Admin(finalAdminData);
    return newAdmin.save();
  }
}
