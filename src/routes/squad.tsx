import { createFileRoute } from '@tanstack/react-router'
import { ManagementPage } from '@/components/ManagementPage'
export const Route = createFileRoute('/squad')({ head: () => ({ meta: [{ title: 'Elenco & staff · Futebol Diretor Pro' }] }), component: () => <ManagementPage module="squad" /> })
