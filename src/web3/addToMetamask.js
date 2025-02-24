"use client";
import { toast } from "react-toastify";
import { getDecimal, getName, getSymbol } from "./utils";

const addToMetamask = async (CA) => {
	try {
		if (!window.ethereum.isMetaMask) {
			toast.error("Metamask Wallet not connected");
			return;
		}

		console.log("fetching...");

		const [symbol, decimal] = await Promise.all([
			getSymbol(CA),
			getDecimal(CA),
		]);

		console.log("   ca and decimal ...");
		console.log("CA", CA, typeof CA);
		console.log("decimal", decimal, typeof decimal);
		console.log("symbol", symbol, typeof symbol);
		console.log("adding");

		await window.ethereum.request({
			method: "wallet_watchAsset",
			params: {
				type: "ERC20",
				options: {
					address: CA,
					symbol: symbol,
					decimals: decimal,
					image: "",
				},
			},
		});
	} catch (error) {
		console.error("error from addToMetamask", error);
	}
};

export default addToMetamask;
