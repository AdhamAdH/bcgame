import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongoDB";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();
    const usersCollection = db.collection("users");

    // // تشفير كلمة المرور قبل حفظها
    // const hashedPassword = await bcrypt.hash(password, 10); // 10 هي قيمة "salt rounds"

    // حفظ المستخدم الجديد في قاعدة البيانات
    const result = await usersCollection.insertOne({
      email,
      password,
      createdAt: new Date(),
    });

    // إذا كنت تستخدم TypeScript وتتعامل مع أنواع، يمكنك تعريف واجهة للمستخدم
    // interface User {
    //   _id: ObjectId;
    //   email: string;
    //   password: string;
    //   createdAt: Date;
    // }

    return NextResponse.json(
      { message: "User registered successfully", userId: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error during registration:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
