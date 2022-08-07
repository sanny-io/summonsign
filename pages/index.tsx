import { useEffect } from 'react'
import Duties from '../components/Duties'
import Header from '../components/Header'
import Settings from '../components/Settings'
import useDuties from '../hooks/useDuties'

type Props = {}

export default function HomePage({ }: Props) {
  const { refreshDuties } = useDuties()

  useEffect(() => {
    refreshDuties()
  }, [])

  return (
    <div>
      <Header />
      <Settings />
      <Duties />
    </div>
  )
}