'use client'

import { LogOut } from 'lucide-react'
import { signOut } from 'next-auth/react'
import { ModeToggle } from '../modeToggle'
import { Button } from '@/components/ui/button'
import { useTheme } from 'next-themes'

export const NavBar = () => {
	const { theme } = useTheme()

	let imageUrl = '/images/logodark.svg'
	if (theme === 'dark') {
		imageUrl = '/images/logo.svg'
	}

	return (
		<header className='max-w-[1000px]  mx-auto xl:px-20 md:px-10 sm:px-2 px-4 flex justify-between items-center'>
			<picture>
				<img src={imageUrl} alt='Logo Draft' />
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
