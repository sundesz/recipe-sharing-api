import prisma from '@api/prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  try {
    // Get the value of the dynamic segment "id" from the URL
    const id = req.url.split('/').pop()
    const recipe = await prisma.recipe.findUnique({
      where: {
        id: String(id),
      },
    })

    return recipe
      ? NextResponse.json(recipe)
      : NextResponse.json({ error: 'Invalid Id' }, { status: 404 })
  } catch (error) {
    return NextResponse.json(error, { status: 500 })
  }
}

interface RequestBody {
  title?: string
  category?: string
  instruction?: string
  tags?: string
  ingredients?: string
}

export async function PUT(req: Request) {
  // Get the value of the dynamic segment "id" from the URL
  const id = req.url.split('/').pop()

  // const {title}: Partial<Todo> = await request.json()

  try {
    const { title, category, instruction, tags, ingredients }: RequestBody =
      await req.json()

    const data: RequestBody = {}

    if (title) {
      data.title = title
    }
    if (category) {
      data.category = category
    }
    if (instruction) {
      data.instruction = instruction
    }
    if (tags) {
      data.tags = tags
    }
    if (ingredients) {
      data.ingredients = ingredients
    }

    if (Object.keys(data).length === 0) {
      return NextResponse.json(
        { message: 'No data to update' },
        { status: 400 }
      )
    }

    const result = await prisma.recipe.update({
      where: { id },
      data,
    })

    return NextResponse.json(result)
  } catch (error) {
    console.log(error)
    if (error instanceof PrismaClientKnownRequestError) {
      // Handling the duplicate title error
      if (error.code === 'P2002') {
        return NextResponse.json(
          { message: 'Recipe with this title already exists' },
          { status: 409 }
        )
      }
      // Handling the Not found error
      if (error.code === 'P2025') {
        return NextResponse.json(
          { message: 'Record to update not found.' },
          { status: 404 }
        )
      }
    }

    return NextResponse.json(error, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    // Get the value of the dynamic segment "id" from the URL
    const id = req.url.split('/').pop()
    const recipe = await prisma.recipe.delete({
      where: {
        id: String(id),
      },
    })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.log(error)
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code == 'P2025'
    ) {
      return NextResponse.json(
        { message: `Record to delete does not exist.` },
        { status: 409 }
      )
    }

    return NextResponse.json(error, { status: 500 })
  }
}
