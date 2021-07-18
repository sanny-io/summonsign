import React from 'react'

export default function Footer({ }) {
  return (
    <footer className="px-4 py-8 border-t-2 border-gray-900">
      <nav className="container mx-auto">
        <ul className="flex justify-end space-x-6">
          <li>
            <a href="https://sanny.io">sanny.io</a>
          </li>
          <li>
            <a href="https://github.com/sanny-io/summonsign">GitHub</a>
          </li>
        </ul>
      </nav>
    </footer>
  )
}