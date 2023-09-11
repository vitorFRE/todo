'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger
} from '@/components/ui/alert-dialog'

import { TaskCard } from './taskCard'
import { Switch } from '@/components/ui/switch'

import { toast } from 'react-hot-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { useState } from 'react'
import axios from 'axios'
import { Textarea } from '../ui/textarea'
import { useRouter } from 'next/navigation'

interface TaskPopoverProps {
	title: string
	status: boolean
	description: string | null
	taskId: string
}

const formSchema = z.object({
	title: z.string().min(5, {
		message: 'O titulo deve conter pelo menos 5 letras'
	}),
	description: z.string().min(5, {
		message: 'A descrição deve conter pelo menos 5 letras'
	}),
	completed: z.boolean()
})

export const TaskPopover: React.FC<TaskPopoverProps> = ({
	description,
	status,
	title,
	taskId
}) => {
	const [isLoading, setIsloading] = useState(false)
	const router = useRouter()
	const [open, setOpen] = useState(false)

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: title,
			description: description || '',
			completed: status
		}
	})

	function onSubmit(values: z.infer<typeof formSchema>) {
		setIsloading(true)

		console.log(values)

		axios
			.put(`/api/task/${taskId}`, values)
			.then(() => {
				toast.success('Tarefa editada')
				setOpen(false)
				router.refresh()
			})
			.catch(() => {
				toast.error('Ocorreu um erro. Tente novamente mais tarde.')
			})
			.finally(() => {
				setIsloading(false)
			})
	}

	const deleteTask = () => {
		setIsloading(true)
		axios
			.delete(`/api/task/${taskId}`)
			.then(() => {
				toast.success('Tarefa deletada')
				setOpen(false)
				router.refresh()
			})
			.catch(() => {
				toast.error('Ocorreu um erro. Tente novamente mais tarde.')
			})
			.finally(() => {
				setIsloading(false)
			})
	}

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger>
				<TaskCard status={status} title={title} description={description} />
			</PopoverTrigger>
			<PopoverContent sideOffset={-125} className='w-80'>
				<div className='grid gap-4'>
					<div className='space-y-2'>
						<h4 className='font-medium leading-none'>{title}</h4>
						<p className='text-sm text-muted-foreground'>Edite sua tarefa</p>
					</div>
					<div className='grid gap-2'>
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
												<Input {...field} />
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
												<Textarea {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='completed'
									render={({ field }) => (
										<FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
											<div className='space-y-0.5'>
												<FormLabel className='text-base'>Situação da tarefa</FormLabel>
												<FormDescription>
													Marque se voce concluiu a tarefa
												</FormDescription>
											</div>
											<FormControl>
												<Switch
													checked={field.value}
													onCheckedChange={field.onChange}
													aria-readonly
												/>
											</FormControl>
										</FormItem>
									)}
								/>
								<Button disabled={isLoading} type='submit'>
									Salvar
								</Button>
							</form>
						</Form>
						<AlertDialog>
							<AlertDialogTrigger>
								<Button className='w-full' variant={'destructive'}>
									DELETAR
								</Button>
							</AlertDialogTrigger>
							<AlertDialogContent>
								<AlertDialogHeader>
									<AlertDialogTitle>
										Você tem certeza que deseja deletar ?
									</AlertDialogTitle>
									<AlertDialogDescription>
										Se confirmar não será possivel recuperar essa tarefa
									</AlertDialogDescription>
								</AlertDialogHeader>
								<AlertDialogFooter>
									<AlertDialogCancel>Cancelar</AlertDialogCancel>
									<AlertDialogAction onClick={deleteTask}>DELETAR</AlertDialogAction>
								</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialog>
					</div>
				</div>
			</PopoverContent>
		</Popover>
	)
}
