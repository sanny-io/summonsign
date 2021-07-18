import { DutyProps } from '../components/Duty'

export default interface IDutyProvider {
  getDuties(): Promise<DutyProps[]>,
}