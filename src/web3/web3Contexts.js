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

	const handleConnectPromise = () =>
		new Promise((resolve, reject) => {
			const wallet = connectors.find(
				(connector) => connector.name.toLowerCase() === "metamask".toLowerCase()
			);

			if (!wallet) {
				reject(new Error("Wallet not found"));
				return;
			}

			connect(
				{ connector: wallet, chainId: config.chains[0].id },
				{
					onError: (err) => {
						console.log("Error:", err);
						reject(err); // Reject the promise on error
					},
					onSuccess: () => {
						resolve("Wallet connected!"); // Resolve the promise on success
					},
				}
			);
		});

	return (
		<Web3Context.Provider
			value={{
				handleConnect,
				handleConnectPromise,
				address,
				connector,
				isConnected,
			}}
		>
			{children}
		</Web3Context.Provider>
	);
};

export default Web3Contexts;
