"use client";
import { createContext, useState, useEffect } from "react";
export const Web3Context = createContext();

import { Connector, useConnect, useAccount, useDisconnect } from "wagmi";
import { config } from "./config";

const Web3Contexts = ({ children }) => {
	const { connectors, connect } = useConnect();
	const [isClient, setIsClient] = useState(false);
	const { isConnected, address, connector } = useAccount();
	const { disconnect } = useDisconnect();

	useEffect(() => {
		setIsClient(true);
	}, []);

	if (!isClient) {
		return null;
	}

	const handleConnect = async () => {
		if (address) {
			disconnect();
			return console.log("disconnected");
		}
		const wallet = connectors.find(
			(connector) => connector.name.toLowerCase() === "metamask".toLowerCase()
		);
		connect(
			{ connector: wallet, chainId: config.chains[0].id },
			{
				onError: (err) => {
					console.log("Errror!!!", err);
				},
			}
		);
	};

	return (
		<Web3Context.Provider
			value={{ handleConnect, address, connector, isConnected }}
		>
			{children}
		</Web3Context.Provider>
	);
};

export default Web3Contexts;
