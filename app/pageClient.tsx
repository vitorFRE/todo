'use client'

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/dialog'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select'
import { NavBar } from '@/components/navbar/navBar'
import Container from '@/components/container'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'

import { Plus } from 'lucide-react'
import { Task, User } from '@prisma/client'

import { toast } from 'react-hot-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { useState } from 'react'
import axios from 'axios'
import { TaskPopover } from '@/components/task/taskPopover'
import { useRouter } from 'next/navigation'

const formSchema = z.object({
	title: z.string().min(5, {
		message: 'O titulo deve conter pelo menos 5 letras'
	}),
	description: z.string().min(5, {
		message: 'A descrição deve conter pelo menos 5 letras'
	})
})

interface PageClientProps {
	currentUser?: User | null
	tasks: Task[] | null
}

export default function PageClient({ currentUser, tasks }: PageClientProps) {
	const [isLoading, setIsloading] = useState(false)
	const [open, setOpen] = useState(false)
	const router = useRouter()
	const [filter, setFilter] = useState('all')

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: '',
			description: ''
		}
	})

	function onSubmit(values: z.infer<typeof formSchema>) {
		setIsloading(true)

		axios
			.post('/api/task', values)
			.then(() => {
				toast.success('Tarefa criada :D')
				setOpen(false)
				router.refresh()
				form.reset()
			})
			.catch((error) => {
				toast.error('Ocorreu um erro. Tente novamente mais tarde.')
			})
			.finally(() => {
				setIsloading(false)
			})
	}

	const filteredTasks = tasks?.filter((task) => {
		if (filter === 'completed') {
			return task.completed === true
		} else if (filter === 'pending') {
			return task.completed === false
		} else {
			return true
		}
	})

	return (
		<main className='relative min-h-screen'>
			<div className='bg-auth-bg bg-center bg-cover min-h-[280px] w-full absolute top-0 -z-10'>
				<div className='absolute inset-0 bg-white dark:bg-black opacity-50'></div>
				<div className='absolute inset-0 bg-gradient-to-r from-[#2c0049cc] md:from-[#310051cc]'></div>
			</div>
			<div className='bg-white dark:bg-slate-950 '>
				<NavBar />
			</div>
			<Container>
				<Dialog open={open} onOpenChange={setOpen}>
					<DialogTrigger asChild>
						<Button className='flex items-center justify-between w-full mt-[71px]'>
							Criar nova tarefa
							<Plus className='mr-2 h-4 w-4' />
						</Button>
					</DialogTrigger>
					<DialogContent className='sm:max-w-[425px]'>
						<DialogHeader>
							<DialogTitle>Tarefa</DialogTitle>
							<DialogDescription>Crie uma nova tarefa</DialogDescription>
						</DialogHeader>
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className='flex flex-col gap-4'>
								<FormField
									control={form.control}
									name='title'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Titulo</FormLabel>
											<FormControl>
												<Input placeholder='Titulo' {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='description'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Descrição</FormLabel>
											<FormControl>
												<Textarea placeholder='Descrição' {...field} />
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
					</DialogContent>
				</Dialog>
				<div className='mt-[108px] flex items-center justify-between'>
					<h1 className='font-semibold text-2xl'>Lista</h1>
					<Select
						onValueChange={(e) => {
							setFilter(e)
						}}>
						<SelectTrigger className='w-[180px]'>
							<SelectValue placeholder='Filtros' />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectItem value='all'>Todas</SelectItem>
								<SelectItem value='completed'>Concluidas</SelectItem>
								<SelectItem value='pending'>Pendentes</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
				<div className='mt-11 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
					{filteredTasks?.map((task) => (
						<TaskPopover
							description={task.description}
							taskId={task.id}
							status={task.completed}
							title={task.title}
							key={task.title}
						/>
					))}
				</div>
			</Container>
		</main>
	)
}
