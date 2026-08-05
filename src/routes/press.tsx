import { createFileRoute } from '@tanstack/react-router'
import { ManagementPage } from '@/components/ManagementPage'
export const Route = createFileRoute('/press')({ head: () => ({ meta: [{ title: 'Imprensa · Futebol Diretor Pro' }] }), component: () => <ManagementPage module="press" /> })
