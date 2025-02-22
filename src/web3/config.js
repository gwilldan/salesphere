"use client";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";

import { defineChain } from "viem";

export const monad = defineChain({
	id: 10143,
	name: "Monad Testnet",
	nativeCurrency: { name: "Monad", symbol: "MON", decimals: 18 },
	rpcUrls: {
		default: {
			http: ["https://testnet-rpc.monad.xyz/"],
		},
	},
	blockExplorers: {
		default: {
			name: "Monad Explorer",
			url: "http://testnet.monadexplorer.com/",
		},
	},
});

export const config = getDefaultConfig({
	appName: "saleSPHERE",
	projectId: "e470218911d3b22edebf8113f6bc132e",
	chains: [monad],
	ssr: true,
});
