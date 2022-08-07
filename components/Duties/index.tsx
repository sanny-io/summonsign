import { memo } from 'react'
import useDuties from '../../hooks/useDuties'
import DutyComponent from './Duty'

function Duties() {
  const { filteredDuties } = useDuties()

  return (
    <ol className="container flex flex-col my-8">
      <li>
        {
          filteredDuties.map(duty => (
            <DutyComponent {...duty} />
          ))
        }
      </li>
    </ol>
  )
}

export default memo(Duties)