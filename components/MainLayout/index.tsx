import type { ReactNode } from 'react'

type Props = {
  children: ReactNode,
}

function MainLayout({ children }: Props) {
  return (
    <main>
      {children}
    </main>
  )
}

export default MainLayout