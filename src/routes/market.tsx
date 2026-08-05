import { createFileRoute } from '@tanstack/react-router'
import { ManagementPage } from '@/components/ManagementPage'
export const Route = createFileRoute('/market')({ head: () => ({ meta: [{ title: 'Mercado · Futebol Diretor Pro' }] }), component: () => <ManagementPage module="market" /> })
