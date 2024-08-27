"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { config } from "./config";
import Web3Contexts from "./web3Contexts";

import { ok } from "./web3Contexts";

const queryClient = new QueryClient();

export default function Web3Context({ children }) {
	return (
		<WagmiProvider config={config}>
			<QueryClientProvider client={queryClient}>
				<Web3Contexts>{children}</Web3Contexts>
			</QueryClientProvider>
		</WagmiProvider>
	);
}
