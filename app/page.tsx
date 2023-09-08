import { redirect } from 'next/navigation'
import getCurrentUser from './actions/getCurrentUser'

export default async function Home() {
	const currentUser = await getCurrentUser()

	if (!currentUser) {
		redirect('/login')
	}

	return (
		<main className='flex min-h-screen flex-col items-center justify-between p-24'>
			<h1>oi</h1>
		</main>
	)
}
