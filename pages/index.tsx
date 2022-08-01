import Header from '../components/Header'
import Settings from '../components/Settings'

type Props = {}

export default function HomePage({ }: Props) {
  return (
    <div>
      <Header />
      <Settings />
    </div>
  )
}