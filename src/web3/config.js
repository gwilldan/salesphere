"use client";
import { createConfig, http, cookieStorage, createStorage } from "wagmi";
import { sepolia, berachainTestnetbArtio } from "wagmi/chains";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";

export const config = getDefaultConfig({
	appName: "saleSPHERE",
	projectId: "e470218911d3b22edebf8113f6bc132e",
	chains: [berachainTestnetbArtio],
	ssr: true,
});
