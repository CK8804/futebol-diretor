import { useMemo, useState } from 'react'
import { ArrowRight, BriefcaseBusiness, Plus, Shield, Trash2, Trophy, Users } from 'lucide-react'

export type Career = { id: string; managerName: string; club: string; clubCode: string; createdAt: string; day: number }

type TeamOption = { name: string; code: string; city: string; colors: string; style: string; budget: string; objective: string }

const teams: TeamOption[] = [
  { name: 'Aurora FC', code: 'AFC', city: 'São Paulo', colors: 'Laranja · âmbar', style: 'Projeto equilibrado', budget: 'R$ 7,2 mi', objective: 'Terminar no Top 8' },
  { name: 'Náutico Central', code: 'NAC', city: 'Recife', colors: 'Vermelho · branco', style: 'Reconstrução ambiciosa', budget: 'R$ 3,8 mi', objective: 'Acesso à primeira divisão' },
  { name: 'Serra Azul', code: 'SAZ', city: 'Belo Horizonte', colors: 'Azul · dourado', style: 'Base e desenvolvimento', budget: 'R$ 5,1 mi', objective: 'Revelar 2 jovens titulares' },
]

const STORAGE_KEY = 'futebol-diretor-careers-v1'

function readCareers(): Career[] {
  if (typeof window === 'undefined') return []
  try { return JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? '[]') as Career[] } catch { return [] }
}

export function CareerStartScreen({ onStart }: { onStart: (career: Career) => void }) {
  const [careers, setCareers] = useState<Career[]>(readCareers)
  const [creating, setCreating] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [team, setTeam] = useState(teams[0].name)
  const selectedTeam = useMemo(() => teams.find((item) => item.name === team) ?? teams[0], [team])

  const createCareer = () => {
    const managerName = `${firstName.trim()} ${lastName.trim()}`.trim()
    if (!firstName.trim() || !lastName.trim()) return
    const career: Career = { id: crypto.randomUUID(), managerName, club: selectedTeam.name, clubCode: selectedTeam.code, createdAt: new Date().toISOString(), day: 4 }
    const next = [career, ...careers]
    setCareers(next)
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    window.localStorage.setItem('futebol-diretor-active-career', career.id)
    onStart(career)
  }

  const removeCareer = (id: string) => {
    const next = careers.filter((career) => career.id !== id)
    setCareers(next)
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  }

  return <main className="min-h-dvh bg-sidebar px-5 py-8 text-sidebar-foreground md:px-10 md:py-12"><div className="mx-auto max-w-6xl"><div className="mb-12 flex items-center gap-3"><div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sidebar-primary text-sm font-black text-sidebar-primary-foreground">FDP</div><div><p className="font-serif text-xl leading-none">Futebol Diretor Pro</p><p className="mt-1 text-[10px] uppercase tracking-[0.24em] text-sidebar-foreground/55">Sua carreira começa aqui</p></div></div><div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start"><section><p className="text-xs font-bold uppercase tracking-[0.24em] text-sidebar-primary">Modo carreira</p><h1 className="mt-3 max-w-xl font-serif text-5xl leading-[1.05] tracking-tight md:text-6xl">O próximo grande diretor pode ser você.</h1><p className="mt-5 max-w-lg text-sm leading-6 text-sidebar-foreground/65">Escolha um save existente ou crie uma nova carreira. Cada decisão financeira, esportiva e política muda o futuro do clube.</p><div className="mt-8 grid grid-cols-3 gap-3"><MiniStat icon={Trophy} label="6 ligas" /><MiniStat icon={Users} label="380 clubes" /><MiniStat icon={Shield} label="Mundo vivo" /></div></section><section className="rounded-2xl border border-sidebar-border bg-sidebar-accent/45 p-5 shadow-lg md:p-7">{!creating ? <><div className="flex items-center justify-between"><div><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-sidebar-primary">Seus saves</p><h2 className="mt-2 font-serif text-2xl">Escolha uma carreira</h2></div><button onClick={() => setCreating(true)} className="flex items-center gap-2 rounded-lg bg-sidebar-primary px-3 py-2 text-xs font-bold text-sidebar-primary-foreground hover:opacity-90"><Plus className="h-4 w-4" />Nova carreira</button></div><div className="mt-6 space-y-3">{careers.length === 0 && <div className="rounded-xl border border-dashed border-sidebar-border p-8 text-center"><BriefcaseBusiness className="mx-auto h-7 w-7 text-sidebar-primary" /><p className="mt-3 text-sm font-semibold">Nenhum save criado ainda</p><p className="mt-1 text-xs text-sidebar-foreground/55">Comece sua primeira carreira agora.</p></div>}{careers.map((career) => <div key={career.id} className="flex items-center gap-3 rounded-xl border border-sidebar-border bg-sidebar p-4"><div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sidebar-primary text-xs font-black text-sidebar-primary-foreground">{career.clubCode}</div><div className="min-w-0 flex-1"><p className="truncate text-sm font-bold">{career.managerName}</p><p className="mt-1 text-xs text-sidebar-foreground/55">{career.club} · Dia {career.day}</p></div><button onClick={() => onStart(career)} className="rounded-lg p-2 text-sidebar-primary hover:bg-sidebar-accent" aria-label={`Continuar carreira de ${career.managerName}`}><ArrowRight className="h-4 w-4" /></button><button onClick={() => removeCareer(career.id)} className="rounded-lg p-2 text-sidebar-foreground/45 hover:bg-destructive/20 hover:text-destructive" aria-label="Excluir save"><Trash2 className="h-4 w-4" /></button></div>)}</div></> : <NewCareer firstName={firstName} lastName={lastName} team={team} selectedTeam={selectedTeam} onFirstName={setFirstName} onLastName={setLastName} onTeam={setTeam} onBack={() => setCreating(false)} onCreate={createCareer} />}</section></div><p className="mt-12 text-center text-[10px] uppercase tracking-[0.2em] text-sidebar-foreground/35">Simulação sandbox · dados fictícios para sua experiência de gestão</p></div></main>
}

function NewCareer({ firstName, lastName, team, selectedTeam, onFirstName, onLastName, onTeam, onBack, onCreate }: { firstName: string; lastName: string; team: string; selectedTeam: TeamOption; onFirstName: (value: string) => void; onLastName: (value: string) => void; onTeam: (value: string) => void; onBack: () => void; onCreate: () => void }) { return <div><div className="flex items-center justify-between"><div><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-sidebar-primary">Novo save</p><h2 className="mt-2 font-serif text-2xl">Monte sua identidade</h2></div><button onClick={onBack} className="text-xs font-bold text-sidebar-foreground/60 hover:text-sidebar-foreground">Voltar</button></div><div className="mt-6 grid gap-4 sm:grid-cols-2"><label className="text-xs font-bold">Nome<input value={firstName} onChange={(event) => onFirstName(event.target.value)} className="mt-2 w-full rounded-lg border border-sidebar-border bg-sidebar px-3 py-3 text-sm font-normal text-sidebar-foreground outline-none focus:border-sidebar-primary" placeholder="Ex.: Davi" /></label><label className="text-xs font-bold">Sobrenome<input value={lastName} onChange={(event) => onLastName(event.target.value)} className="mt-2 w-full rounded-lg border border-sidebar-border bg-sidebar px-3 py-3 text-sm font-normal text-sidebar-foreground outline-none focus:border-sidebar-primary" placeholder="Ex.: Vasconcelos" /></label></div><p className="mt-7 text-xs font-bold">Escolha seu primeiro clube</p><div className="mt-3 grid gap-3">{teams.map((item) => <button key={item.name} onClick={() => onTeam(item.name)} className={`rounded-xl border p-4 text-left transition ${team === item.name ? 'border-sidebar-primary bg-sidebar-primary/15 ring-1 ring-sidebar-primary' : 'border-sidebar-border bg-sidebar hover:bg-sidebar-accent'}`}><div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sidebar-primary text-[10px] font-black text-sidebar-primary-foreground">{item.code}</div><div className="flex-1"><p className="text-sm font-bold">{item.name}</p><p className="mt-1 text-xs text-sidebar-foreground/55">{item.city} · {item.style}</p></div><span className="text-xs font-black text-sidebar-primary">{item.budget}</span></div><p className="mt-3 text-[11px] text-sidebar-foreground/55">Meta: {item.objective} · {item.colors}</p></button>)}</div><button disabled={!firstName.trim() || !lastName.trim()} onClick={onCreate} className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-sidebar-primary px-4 py-3 text-sm font-bold text-sidebar-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40">Começar carreira com {selectedTeam.name}<ArrowRight className="h-4 w-4" /></button></div>}
function MiniStat({ icon: Icon, label }: { icon: typeof Trophy; label: string }) { return <div className="rounded-xl border border-sidebar-border bg-sidebar-accent/45 p-3"><Icon className="h-4 w-4 text-sidebar-primary" /><p className="mt-3 text-[10px] font-bold uppercase tracking-wider text-sidebar-foreground/55">{label}</p></div> }
