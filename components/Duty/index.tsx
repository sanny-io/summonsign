import React from 'react'
import { Platform } from '../../types'
import Markdown from 'react-markdown'
import { dayjs } from '../../util'
import PlatformTag from '../PlatformTag'
import InfoBox from '../InfoBox'

export type DutyProps = {
  title: string,
  content: string,
  platform: Platform,
  lastUpdated: number,
  url: string,
  boss?: string,
  soulLevel?: number,
  isFulfilled: boolean,
}

export default function Duty(props: DutyProps) {
  const { title, url, content, lastUpdated, platform, isFulfilled } = props

  return (
    <div className={`p-4 bg-gray-900 ${isFulfilled && 'bg-fulfilled bg-no-repeat bg-center opacity-50'}`}>
      <div className="flex w-full mb-4 text-sm md:text-xl lg:text-2xl">
        <PlatformTag platform={platform} />

        <a href={url}>
          <h2 className="mr-6 overflow-hidden font-bold overflow-ellipsis">
            {title}
          </h2>
        </a>

        <span className="ml-auto text-gray-300 md:text-base">{dayjs().to(dayjs.unix(lastUpdated))}</span>
      </div>

      <InfoBox duty={props} />
      <hr className="mb-2 border-gray-700" />

      <div className="markdown">
        <Markdown>{content}</Markdown>
      </div>
    </div>
  )
}