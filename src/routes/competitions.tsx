import { createFileRoute } from '@tanstack/react-router'
import { ManagementPage } from '@/components/ManagementPage'
export const Route = createFileRoute('/competitions')({ head: () => ({ meta: [{ title: 'Competições · Futebol Diretor Pro' }] }), component: () => <ManagementPage module="competitions" /> })
