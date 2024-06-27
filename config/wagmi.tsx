
// config/index.tsx

import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'

import { cookieStorage, createStorage } from 'wagmi'
import { avalancheFuji, mainnet, sepolia } from 'wagmi/chains'

export const projectId = process.env.PROJECT_ID;

// Create a metadata object
const metadata = {
  name: 'Connect-Wallet-Web3Modal',
  description: 'AppKit Example',
  url: 'https://web3modal.com', 
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

// Create wagmiConfig
const chains = [avalancheFuji] as const
export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage
  }),
})