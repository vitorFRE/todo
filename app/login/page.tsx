import { LoginForm } from '@/components/loginPage/loginForm'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'

const Login = () => {
	return (
		<main className='grid grid-cols-1 lg:grid-cols-2 min-h-screen'>
			<div className='hidden bg-auth-bg bg-cover lg:flex justify-center items-center relative'>
				<picture className='z-20'>
					<img src='/images/logo.svg' alt='Logo Draft' />
				</picture>
				<div className='absolute inset-0 bg-black opacity-50 z-10'></div>
			</div>

			<section className='bg-white flex flex-col justify-center items-center mx-4'>
				<div>
					<div className='flex flex-col gap-1 mb-4'>
						<h1 className='text-slate-900 text-2xl font-bold'>Entrar</h1>
						<p className='text-neutral-500 font-medium'>
							Seja eficiente, seja Draft. seu parceiro de organização.
						</p>
					</div>
					<LoginForm />
					<Separator className='my-6' />
					<div className='flex justify-between'>
						<p className='text-slate-900 font-medium'>Não tem uma conta ?</p>
						<Link href={'/cadastro'} className='text-purple-700 font-semibold'>
							Cadastre-se
						</Link>
					</div>
				</div>
			</section>
		</main>
	)
}

export default Login
