interface Window {
  emulatorsRunning: boolean,
}

declare module NodeJS {
  interface Global {
    emulatorsRunning: boolean,
  }
}

declare const emulatorsRunning: boolean