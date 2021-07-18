import IDutyProvider from '.'
import { DutyProps } from '../components/Duty'
import { Platform, DS3 } from '../types'

type RedditResponse = {
  data: {
    title: string,
    url: string,
    selftext: string,
    created_utc: string,
    link_flair_css_class: string,
  }
}

const determinePlatform = (title: string): Platform => {
  title = title.toLowerCase()

  if (title.includes('ps4')) {
    return Platform.PS4
  }

  if (title.includes('ps5')) {
    return Platform.PS5
  }

  if (title.match(/xb[xo1]/)) {
    return Platform.Xbox
  }

  if (title.includes('switch')) {
    return Platform.Switch
  }

  return Platform.PC
}

export default class Reddit implements IDutyProvider {
  async getDuties(): Promise<DutyProps[]> {
    const response = await fetch('https://old.reddit.com/r/SummonSign/new.json?raw_json=1')
    const json = await response.json()

    const duties: DutyProps[] = json.data.children.map((duty: RedditResponse) => {
      let { title, url, selftext: content, created_utc: lastUpdated } = duty.data
      const platform = determinePlatform(title)
      const isFulfilled = duty.data.link_flair_css_class == 'duty-fulfilled'
      const bossMatches = Array<[string, RegExpMatchArray | null]>()
      const fullContent = title + content
      let dutyBoss = null

      for (const [boss, pattern] of Object.entries(DS3.bosses)) {
        const match = fullContent.match(pattern)

        if (match) {
          bossMatches.push([boss, match])
        }
      }

      // Sort by when each match first appears.
      bossMatches.sort(([, a], [, b]) => (a!.index || 0) - (b!.index || 0))

      if (bossMatches.length !== 0) {
        dutyBoss = bossMatches[0][0]
      }

      return { title, url, content, platform, lastUpdated, isFulfilled, boss: dutyBoss }
    })

    return duties
  }
}