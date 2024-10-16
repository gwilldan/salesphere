import { createContext, useState, useEffect } from "react";
export const Web3Context = createContext();
import {
	useAccountModal,
	useConnectModal,
	useChainModal,
	connectorsForWallets,
} from "@rainbow-me/rainbowkit";

import { useAccount, useSwitchChain, useDisconnect } from "wagmi";
import { config } from "./config";

const Web3Contexts = ({ children }) => {
	// states
	const [isClient, setIsClient] = useState(false);
	const [isReqChain, setIsReqChain] = useState(false);

	const { isConnected, address, connector, chainId } = useAccount();
	const { openConnectModal, connectModalOpen } = useConnectModal();
	const { openAccountModal } = useAccountModal();
	const { openChainModal } = useChainModal();
	const { switchChainAsync } = useSwitchChain();
	const { disconnect } = useDisconnect();

	useEffect(() => {
		const handleSwitch = async () => {
			try {
				if (!isConnected) {
					return;
				}

				const reqChain = config.chains.find(
					(_config) => _config.id === chainId
				);

				if (!reqChain) {
					await switchChainAsync({
						chainId: config.chains[0].id,
						connector: connector,
					});
					console.log("switched chain");
				}
			} catch (error) {
				console.error("handle switch errorr ---- ", error);
			}
		};
	}, [chainId, isConnected]);

	// useEffect(() => {
	// 	setIsClient(true);
	// }, []);

	// if (!isClient) {
	// 	return null;
	// }

	const handleConnect = async () => {
		try {
			if (isConnected) {
				openAccountModal();
				// openChainModal();
				// disconnect();
				return console.log("disconnected");
			}

			openConnectModal();
		} catch (error) {
			console.error("handleConnect error", error);
		}
	};

	const handleConnectPromise = () => new Promise((resolve, reject) => {});

	return (
		<Web3Context.Provider
			value={{
				handleConnect,
				handleConnectPromise,
				address,
				connector,
				isConnected,
			}}>
			{children}
		</Web3Context.Provider>
	);
};

export default Web3Contexts;
