import prisma from '@/utils/prismadb'
import getCurrentUser from './getCurrentUser'

export default async function getTask() {
	const currentUser = await getCurrentUser()

	if (!currentUser) {
		return null
	}

	try {
		const tasks = await prisma.task.findMany({
			where: {
				userId: currentUser.id
			}
		})

		return tasks
	} catch (error: any) {
		throw new Error(error)
	}
}
