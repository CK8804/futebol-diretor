export type League = {
  id: string
  name: string
  country: string
  currency: string
  clubs: string[]
}

export type Player = {
  name: string
  club: string
  position: string
  age: number
  overall: number
  potential: number
  value: number
  salary: number
  contract: string
  nationality: string
  note?: string
}

const leagueTeams: Record<string, string> = {
  premier: 'Arsenal|Aston Villa|Bournemouth|Brentford|Brighton|Burnley|Chelsea|Crystal Palace|Everton|Fulham|Leeds United|Liverpool|Manchester City|Manchester United|Newcastle United|Nottingham Forest|Sunderland|Tottenham Hotspur|West Ham United|Wolverhampton',
  ligue1: 'Auxerre|Angers|Brest|Le Havre|Lens|Lille|Lorient|Lyon|Marseille|Monaco|Montpellier|Nantes|Nice|Paris Saint-Germain|Rennes|Saint-Étienne|Strasbourg|Toulouse|Metz|Reims',
  laliga: 'Alavés|Athletic Club|Atlético de Madrid|Barcelona|Celta Vigo|Elche|Espanyol|Getafe|Girona|Levante|Mallorca|Osasuna|Rayo Vallecano|Real Betis|Real Madrid|Real Sociedad|Sevilla|Valencia|Villarreal|Real Oviedo',
  seriea: 'Atalanta|Bologna|Cagliari|Como|Cremonese|Empoli|Fiorentina|Genoa|Hellas Verona|Inter|Juventus|Lazio|Lecce|Milan|Monza|Napoli|Parma|Pisa|Roma|Torino|Udinese',
  bundesliga: 'Augsburg|Bayer Leverkusen|Bayern München|Borussia Dortmund|Borussia Mönchengladbach|Eintracht Frankfurt|Freiburg|Hamburg|Heidenheim|Hoffenheim|Mainz 05|RB Leipzig|St. Pauli|Union Berlin|VfB Stuttgart|Werder Bremen|Wolfsburg|Köln',
  brasileirao: 'Atlético Mineiro|Bahia|Botafogo|Bragantino|Ceará|Corinthians|Cruzeiro|Flamengo|Fluminense|Fortaleza|Grêmio|Internacional|Juventude|Mirassol|Palmeiras|Santos|São Paulo|Sport|Vasco da Gama|Vitória',
}

export const leagues: League[] = [
  { id: 'premier', name: 'Premier League', country: 'Inglaterra', currency: 'GBP', clubs: leagueTeams.premier.split('|') },
  { id: 'ligue1', name: 'Ligue 1', country: 'França', currency: 'EUR', clubs: leagueTeams.ligue1.split('|') },
  { id: 'laliga', name: 'LaLiga EA Sports', country: 'Espanha', currency: 'EUR', clubs: leagueTeams.laliga.split('|') },
  { id: 'seriea', name: 'Serie A Enilive', country: 'Itália', currency: 'EUR', clubs: leagueTeams.seriea.split('|') },
  { id: 'bundesliga', name: 'Bundesliga', country: 'Alemanha', currency: 'EUR', clubs: leagueTeams.bundesliga.split('|') },
  { id: 'brasileirao', name: 'Brasileirão Série A', country: 'Brasil', currency: 'BRL', clubs: leagueTeams.brasileirao.split('|') },
]

export const featuredPlayers: Player[] = [
  { name: 'Bukayo Saka', club: 'Arsenal', position: 'PD', age: 24, overall: 87, potential: 91, value: 125000000, salary: 10500000, contract: '30/06/2030', nationality: 'Inglaterra' },
  { name: 'Moisés Caicedo', club: 'Chelsea', position: 'VOL', age: 24, overall: 86, potential: 90, value: 105000000, salary: 9000000, contract: '30/06/2031', nationality: 'Equador' },
  { name: 'Mohamed Salah', club: 'Liverpool', position: 'PD', age: 34, overall: 88, potential: 88, value: 28000000, salary: 21000000, contract: '30/06/2027', nationality: 'Egito' },
  { name: 'Michael Olise', club: 'Bayern München', position: 'PD', age: 24, overall: 87, potential: 92, value: 100000000, salary: 12000000, contract: '30/06/2029', nationality: 'França' },
  { name: 'Florian Wirtz', club: 'Bayer Leverkusen', position: 'MEI', age: 23, overall: 89, potential: 94, value: 145000000, salary: 11000000, contract: '30/06/2030', nationality: 'Alemanha' },
  { name: 'Harry Kane', club: 'Bayern München', position: 'CA', age: 32, overall: 90, potential: 90, value: 65000000, salary: 25000000, contract: '30/06/2027', nationality: 'Inglaterra' },
  { name: 'Lamine Yamal', club: 'Barcelona', position: 'PD', age: 19, overall: 91, potential: 97, value: 180000000, salary: 15000000, contract: '30/06/2031', nationality: 'Espanha', note: 'Jovem de elite · avaliação do scout: excepcional' },
  { name: 'Jude Bellingham', club: 'Real Madrid', position: 'MC', age: 23, overall: 92, potential: 96, value: 180000000, salary: 20000000, contract: '30/06/2029', nationality: 'Inglaterra' },
  { name: 'Kylian Mbappé', club: 'Real Madrid', position: 'PE', age: 27, overall: 93, potential: 95, value: 210000000, salary: 36000000, contract: '30/06/2030', nationality: 'França' },
  { name: 'Ousmane Dembélé', club: 'Paris Saint-Germain', position: 'PD', age: 29, overall: 89, potential: 89, value: 75000000, salary: 18000000, contract: '30/06/2028', nationality: 'França' },
  { name: 'Victor Osimhen', club: 'Galatasaray', position: 'CA', age: 27, overall: 88, potential: 91, value: 105000000, salary: 14000000, contract: '30/06/2028', nationality: 'Nigéria', note: 'Mercado internacional · clube fora das seis ligas' },
  { name: 'Lautaro Martínez', club: 'Inter', position: 'CA', age: 29, overall: 91, potential: 92, value: 115000000, salary: 16000000, contract: '30/06/2029', nationality: 'Argentina' },
  { name: 'Rafael Leão', club: 'Milan', position: 'PE', age: 27, overall: 88, potential: 91, value: 90000000, salary: 11000000, contract: '30/06/2028', nationality: 'Portugal' },
  { name: 'Vinícius Júnior', club: 'Real Madrid', position: 'PE', age: 26, overall: 92, potential: 95, value: 190000000, salary: 30000000, contract: '30/06/2030', nationality: 'Brasil' },
  { name: 'Raphinha', club: 'Barcelona', position: 'PE', age: 29, overall: 89, potential: 89, value: 90000000, salary: 12000000, contract: '30/06/2028', nationality: 'Brasil' },
  { name: 'Rodrygo', club: 'Real Madrid', position: 'PD', age: 25, overall: 88, potential: 92, value: 105000000, salary: 14000000, contract: '30/06/2028', nationality: 'Brasil' },
  { name: 'Estêvão', club: 'Palmeiras', position: 'PD', age: 19, overall: 82, potential: 94, value: 65000000, salary: 4200000, contract: '30/06/2029', nationality: 'Brasil', note: 'Jovem promessa · dado de mercado aproximado' },
  { name: 'Gerson', club: 'Flamengo', position: 'MC', age: 29, overall: 84, potential: 85, value: 22000000, salary: 9000000, contract: '30/06/2028', nationality: 'Brasil' },
  { name: 'Pedro', club: 'Flamengo', position: 'CA', age: 29, overall: 86, potential: 87, value: 25000000, salary: 10000000, contract: '30/06/2027', nationality: 'Brasil' },
  { name: 'André', club: 'Wolverhampton', position: 'VOL', age: 25, overall: 82, potential: 87, value: 32000000, salary: 5200000, contract: '30/06/2029', nationality: 'Brasil' },
  { name: 'Germán Cano', club: 'Fluminense', position: 'CA', age: 38, overall: 80, potential: 80, value: 3000000, salary: 6500000, contract: '30/06/2027', nationality: 'Argentina' },
]

export function formatMoney(value: number, currency: string) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency, maximumFractionDigits: 0 }).format(value)
}

export function clubInitials(name: string) {
  return name.split(' ').filter(Boolean).slice(0, 2).map((part) => part[0]).join('').toUpperCase()
}
