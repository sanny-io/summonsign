import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
// import Bowser from 'bowser'

// const browser = Bowser.getParser(window.navigator.userAgent)

dayjs.extend(relativeTime)

export { dayjs }