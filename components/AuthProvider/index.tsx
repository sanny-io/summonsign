import React, { useEffect } from 'react'

export type AuthProviderProps = {
  children: React.ReactElement,
}

export default function AuthProvider({ children }: AuthProviderProps) {
  return children
}