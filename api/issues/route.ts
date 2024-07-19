import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import createUser from "@/app/api/user/route";

// Usage of userRoute.POST in another part of your application

const prisma = new PrismaClient();

const createIssueSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1),
  authorId: z.string().uuid(), // Ensure this matches the type of ID in your database
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate issue data
    const issueValidation = createIssueSchema.safeParse(body);
    if (!issueValidation.success) {
      return NextResponse.json(issueValidation.error.errors, { status: 400 });
    }

    // Create Issue
    const newIssue = await prisma.issue.create({
      data: {
        title: body.title,
        description: body.description,
        authorId: createUser.POST.name,
      },
    });

    return NextResponse.json(newIssue, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An error occurred while creating the issue." },
      { status: 500 }
    );
  }
}
