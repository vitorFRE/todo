import { redirect } from 'next/navigation'
import getCurrentUser from './actions/getCurrentUser'
import { NavBar } from '@/components/navbar/navBar'

export default async function Home() {
	const currentUser = await getCurrentUser()

	if (!currentUser) {
		redirect('/login')
	}

	return (
		<main className='relative min-h-screen'>
			<div className='bg-auth-bg bg-center bg-cover min-h-[280px] w-full absolute top-0 -z-10'>
				<div className='absolute inset-0 bg-black opacity-90'></div>
				<div className='absolute inset-0 bg-gradient-to-r from-[#2c0049cc] md:from-[#310051cc]'></div>
			</div>
			<div className='bg-white dark:bg-slate-950'>
				<NavBar />
			</div>
		</main>
	)
}
