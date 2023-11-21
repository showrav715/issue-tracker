import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "../../../../prisma/client";

const issheValidation = z.object({
  title: z.string().min(3).max(50),
  description: z.string().min(3).max(250),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = issheValidation.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(),{status:400});
  }

  const newissue = await prisma.issue.create({
    data: { ...body },
  });

  const serializedIssue = {
    ...newissue,
    id: Number(newissue.id),
  };

  return NextResponse.json(serializedIssue);
}

export async function GET(request: NextRequest) {
  const issues = await prisma.issue.findMany({
    orderBy: {
      id: "desc",
    },
  });

  const serializedIssues = issues.map((issue) => ({
    ...issue,
    id: Number(issue.id),
  }));

  return NextResponse.json(serializedIssues, { status: 200 });
}
