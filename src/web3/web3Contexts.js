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

	const checkAndSwitchChain = () => {
		const reqChain = config.chains.find((_config) => _config.id === chainId);
		try {
			if (reqChain) {
				return false;
			} else {
				openChainModal();
				return true;
			}
		} catch (error) {
			console.error("switch chain error", error);
			return null;
		}
	};

	useEffect(() => {
		const handleSwitch = async () => {
			try {
				if (!isConnected) {
					return;
				}
				checkAndSwitchChain();
			} catch (error) {
				console.error("handle switch errorr ---- ", error);
			}
		};

		handleSwitch();
	}, [chainId, isConnected]);

	const handleConnect = async () => {
		try {
			if (isConnected) {
				const isIncorrectChain = checkAndSwitchChain();
				!isIncorrectChain && openAccountModal();
				return;
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
				checkAndSwitchChain,
			}}>
			{children}
		</Web3Context.Provider>
	);
};

export default Web3Contexts;
