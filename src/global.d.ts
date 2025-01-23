interface Window {
    phantom: {
        solana: {
            isConnected : boolean,
            connect : Function,
            signTransaction: Function,
            signAndSendTransaction : Function,
        }
    }
}