"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { config } from "./config";
import Web3Contexts from "./web3Contexts.js";
import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";

const queryClient = new QueryClient();

export default function Web3Context({ children }) {
	return (
		<WagmiProvider config={config}>
			<QueryClientProvider client={queryClient}>
				<RainbowKitProvider>
					<Web3Contexts>{children}</Web3Contexts>
				</RainbowKitProvider>
			</QueryClientProvider>
		</WagmiProvider>
	);
}
