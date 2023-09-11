import { Badge } from '@/components/ui/badge'

interface TaskCardProps {
	title: string
	status: boolean
	description: string | null
}

export const TaskCard: React.FC<TaskCardProps> = ({ title, status, description }) => {
	return (
		<div className='max-w-full sm:max-w-[304px] min-h-[142px] py-4 px-4 border border-black/60 dark:border-white/60 rounded-md'>
			<div className='flex items-center justify-between gap-3'>
				<h3 className='font-medium'>{title}</h3>
				<Badge>{status ? 'Concluído' : 'Pendente'}</Badge>
			</div>
			<p className='text-neutral-500 mt-4'>{description}</p>
		</div>
	)
}
