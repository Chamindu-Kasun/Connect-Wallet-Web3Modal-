
// context/index.tsx

'use client'

import React, { ReactNode, useEffect, useState } from 'react'
import { config, projectId } from '../config/wagmi'

import { createWeb3Modal } from '@web3modal/wagmi/react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { State, WagmiProvider, useAccount } from 'wagmi'

// Setup queryClient
const queryClient = new QueryClient()

if (!projectId) throw new Error('Project ID is not defined')

// Create modal
createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  enableOnramp: true // Optional - false as default
})

export default function Web3ModalProvider({
  children,
  initialState
}: {
  children: ReactNode
  initialState?: State
}) {

    const [address, setAddress] = useState<string | null>(null);
    const { address: accountAddress } = useAccount();

    useEffect(() => {
        if (accountAddress) {
          setAddress(accountAddress);
        }
      }, [accountAddress]);

  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}
    