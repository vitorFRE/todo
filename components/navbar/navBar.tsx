'use client'

import { LogOut as LogOutIcon } from 'lucide-react'
import { signOut } from 'next-auth/react'

export const NavBar = () => {
	return (
		<header className='max-w-[1000px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4 flex justify-between items-center'>
			<picture>
				<img src='/images/logo.svg' alt='Logo Draft' />
			</picture>

			<nav className='py-4'>
				<LogOutIcon onClick={() => signOut()} className='cursor-pointer text-white' />
			</nav>
		</header>
	)
}
