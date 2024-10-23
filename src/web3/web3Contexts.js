import { createContext, useEffect } from "react";
export const Web3Context = createContext();
import {
	useAccountModal,
	useConnectModal,
	useChainModal,
} from "@rainbow-me/rainbowkit";

import { useAccount, useSwitchChain } from "wagmi";
import { config } from "./config";

const Web3Contexts = ({ children }) => {
	const { isConnected, address, connector, chainId } = useAccount();
	const { openConnectModal } = useConnectModal();
	const { openAccountModal } = useAccountModal();
	const { openChainModal } = useChainModal();
	const { switchChainAsync } = useSwitchChain();

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

		handleSwitch();
	}, [chainId, isConnected]);

	const handleConnect = async () => {
		try {
			if (isConnected) {
				openAccountModal();
				return console.log("disconnected");
			}

			openConnectModal();
		} catch (error) {
			console.error("handleConnect error", error);
		}
	};

	return (
		<Web3Context.Provider
			value={{
				handleConnect,
				address,
				connector,
				isConnected,
			}}>
			{children}
		</Web3Context.Provider>
	);
};

export default Web3Contexts;
