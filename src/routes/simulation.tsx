import { createFileRoute } from '@tanstack/react-router'
import { ArrowLeft, ChevronRight, CirclePause, FastForward, Goal, Mic2, Play, RotateCcw, Shield, SkipForward, Volume2 } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

export const Route = createFileRoute('/simulation')({
  head: () => ({ meta: [{ title: 'Simulação de jogos · Futebol Diretor Pro' }, { name: 'description', content: 'Assista partidas simuladas lance a lance.' }] }),
  component: SimulationPage,
})

type Match = { minute: number; kind: 'goal' | 'chance' | 'card' | 'commentary'; team: 'Aurora' | 'Náutico'; text: string }

const matchEvents: Match[] = [
  { minute: 7, kind: 'commentary', team: 'Aurora', text: 'Aurora começa pressionando alto e recupera a bola no campo ofensivo.' },
  { minute: 16, kind: 'chance', team: 'Aurora', text: 'Rafael Nunes encontra espaço e finaliza cruzado. Defesa do Náutico espalma.' },
  { minute: 29, kind: 'card', team: 'Náutico', text: 'Cartão amarelo para João Victor por falta tática no meio-campo.' },
  { minute: 38, kind: 'goal', team: 'Aurora', text: 'GOL DO AURORA! Matheus Lima recebe entre linhas e bate no canto.' },
  { minute: 45, kind: 'commentary', team: 'Náutico', text: 'Intervalo. Aurora controla o ritmo: 58% de posse e quatro finalizações.' },
  { minute: 54, kind: 'chance', team: 'Náutico', text: 'Náutico acelera pela direita e acerta a trave em contra-ataque.' },
  { minute: 67, kind: 'goal', team: 'Náutico', text: 'Gol do Náutico. Caio Mendes empata de cabeça após escanteio.' },
  { minute: 74, kind: 'commentary', team: 'Aurora', text: 'O treinador do Aurora chama dois reservas e prepara uma mudança de sistema.' },
  { minute: 81, kind: 'card', team: 'Aurora', text: 'Cartão amarelo para o capitão Rafael Nunes.' },
  { minute: 89, kind: 'goal', team: 'Aurora', text: 'GOL DO AURORA! Lucas Ferreira aparece no segundo pau e garante a vitória.' },
  { minute: 90, kind: 'commentary', team: 'Aurora', text: 'Fim de jogo no Estádio Municipal. Vitória importante na luta pelo Top 8.' },
]

function SimulationPage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [eventIndex, setEventIndex] = useState(-1)
  const [speed, setSpeed] = useState(1)
  const [sound, setSound] = useState(true)
  const [homeGoals, setHomeGoals] = useState(0)
  const [awayGoals, setAwayGoals] = useState(0)

  const visibleEvents = useMemo(() => matchEvents.slice(0, eventIndex + 1), [eventIndex])
  const currentEvent = eventIndex >= 0 ? matchEvents[eventIndex] : null
  const isFinished = eventIndex >= matchEvents.length - 1

  useEffect(() => {
    if (!isPlaying || isFinished) return
    const timer = window.setTimeout(() => {
      const nextIndex = eventIndex + 1
      const nextEvent = matchEvents[nextIndex]
      setEventIndex(nextIndex)
      if (nextEvent?.kind === 'goal') {
        if (nextEvent.team === 'Aurora') setHomeGoals((value) => value + 1)
        else setAwayGoals((value) => value + 1)
      }
    }, 1000 / speed)
    return () => window.clearTimeout(timer)
  }, [eventIndex, isFinished, isPlaying, speed])

  const reset = () => { setIsPlaying(false); setEventIndex(-1); setHomeGoals(0); setAwayGoals(0) }
  const start = () => { if (isFinished) reset(); setIsPlaying(true) }
  const quickSimulate = () => { setIsPlaying(false); setEventIndex(matchEvents.length - 1); setHomeGoals(2); setAwayGoals(1) }
  const advance = () => { if (isFinished) return; const nextIndex = eventIndex + 1; const event = matchEvents[nextIndex]; setEventIndex(nextIndex); if (event?.kind === 'goal') event.team === 'Aurora' ? setHomeGoals((value) => value + 1) : setAwayGoals((value) => value + 1) }

  return <main className="min-h-dvh bg-background px-5 py-8 text-foreground md:px-10"><div className="mx-auto max-w-6xl"><a href="/" className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline"><ArrowLeft className="h-4 w-4" />Centro de comando</a><div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">Match center / ao vivo</p><h1 className="mt-2 font-serif text-4xl">Assista à partida acontecer</h1><p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">Simulação lance a lance com ritmo ajustável. Você pode assistir em tempo real, avançar manualmente ou resolver o jogo em um clique.</p></div><button onClick={quickSimulate} className="flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-bold text-primary-foreground shadow-md hover:-translate-y-0.5 hover:shadow-lg"><FastForward className="h-4 w-4" />Simular partida rápida</button></div><section className="overflow-hidden rounded-2xl border border-border bg-card shadow-lg"><div className="border-b border-border bg-muted/40 px-5 py-3"><div className="flex flex-wrap items-center justify-between gap-3"><div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary"><span className="h-2 w-2 animate-pulse rounded-full bg-destructive" />Brasileirão · rodada 21 · ao vivo</div><span className="font-mono text-xs text-muted-foreground">09 AGO 2026 · ESTÁDIO MUNICIPAL</span></div></div><div className="grid gap-6 p-6 md:grid-cols-[1fr_auto_1fr] md:items-center md:p-10"><TeamScore name="Aurora FC" crest="A" goals={homeGoals} form="V E V V D" /><div className="text-center"><p className="font-mono text-4xl font-black tracking-tight">{currentEvent?.minute ?? 0}'</p><p className="mt-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">{isFinished ? 'Final' : isPlaying ? 'Em jogo' : 'Aguardando'}</p></div><TeamScore name="Náutico Central" crest="N" goals={awayGoals} form="D V E D V" away /></div><div className="flex flex-wrap items-center justify-center gap-2 border-t border-border bg-muted/20 px-5 py-4"><button onClick={isPlaying ? () => setIsPlaying(false) : start} className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-xs font-bold text-primary-foreground">{isPlaying ? <CirclePause className="h-4 w-4" /> : <Play className="h-4 w-4" />}{isPlaying ? 'Pausar' : isFinished ? 'Recomeçar' : 'Assistir'}</button><button onClick={advance} disabled={isFinished} className="flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-xs font-bold hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"><SkipForward className="h-4 w-4" />Próximo lance</button><button onClick={reset} className="rounded-lg border border-border p-2.5 text-muted-foreground hover:bg-muted hover:text-foreground" aria-label="Reiniciar partida"><RotateCcw className="h-4 w-4" /></button><span className="mx-2 h-5 w-px bg-border" /><span className="text-xs font-bold text-muted-foreground">Velocidade</span>{[1, 2, 4].map((value) => <button key={value} onClick={() => setSpeed(value)} className={`rounded-md px-2.5 py-1.5 text-xs font-bold ${speed === value ? 'bg-accent text-accent-foreground' : 'border border-border hover:bg-muted'}`}>{value}x</button>)}<button onClick={() => setSound(!sound)} className="ml-2 rounded-lg border border-border p-2.5 text-muted-foreground hover:bg-muted" aria-label="Alternar narração"><Volume2 className={`h-4 w-4 ${sound ? 'text-primary' : ''}`} /></button></div></section><div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_0.8fr]"><section className="rounded-xl border border-border bg-card p-5 shadow-sm"><div className="mb-4 flex items-center justify-between"><div><p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Narração da partida</p><h2 className="mt-1 font-serif text-2xl">Lance a lance</h2></div><span className="rounded-full bg-secondary px-3 py-1 text-[10px] font-bold text-secondary-foreground">{visibleEvents.length} eventos</span></div><div className="max-h-[430px] space-y-2 overflow-y-auto pr-1">{visibleEvents.length === 0 && <div className="rounded-lg border border-dashed border-border p-8 text-center text-sm text-muted-foreground">Clique em “Assistir” para iniciar a transmissão simulada.</div>}{visibleEvents.map((event, index) => <div key={`${event.minute}-${event.text}`} className={`flex gap-3 rounded-lg border p-3 ${event.kind === 'goal' ? 'border-accent/60 bg-accent/10' : 'border-border bg-muted/20'}`}><span className="w-8 shrink-0 pt-0.5 font-mono text-xs font-black text-primary">{event.minute}'</span><div className="flex-1"><p className="text-xs font-bold">{event.kind === 'goal' ? 'GOOOOL' : event.kind === 'chance' ? 'Chance criada' : event.kind === 'card' ? 'Cartão' : 'Narração'} <span className="font-normal text-muted-foreground">· {event.team}</span></p><p className="mt-1 text-sm leading-5 text-muted-foreground">{event.text}</p></div>{event.kind === 'goal' && <Goal className="h-4 w-4 shrink-0 text-accent-foreground" />}</div>)}</div></section><aside className="space-y-4"><section className="rounded-xl border border-border bg-card p-5 shadow-sm"><div className="mb-4 flex items-center gap-2"><Shield className="h-4 w-4 text-primary" /><h2 className="font-serif text-xl">Estatísticas</h2></div><Stat label="Posse de bola" home="58%" away="42%" /><Stat label="Finalizações" home={isFinished ? '11' : '4'} away={isFinished ? '7' : '1'} /><Stat label="No alvo" home={isFinished ? '6' : '2'} away={isFinished ? '3' : '1'} /><Stat label="Escanteios" home={isFinished ? '6' : '2'} away={isFinished ? '4' : '0'} /></section><section className="rounded-xl border border-border bg-card p-5 shadow-sm"><div className="flex items-center gap-2"><Mic2 className="h-4 w-4 text-primary" /><h2 className="font-serif text-xl">Decisão de campo</h2></div><p className="mt-3 text-sm leading-6 text-muted-foreground">A simulação considera força do elenco, mando, forma recente, moral e aleatoriedade controlada.</p><button onClick={() => setIsPlaying(!isPlaying)} className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-border px-4 py-2.5 text-xs font-bold hover:bg-muted"><ChevronRight className="h-4 w-4" />{isPlaying ? 'Pausar transmissão' : 'Continuar transmissão'}</button></section></aside></div></div></main>
}

function TeamScore({ name, crest, goals, form, away = false }: { name: string; crest: string; goals: number; form: string; away?: boolean }) { return <div className={`flex items-center gap-4 ${away ? 'md:flex-row-reverse md:text-right' : ''}`}><div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-2xl font-black text-primary-foreground shadow-md">{crest}</div><div><p className="font-bold">{name}</p><p className="mt-1 text-5xl font-black tracking-tight">{goals}</p><p className="mt-1 font-mono text-[10px] tracking-widest text-muted-foreground">{form}</p></div></div> }
function Stat({ label, home, away }: { label: string; home: string; away: string }) { return <div className="border-b border-border pb-3 last:border-0"><div className="flex justify-between text-xs font-bold"><span>{home}</span><span className="text-muted-foreground">{label}</span><span>{away}</span></div><div className="mt-2 flex h-1.5 gap-1 overflow-hidden rounded-full bg-muted"><div className="rounded-full bg-primary" style={{ width: home }} /><div className="rounded-full bg-accent" style={{ width: away }} /></div></div> }
