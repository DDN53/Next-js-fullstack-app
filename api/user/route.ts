import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { generateToken } from "@/app/lib/jwt"; // Correct import path for JWT utilities

const prisma = new PrismaClient();

const createUserSchema = z.object({
  name: z.string().min(1).max(255),
  email: z.string().min(1).email(),
  password: z.string().min(6),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate user data
    const userValidation = createUserSchema.safeParse(body);
    if (!userValidation.success) {
      return NextResponse.json(userValidation.error.errors, { status: 400 });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: body.email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists." },
        { status: 400 }
      );
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(body.password, 10);

    // Create User
    const newUser = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: hashedPassword,
      },
    });

    // Generate JWT token
    const token = generateToken({ id: newUser.id, email: newUser.email });

    return NextResponse.json({ user: newUser, token }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An error occurred while creating the user." },
      { status: 500 }
    );
  }
}

export default { POST };
