import { NextResponse } from 'next/server'
import prisma from '@/utils/prismadb'
import getCurrentUser from '@/app/actions/getCurrentUser'

export async function POST(request: Request) {
	const currentUser = await getCurrentUser()

	if (!currentUser) {
		return NextResponse.error()
	}

	const body = await request.json()

	const { title, description } = body

	const task = await prisma.task.create({
		data: {
			title,
			description,
			userId: currentUser.id,
			completed: false
		}
	})

	return NextResponse.json(task)
}
