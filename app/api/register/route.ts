import prisma from '@/utils/prismadb'
import bcrypt from 'bcrypt'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
	const body = await request.json()
	const { email, name, password } = body

	const existUser = await prisma.user.findUnique({
		where: {
			email: email
		}
	})

	if (existUser) {
		return NextResponse.json(
			{ error: 'Parece que essa conta ja existe' },
			{ status: 400 }
		)
	}

	const hashedPassword = await bcrypt.hash(password, 12)

	const user = await prisma.user.create({
		data: {
			email,
			name,
			hashedPassword
		}
	})

	return NextResponse.json(user)
}
