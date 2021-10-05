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
  id: string,
}

export default function Duty(props: DutyProps) {
  const { title, url, content, lastUpdated, platform, isFulfilled } = props

  return (
    <div className={`p-4 bg-gray-900 ${isFulfilled && 'bg-fulfilled bg-no-repeat bg-center opacity-50'}`}>
      <div className="flex flex-wrap w-full mb-4 text-sm md:flex-nowrap md:text-xl lg:text-2xl">
        <PlatformTag platform={platform} />

        <a href={url} className="order-3 w-full mt-2 md:mt-0 md:order-none">
          <h2 className="mr-6 font-bold">
            {title}
          </h2>
        </a>

        <span className="order-2 text-gray-300 md:order-none md:ml-auto md:text-base whitespace-nowrap">{dayjs().to(dayjs.unix(lastUpdated))}</span>
      </div>

      <InfoBox duty={props} />
      <hr className="mb-2 border-gray-700" />

      <div className="markdown">
        <Markdown>{content}</Markdown>
      </div>
    </div>
  )
}