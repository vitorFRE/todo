import { NextResponse } from 'next/server'
import prisma from '@/utils/prismadb'
import getCurrentUser from '@/app/actions/getCurrentUser'

export async function PUT(request: Request, { params }: { params: { id: string } }) {
	const currentUser = await getCurrentUser()

	if (!currentUser) {
		return NextResponse.error()
	}

	const { id } = params
	const body = await request.json()

	const { title, description, completed } = body

	try {
		const updatedTask = await prisma.task.update({
			where: { id: id },
			data: {
				title: title,
				description: description,
				completed: completed
			}
		})

		return NextResponse.json({})
	} catch (error) {
		return NextResponse.json({ error: 'Houve um erro' })
	}
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
	const currentUser = await getCurrentUser()

	if (!currentUser) {
		return NextResponse.error()
	}

	const { id } = params

	try {
		const deleteTask = await prisma.task.delete({
			where: {
				id: id
			}
		})

		return NextResponse.json({})
	} catch (error) {
		return NextResponse.json({ error: 'Houve um erro' })
	}
}
