import { featuredPlayers, type Player } from '@/game-data'

export type StaffMember = { name: string; role: string; rating: number; salary: number }
export type ClubState = { balance: number; transferBudget: number; squad: Player[]; staff: StaffMember[]; watched: string[]; signed: string[] }

const STORAGE_KEY = 'futebol-diretor-save-v1'

export const initialStaff: StaffMember[] = [
  { name: 'Rafael Nunes', role: 'Treinador principal', rating: 78, salary: 1800000 },
  { name: 'Helena Prado', role: 'Diretora de futebol', rating: 84, salary: 950000 },
  { name: 'Caio Mendonça', role: 'Chefe de scout', rating: 81, salary: 620000 },
  { name: 'Bruno Lacerda', role: 'Preparador físico', rating: 76, salary: 420000 },
]

const starterSquad = featuredPlayers.filter((player) => ['Aurora FC', 'Flamengo', 'Palmeiras', 'Fluminense'].includes(player.club)).slice(0, 7)

export function createInitialState(): ClubState {
  return { balance: 18400000, transferBudget: 7200000, squad: starterSquad, staff: initialStaff, watched: [], signed: [] }
}

export function loadState(): ClubState {
  if (typeof window === 'undefined') return createInitialState()
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) as ClubState : createInitialState()
  } catch { return createInitialState() }
}

export function saveState(state: ClubState) {
  if (typeof window !== 'undefined') window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

export function formatSalary(value: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(value)
}
