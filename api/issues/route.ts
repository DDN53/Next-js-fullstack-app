import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { PrismaClient } from "@prisma/client"; // Correct import for Prisma Client

const prisma = new PrismaClient();

const createUserSchema = z.object({
  name: z.string().min(1).max(255),
  email: z.string().min(1).email(),
  password: z.string().min(6),
});

const createIssueSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate user data
    const userValidation = createUserSchema.safeParse(body.user);
    if (!userValidation.success) {
      return NextResponse.json(userValidation.error.errors, { status: 400 });
    }

    // Validate issue data
    const issueValidation = createIssueSchema.safeParse(body.issue);
    if (!issueValidation.success) {
      return NextResponse.json(issueValidation.error.errors, { status: 400 });
    }

    // Create User
    const newUser = await prisma.user.create({
      data: {
        name: body.user.name,
        email: body.user.email,
        password: body.user.password, // Make sure to hash the password before storing
      },
    });

    // Create Issue with the new user's ID
    const newIssue = await prisma.issue.create({
      data: {
        title: body.issue.title,
        description: body.issue.description,
        authorId: newUser.id, // Link issue to the newly created user
      },
    });

    return NextResponse.json({ newUser, newIssue }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An error occurred while creating the user and issue." },
      { status: 500 }
    );
  }
}
