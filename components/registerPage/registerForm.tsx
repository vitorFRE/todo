'use client'

import axios from 'axios'
import { toast } from 'react-hot-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const formSchema = z.object({
	username: z.string().min(2, {
		message: 'O nome deve conter pelo menos 2 letras'
	}),
	email: z.string().email({ message: 'Informe um email valido.' }),
	password: z.string().min(6, {
		message: 'Senha deve conter no minimo 6 caracteres'
	})
})

export function RegisterForm() {
	const [isLoading, setIsloading] = useState(false)
	const router = useRouter()

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: '',
			email: '',
			password: ''
		}
	})

	function onSubmit(values: z.infer<typeof formSchema>) {
		setIsloading(true)
		console.log(values)

		axios
			.post('/api/register', values)
			.then(() => {
				toast.success('Conta criada')
				router.push('/login')
			})
			.catch((error) => {
				toast.error('Deu algum erro ao se cadastrar')
			})
			.finally(() => {
				setIsloading(false)
			})
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4'>
				<FormField
					control={form.control}
					name='username'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Nome</FormLabel>
							<FormControl>
								<Input placeholder='Nome' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input placeholder='Email' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='password'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Senha</FormLabel>
							<FormControl>
								<Input type='password' placeholder='Senha' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button disabled={isLoading} type='submit'>
					Cadastrar
				</Button>
			</form>
		</Form>
	)
}
