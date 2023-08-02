import { NextResponse } from 'next/server'
import prisma from '@api/prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

export async function GET(req: Request) {
  try {
    console.log(req.url)
    const url = new URL(req.url)
    const searchQuery = url.searchParams.get('q')

    const recipes = searchQuery
      ? await prisma.recipe.findMany({
          where: {
            title: {
              contains: searchQuery,
              mode: 'insensitive',
            },
          },
        })
      : await prisma.recipe.findMany()

    return NextResponse.json(recipes)
  } catch (error) {
    console.log(error)
    return NextResponse.json(error, { status: 500 })
  }
}

export async function POST(req: Request) {
  // const {title}: Partial<Todo> = await request.json()

  try {
    const { title, category, instruction, tags, ingredients } = await req.json()

    if (!title || !category || !ingredients || !instruction)
      return NextResponse.json({ message: 'Missing required data' })

    const tagsValue = tags ?? ''

    const result = await prisma.recipe.create({
      data: {
        title,
        category,
        ingredients,
        instruction,
        tags: tagsValue,
      },
    })

    return NextResponse.json(result)
  } catch (error) {
    console.log(error)
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      // Handling the duplicate title error
      return NextResponse.json(
        { message: 'Recipe with this title already exists' },
        { status: 409 }
      )
    }

    return NextResponse.json(error, { status: 500 })
  }
}
