import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongoDB";

export async function POST(req) {
  try {
    const { email, verify } = await req.json();

    if (!email || !verify) {
      return NextResponse.json(
        { message: "البريد الإلكتروني ورمز التحقق مطلوبان" },
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();
    const usersCollection = db.collection("users");

    const result = await usersCollection.updateOne(
      { email: email },
      { $set: { verifyCode: verify, verified: true } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ message: "Email Not Found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Email Verified Successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Something Is Wrong ", error);
    return NextResponse.json(
      { message: "Something Is Wrong" },
      { status: 500 }
    );
  }
}
