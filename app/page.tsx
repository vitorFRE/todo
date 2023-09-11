import { redirect } from 'next/navigation'
import getCurrentUser from './actions/getCurrentUser'
import PageClient from './pageClient'
import getTask from './actions/getTasks'

export default async function Home() {
	const currentUser = await getCurrentUser()
	const tasks = await getTask()

	if (!currentUser) {
		redirect('/login')
	}

	return <PageClient tasks={tasks} />
}
