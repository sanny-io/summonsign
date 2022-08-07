import { createAsyncThunk } from '@reduxjs/toolkit'
import { DS3, Duty, RootState, Settings } from '../../types'
import { determinePlatform } from '../../util'

type DutiesRefresh = {
  duties: Duty[],
  settings: Settings,
}

type RedditResponse = {
  data: {
    title: string,
    url: string,
    selftext: string,
    created_utc: string,
    link_flair_css_class: string,
    id: string,
  }
}

export default createAsyncThunk<DutiesRefresh, Settings, { state: RootState }>('duties/refreshDuties', async settings => {
  const response = await fetch('https://old.reddit.com/r/SummonSign/new.json?raw_json=1')
  const json = await response.json()

  const duties: Duty[] = json.data.children.map((duty: RedditResponse) => {
    let { title, url, selftext: content, created_utc: lastUpdated, id } = duty.data
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

    return { title, url, content, platform, lastUpdated, isFulfilled, id, boss: dutyBoss }
  })

  return {
    duties,
    settings,
  }
})