import { useAccount, useConnect, useDisconnect } from 'wagmi'

const WalletConnect = () => {
  const { connector: activeConnector, isConnected } = useAccount()
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect()
  const { disconnect } = useDisconnect()

  return (
    <>
      {isConnected && (
        <div>
          Connected to {activeConnector.name}
          <button onClick={disconnect}>Disconnect</button>
        </div>
      )}

      {!isConnected && (
        <div>
          {connectors.map((connector) => (
            <button
              key={connector.id}
              disabled={!connector.ready}
              onClick={() => connect({ connector })}
            >
              {connector.name}
              {isLoading &&
                pendingConnector?.id === connector.id &&
                ' (connecting)'}
            </button>
          ))}
          {error && <div>{error.message}</div>}
        </div>
      )}
    </>
  )
}

export default WalletConnect;