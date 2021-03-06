import snoowrap from 'snoowrap'
import type { NextApiRequest, NextApiResponse } from 'next'
import { SettingsProps } from './components/Settings'

export enum Platform {
  None,
  PC = 1 << 1,
  Xbox = 1 << 2,
  PS4 = 1 << 3,
  PS5 = 1 << 4,
  Switch = 1 << 5,
  All = PC | Xbox | PS4 | PS5 | Switch,
}

export enum Route {
  HomePage = '/',
  AuthPage = '/auth',
  Auth = '/api/auth',
  AuthCreateSession = '/api/auth/session',
}

export type SummonSignApiRequest = NextApiRequest & React.Dispatch<string> & {
  reddit: snoowrap,
}

export type SummonSignApiHandler<T> = (request: SummonSignApiRequest, response: NextApiResponse<T>) => void

export type Game = {
  name: string,
  id: string,
  pattern: RegExp,
  platforms: Platform[],
  bosses: Record<string, RegExp>,
}

export const DS1: Game = {
  name: 'Dark Souls 1',
  id: 'DS1',
  platforms: [Platform.PC, Platform.PS4],
  pattern: /ds1|dsr/,
  bosses: {
    'Asylum Demon': /as+[yi]l+um/i,
    'Bell Gargoyle': /gargo/i,
    'Capra Demon': /[ck]apra/i,
    'Chaos Witch Quelaag': /que?la+g/i,
    'Gaping Dragon': /gap+ing/i,
    'Iron Golem': /golem/i,
    'Pinwheel': /pin[\s-]*wheel/i,
    'Nito': /n[ie]+t*o/i,
    'Seath the Scaleless': /sea?the?|scale/i,
    'Taurus Demon': /tau?r[ui]s/i,
    'Centipede Demon': /[cs]ent[ie]%s?p/i,
    'Ceaseless Discharge': /cease?les|dis[-\s]*charge/i,
    'Crossbreed Priscilla': /cros+breed|pri[sc]il*/i,
    'Moonlight Butterfly': /moon[-\s]*light|but*er/i,
    'Gwyn, Lord of Cinder': /gw[ye]n|[cs]inder/i,
    'Stray Demon': /stray/i,
    'Four Kings': /kings\b/i,
    'Great Grey Wolf Sif': /sif|gr[ea]y[-\s]*wolf/i,
    'Ornstein & Smough': /ornst|sm[ou]{2}gh|o&s/i,
  }
}

export const DS3: Game = {
  name: 'Dark Souls 3',
  id: 'DS3',
  platforms: [Platform.PC, Platform.Xbox, Platform.PS4, Platform.PS5],
  pattern: /ds3/i,
  bosses: {
    'Vordt of the Boreal Valley': /vord?t/i,
    'Curse-Rotted Greatwood': /cursed?[-\s]*rotted|great[-\s]?wood/i,
    'Crystal Sage': /cr[iy]stal|sai?ge/i,
    'Abyss Watchers': /abyss?|watchers?/i,
    'Deacons of the Deep': /d[ea]+cons?|de{2,}p/i,
    'High Lord Wolnir': /hi[gh]?[-\s]?lord|wolnir/i,
    'Old Demon King': /demon[-\s]?king/i,
    'Pontiff Sulyvahn': /pontif+|s[au]l[iy]v/i,
    'Yhorm the Giant': /yh?orm/i,
    'Aldrich, Devourer of Gods': /ald?rit?ch?/i,
    'Dancer of the Boreal Valley': /dancer/i,
    'Dragonslayer Armour': /dragon[-\s]?slayer/i,
    'Oceiros, the Consumed King': /o[cs][eir]*os?|consumed?/i,
    'Champion Gundyr': /gund[yi]r/i,
    'Twin Princes': /twin|princes|lorian/i,
    'Nameless King': /name?less?/i,
    'Soul of Cinder': /cinder|\bsoc\b/i,
    'Champion\'s Gravetender': /grave[-\s]?tender/i,
    'Sister Friede': /sister|father|fr[ei]*de?/i,
    'Spear of the Church': /spear|\sargo|half-?light|half-?lite/i,
    'Demon Prince': /demon[-\s]?prince|in[-\s]?pain|demon[-\s]?below/i,
    'Darkeater Midir': /eater|m[ai]d[ai]r/i,
    'Slave Knight Gael': /slave|gael/i,
  }
}

export enum BossFilter {
  Include,
  Exclude,
}

export type Setting = keyof SettingsProps