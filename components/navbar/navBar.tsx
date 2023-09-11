'use client'

import { LogOut } from 'lucide-react'
import { signOut } from 'next-auth/react'
import { ModeToggle } from '../modeToggle'
import { Button } from '@/components/ui/button'

export const NavBar = () => {
	return (
		<header className='flex justify-between items-center max-w-[1000px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4'>
			<picture>
				<img src='/images/logodark.svg' className='block dark:hidden' alt='Logo Draft' />
				<img src='/images/logo.svg' className='hidden dark:block' alt='Logo Draft' />
			</picture>

			<nav className='flex items-center gap-4 py-4'>
				<ModeToggle />
				<Button variant='ghost' size='icon' onClick={() => signOut()}>
					<LogOut className='h-[1.2rem] w-[1.2rem] ' />
					<span className='sr-only'>Sair da conta</span>
				</Button>
			</nav>
		</header>
	)
}
