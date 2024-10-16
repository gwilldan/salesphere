import { sepolia, berachainTestnetbArtio } from "wagmi/chains";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";

export const config = getDefaultConfig({
	appName: "saleSPHERE",
	projectId: "e470218911d3b22edebf8113f6bc132e",
	chains: [sepolia, berachainTestnetbArtio],
	ssr: true, // If your dApp uses server side rendering (SSR)
});
