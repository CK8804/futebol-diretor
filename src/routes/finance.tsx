import { createFileRoute } from '@tanstack/react-router'
import { ManagementPage } from '@/components/ManagementPage'
export const Route = createFileRoute('/finance')({ head: () => ({ meta: [{ title: 'Finanças · Futebol Diretor Pro' }] }), component: () => <ManagementPage module="finance" /> })
