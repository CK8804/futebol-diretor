import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import {
  ArrowUpRight,
  Banknote,
  Bell,
  CalendarDays,
  ChevronRight,
  CircleDollarSign,
  ClipboardList,
  Gauge,
  Goal,
  LayoutDashboard,
  Newspaper,
  Pause,
  Play,
  Search,
  ShieldAlert,
  Trophy,
  Users,
  WalletCards,
} from 'lucide-react'
import { leagues, featuredPlayers } from '@/game-data'

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: 'Futebol Diretor Pro · Centro de comando' },
      { name: 'description', content: 'Simulador de gestão profissional do Esporte Clube Aurora.' },
    ],
  }),
  component: Dashboard,
})

type AlertItem = { tone: 'red' | 'yellow' | 'green'; label: string; text: string; time: string }

const alerts: AlertItem[] = [
  { tone: 'red', label: 'FINANCEIRO', text: 'A folha salarial está 8,4% acima do orçamento aprovado.', time: 'há 2h' },
  { tone: 'yellow', label: 'VESTIÁRIO', text: 'O capitão Rafael Nunes pediu uma reunião sobre o futuro do treinador.', time: 'há 5h' },
  { tone: 'green', label: 'BASE', text: 'O scout recomenda observar Caio Mendes, 17 anos, do sub-20.', time: 'ontem' },
]

const navItems = [
  { icon: LayoutDashboard, label: 'Centro de comando', href: '/' },
  { icon: Users, label: 'Elenco & staff', href: '/squad' },
  { icon: WalletCards, label: 'Finanças', href: '/finance' },
  { icon: Search, label: 'Mercado', href: '/market' },
  { icon: Trophy, label: 'Competições', href: '/competitions' },
  { icon: Newspaper, label: 'Imprensa & mundo', href: '/press' },
  { icon: Play, label: 'Simulação de jogos', href: '/simulation' },
  { icon: Users, label: 'Base de jogadores', href: '/players' },
]

function formatDate(day: number) {
  return `${String(day).padStart(2, '0')}/08/2026`
}

function Dashboard() {
  const [day, setDay] = useState(4)
  const [activeNav, setActiveNav] = useState('Centro de comando')
  const [isPaused, setIsPaused] = useState(true)
  const [resolved, setResolved] = useState<string[]>([])
  const [showOffer, setShowOffer] = useState(false)

  const resolveAlert = (text: string) => setResolved((current) => [...current, text])

  return (
    <main className="min-h-dvh bg-background text-foreground">
      <div className="flex min-h-dvh">
        <aside className="hidden w-64 shrink-0 flex-col bg-sidebar text-sidebar-foreground lg:flex">
          <div className="border-b border-sidebar-border px-6 py-6">
            <div className="flex items-center gap-3">
              <img src="/club-crests/aurora-fc.svg" alt="Escudo do Aurora FC" className="h-10 w-10 rounded-xl" />
              <div><p className="font-serif text-lg leading-none">Aurora</p><p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-sidebar-foreground/60">Diretor Pro</p></div>
            </div>
          </div>
          <nav className="flex-1 space-y-1 px-3 py-6" aria-label="Navegação principal">
            <p className="px-3 pb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-sidebar-foreground/45">Clube</p>
            {navItems.map(({ icon: Icon, label, href }) => (
              <a key={label} href={href} onClick={() => setActiveNav(label)} className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm transition-all duration-200 hover:translate-x-0.5 hover:bg-sidebar-accent ${activeNav === label ? 'bg-sidebar-accent font-semibold text-sidebar-primary' : 'text-sidebar-foreground/70'}`}>
                <Icon className="h-4 w-4 shrink-0" /><span>{label}</span>{activeNav === label && <ChevronRight className="ml-auto h-3.5 w-3.5" />}
              </a>
            ))}
          </nav>
          <div className="border-t border-sidebar-border p-4"><div className="flex items-center gap-3 rounded-lg bg-sidebar-accent/60 p-3"><div className="flex h-8 w-8 items-center justify-center rounded-full bg-sidebar-primary text-xs font-bold text-sidebar-primary-foreground">DV</div><div className="min-w-0"><p className="truncate text-xs font-semibold">Davi Vasconcelos</p><p className="text-[10px] text-sidebar-foreground/55">Diretor executivo</p></div></div></div>
        </aside>

        <section className="min-w-0 flex-1">
          <header className="flex items-center justify-between border-b border-border bg-card/80 px-5 py-4 backdrop-blur md:px-8">
            <div className="flex items-center gap-3"><div className="h-2 w-2 animate-pulse rounded-full bg-primary" /><p className="text-xs font-medium text-muted-foreground">TEMPORADA 2026 · {formatDate(day)}</p></div>
            <div className="flex items-center gap-2"><button onClick={() => setIsPaused(!isPaused)} className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-xs font-semibold transition-colors hover:bg-muted" aria-label={isPaused ? 'Iniciar simulação' : 'Pausar simulação'}>{isPaused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}<span className="hidden sm:inline">{isPaused ? 'Simulação pausada' : 'Simulando'}</span></button><button className="relative rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground" aria-label="Notificações"><Bell className="h-4 w-4" /><span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-destructive" /></button></div>
          </header>

          <div className="mx-auto max-w-[1500px] space-y-6 p-5 md:p-8">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary">Centro de comando</p><h1 className="font-serif text-3xl tracking-tight md:text-4xl">Bom dia, Davi.</h1><p className="mt-2 max-w-xl text-sm text-muted-foreground">O Aurora entra em uma semana decisiva. Três decisões exigem sua assinatura antes do próximo domingo.</p></div><div className="flex flex-wrap gap-2"><a href="/leagues" className="flex items-center justify-center gap-2 rounded-lg border border-border bg-card px-4 py-3 text-sm font-bold transition-colors hover:bg-muted">Banco de ligas</a><button onClick={() => { setDay(day + 1); setResolved([]) }} className="group flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-bold text-primary-foreground shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0"><CalendarDays className="h-4 w-4" />Avançar um dia<ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></button></div></div>

            <div className="rounded-xl border border-border bg-card p-5 shadow-sm"><div className="flex flex-col justify-between gap-3 md:flex-row md:items-center"><div><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary">Base inicial disponível</p><h2 className="mt-1 font-serif text-xl">Seis ligas · {leagues.reduce((total, league) => total + league.clubs.length, 0)} clubes · {featuredPlayers.length} atletas de referência</h2><p className="mt-1 text-xs text-muted-foreground">Premier League, Ligue 1, LaLiga, Serie A Enilive, Bundesliga e Brasileirão Série A.</p></div><a href="/players" className="shrink-0 rounded-lg bg-secondary px-4 py-2.5 text-xs font-bold text-secondary-foreground hover:bg-muted">Explorar jogadores <ArrowUpRight className="ml-1 inline h-3.5 w-3.5" /></a></div></div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <Metric icon={CircleDollarSign} label="Caixa disponível" value="R$ 18,4 mi" note="− R$ 620 mil este mês" tone="yellow" />
              <Metric icon={Users} label="Folha mensal" value="R$ 6,82 mi" note="8,4% acima do limite" tone="red" />
              <Metric icon={Gauge} label="Confiança do conselho" value="72 / 100" note="+4 após última vitória" tone="green" />
              <Metric icon={Goal} label="Meta da temporada" value="Top 8" note="Aurora está em 6º lugar" tone="blue" />
            </div>

            <a href="/simulation" className="group flex items-center justify-between rounded-xl border border-primary/25 bg-primary/5 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"><div><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary">Match center</p><h2 className="mt-1 font-serif text-xl">Assistir simulação ao vivo</h2><p className="mt-1 text-sm text-muted-foreground">Aurora FC × Náutico Central · narração lance a lance</p></div><span className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-xs font-bold text-primary-foreground">Abrir transmissão <Play className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /></span></a>
+
+            <div className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
              <div className="space-y-6">
                <section className="overflow-hidden rounded-xl border border-border bg-card shadow-sm"><div className="flex items-center justify-between border-b border-border px-5 py-4"><div><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">Próximo compromisso</p><h2 className="mt-1 font-serif text-2xl">A decisão começa antes do apito</h2></div><span className="rounded-full bg-accent px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-accent-foreground">Brasileirão · Rodada 21</span></div><div className="grid gap-5 p-5 md:grid-cols-[1fr_auto_1fr] md:items-center"><Team name="Aurora FC" crest="A" form="V E V V D" /><div className="text-center"><p className="text-xs text-muted-foreground">Dom · 09 ago · 16:00</p><p className="my-2 text-3xl font-black tracking-tight">— <span className="text-muted-foreground/40">×</span> —</p><p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Estádio Municipal · 31.420 torcedores</p></div><Team name="Náutico Central" crest="N" form="D V E D V" away /></div><div className="flex flex-wrap gap-3 border-t border-border bg-muted/30 px-5 py-4 text-xs text-muted-foreground"><span className="flex items-center gap-1.5"><ShieldAlert className="h-3.5 w-3.5 text-destructive" />Volante titular suspenso</span><span className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5 text-primary" />68% de ocupação prevista</span><span className="flex items-center gap-1.5"><Banknote className="h-3.5 w-3.5 text-accent-foreground" />Receita estimada R$ 410 mil</span></div></section>
                <section className="rounded-xl border border-border bg-card p-5 shadow-sm"><div className="mb-4 flex items-center justify-between"><div><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">Pulso da instituição</p><h2 className="mt-1 font-serif text-xl">Sinais que pedem decisão</h2></div><button onClick={() => setShowOffer(true)} className="text-xs font-bold text-primary hover:underline">Ver mercado <ArrowUpRight className="ml-1 inline h-3.5 w-3.5" /></button></div><div className="space-y-3">{alerts.map((alert) => resolved.includes(alert.text) ? null : <AlertRow key={alert.text} alert={alert} onResolve={() => resolveAlert(alert.text)} />)}</div>{resolved.length === alerts.length && <div className="rounded-lg border border-dashed border-border p-6 text-center text-sm text-muted-foreground">Nenhum alerta crítico pendente. O clube está respirando.</div>}</section>
              </div>
              <aside className="space-y-6"><section className="rounded-xl bg-sidebar p-5 text-sidebar-foreground shadow-lg"><div className="flex items-start justify-between"><div><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-sidebar-primary">Saúde do clube</p><h2 className="mt-1 font-serif text-2xl">Estável, mas frágil</h2></div><span className="rounded-full bg-sidebar-accent px-2 py-1 text-[10px] font-bold text-sidebar-primary">68%</span></div><div className="mt-5 h-2 overflow-hidden rounded-full bg-sidebar-accent"><div className="h-full w-[68%] rounded-full bg-sidebar-primary" /></div><div className="mt-5 grid grid-cols-2 gap-4 border-t border-sidebar-border pt-4"><Health label="Torcida" value="79" delta="+6" /><Health label="Vestiário" value="64" delta="−3" /><Health label="Imprensa" value="58" delta="+2" /><Health label="Reputação" value="71" delta="+4" /></div></section><section className="rounded-xl border border-border bg-card p-5 shadow-sm"><div className="mb-4 flex items-center gap-2"><ClipboardList className="h-4 w-4 text-primary" /><h2 className="font-serif text-xl">Agenda executiva</h2></div><div className="space-y-4"><Agenda time="Hoje" title="Reunião com conselho" detail="Orçamento salarial · 14:30" /><Agenda time="Amanhã" title="Janela de transferências" detail="3 negociações em andamento" /><Agenda time="09 ago" title="Aurora FC x Náutico Central" detail="Brasileirão · Casa" /></div></section></aside>
            </div>
            <footer className="flex flex-col justify-between gap-2 border-t border-border pt-5 text-xs text-muted-foreground md:flex-row"><p>Futebol Diretor Pro <span className="mx-2 text-border">/</span> Mundo vivo · Dia {day} da temporada</p><p>Dados públicos e estimativas sinalizadas · Simulação sandbox</p></footer>
          </div>
        </section>
      </div>
      {showOffer && <div className="fixed inset-0 z-20 flex items-end justify-center bg-foreground/30 p-4 backdrop-blur-sm md:items-center"><div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-lg"><div className="flex items-start justify-between"><div><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary">Mercado · proposta recebida</p><h2 className="mt-2 font-serif text-2xl">O Braga quer Matheus Lima</h2></div><button onClick={() => setShowOffer(false)} className="rounded-lg px-2 text-2xl text-muted-foreground hover:bg-muted" aria-label="Fechar">×</button></div><p className="mt-4 text-sm leading-6 text-muted-foreground">Oferta inicial de <strong className="text-foreground">€ 2,4 mi</strong> por 70% dos direitos. O scout avalia o jogador em € 3,1 mi, mas ele tem apenas 18 meses de contrato.</p><div className="mt-5 grid grid-cols-3 gap-2 text-center"><div className="rounded-lg bg-muted p-3"><p className="text-[10px] text-muted-foreground">Valor atual</p><p className="mt-1 font-bold">€ 3,1 mi</p></div><div className="rounded-lg bg-muted p-3"><p className="text-[10px] text-muted-foreground">Potencial</p><p className="mt-1 font-bold text-primary">€ 7,8 mi</p></div><div className="rounded-lg bg-muted p-3"><p className="text-[10px] text-muted-foreground">Torcida</p><p className="mt-1 font-bold">−12</p></div></div><div className="mt-6 flex gap-3"><button onClick={() => setShowOffer(false)} className="flex-1 rounded-lg border border-border px-4 py-3 text-sm font-bold hover:bg-muted">Recusar</button><button onClick={() => { setShowOffer(false); resolveAlert(alerts[0].text) }} className="flex-1 rounded-lg bg-primary px-4 py-3 text-sm font-bold text-primary-foreground hover:opacity-90">Abrir negociação</button></div></div></div>}
    </main>
  )
}

function Metric({ icon: Icon, label, value, note, tone }: { icon: typeof Banknote; label: string; value: string; note: string; tone: 'yellow' | 'red' | 'green' | 'blue' }) {
  const colors = { yellow: 'bg-accent text-accent-foreground', red: 'bg-destructive/10 text-destructive', green: 'bg-primary/10 text-primary', blue: 'bg-secondary text-secondary-foreground' }
  return <div className="rounded-xl border border-border bg-card p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"><div className="flex items-center justify-between"><p className="text-xs font-medium text-muted-foreground">{label}</p><span className={`rounded-lg p-2 ${colors[tone]}`}><Icon className="h-4 w-4" /></span></div><p className="mt-4 text-2xl font-black tracking-tight">{value}</p><p className="mt-1 text-[11px] text-muted-foreground">{note}</p></div>
}

function Team({ name, crest, form, away = false }: { name: string; crest: string; form: string; away?: boolean }) { return <div className={`flex items-center gap-3 ${away ? 'md:flex-row-reverse md:text-right' : ''}`}><div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-lg font-black text-primary-foreground">{crest}</div><div><p className="font-bold">{name}</p><p className="mt-1 text-[10px] font-mono tracking-wider text-muted-foreground">{form}</p></div></div> }
function AlertRow({ alert, onResolve }: { alert: AlertItem; onResolve: () => void }) { const tone = { red: 'bg-destructive', yellow: 'bg-accent', green: 'bg-primary' }[alert.tone]; return <div className="group flex items-start gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-muted/50"><span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${tone}`} /><div className="min-w-0 flex-1"><div className="flex items-center gap-2"><p className="text-[10px] font-bold tracking-wider text-muted-foreground">{alert.label}</p><span className="text-[10px] text-muted-foreground/60">{alert.time}</span></div><p className="mt-1 text-sm leading-5">{alert.text}</p></div><button onClick={onResolve} className="shrink-0 rounded-md px-2 py-1 text-[10px] font-bold text-primary opacity-0 transition-opacity group-hover:opacity-100 hover:bg-primary/10">Resolver</button></div> }
function Health({ label, value, delta }: { label: string; value: string; delta: string }) { return <div><div className="flex justify-between text-xs"><span className="text-sidebar-foreground/60">{label}</span><span className="font-bold">{value}</span></div><p className="mt-1 text-[10px] text-sidebar-primary">{delta} esta semana</p></div> }
function Agenda({ time, title, detail }: { time: string; title: string; detail: string }) { return <div className="flex gap-3"><div className="w-12 shrink-0 text-[10px] font-bold uppercase tracking-wider text-primary">{time}</div><div className="border-l border-border pl-3"><p className="text-sm font-semibold">{title}</p><p className="mt-1 text-xs text-muted-foreground">{detail}</p></div></div> }
