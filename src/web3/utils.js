import {
	writeContract,
	readContract,
	getTransactionReceipt,
} from "@wagmi/core";
import { AidropABI } from "./ABI/AirdropABI";
import { config } from "./config";
import { erc20Abi } from "viem";

export const getDecimal = async (tokenAddress) => {
	const decimal = await readContract(config, {
		abi: erc20Abi,
		address: tokenAddress,
		functionName: "decimals",
	});
	return decimal;
};

export const getBalance = async (tokenAddress, userAddress) => {
	const balance = await readContract(config, {
		abi: erc20Abi,
		address: tokenAddress,
		functionName: "balanceOf",
		args: [userAddress],
	});
	return balance;
};

export const getName = async (tokenAddress) => {
	const name = await readContract(config, {
		abi: erc20Abi,
		address: tokenAddress,
		functionName: "name",
	});
	return name;
};

export const getSymbol = async (tokenAddress) => {
	const symbol = await readContract(config, {
		abi: erc20Abi,
		address: tokenAddress,
		functionName: "symbol",
	});
	return symbol;
};

export const checkAllowance = async (
	userAddress,
	tokenAddress,
	airdropToolAddress
) => {
	const allowance = await readContract(config, {
		abi: erc20Abi,
		address: tokenAddress,
		functionName: "allowance",
		args: [userAddress, airdropToolAddress],
	});
	return allowance;
};

export const approve = async (tokenAddress, airdropToolAddress, amount) => {
	const tx = await writeContract(config, {
		abi: erc20Abi,
		address: tokenAddress,
		functionName: "approve",
		args: [airdropToolAddress, amount],
	});

	return tx;
};

export const getSingleAirdropData = async (
	airdropToolAddress,
	addressList,
	amount
) => {
	const [totalFees, totalAmounts] = await readContract(config, {
		abi: AidropABI,
		address: airdropToolAddress,
		functionName: "calculateDistributeSingleAmountFees",
		args: [addressList, amount],
	});

	return {
		totalAmount: totalAmount,
		totalAmountWithFees: totalAmountWithFees,
	};
};

export const getMultiAirdropData = async (airdropToolAddress, amounts) => {
	const [totalFees, totalAmounts] = await readContract(config, {
		abi: AidropABI,
		address: airdropToolAddress,
		functionName: "calculateDistributeTokensFees",
		args: [amounts],
	});

	return {
		totalFees: totalFees,
		totalAmounts: totalAmounts,
	};
};

export const txComplete = async (hash, chainId) => {
	const txReciept = await getTransactionReceipt(config, {
		hash: hash,
		chainId: chainId,
	});
	return txReciept;
};

export const airdrop = async (
	airdropToolAddress,
	tokenAddress,
	addressList,
	amount
) => {
	const tx = await writeContract(config, {
		abi: AidropABI,
		address: airdropToolAddress,
		functionName: "distributeSingleAmount",
		args: [tokenAddress, addressList, amount],
	});

	return tx;
};
