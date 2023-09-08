import AuthProvider from '@/providers/AuthProvider'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import ToasterProvider from '@/providers/ToasterProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Draft - ToDo',
	description: 'Uma simples todo'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='pt-br'>
			<body className={inter.className}>
				<AuthProvider>
					<ToasterProvider />
					{children}
				</AuthProvider>
			</body>
		</html>
	)
}
