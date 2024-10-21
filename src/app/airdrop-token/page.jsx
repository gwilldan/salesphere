"use client";
import { useState, useEffect } from "react";
import AirdropABI from "@/web3/ABI/AirdropABI";
import { config } from "@/web3/config";
import {
	writeContract,
	readContract,
	waitForTransactionReceipt,
} from "@wagmi/core";
import { useAccount } from "wagmi";
import { erc20Abi, formatEther, formatUnits, parseUnits } from "viem";
import { aidrop_CA_BARTIO } from "@/constants";

import {
	checkAllowance,
	approve,
	getDecimal,
	airdrop,
	getSingleAirdropData,
	getSymbol,
	getBalance,
	getName,
	getMultiAirdropData,
} from "@/web3/utils";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function AirdropToken() {
	const [tokenData, setTokenData] = useState();
	const { address, chainId, isConnected } = useAccount();
	const [loading, setLoading] = useState(false);

	const getTokenData = async (token) => {
		if (!token) {
			setTokenData("");
			return console.error("Input token address!");
		}

		try {
			const [name, symbol, decimal, balance] = await Promise.all([
				getName(token),
				getSymbol(token),
				getDecimal(token),
				getBalance(token, address),
			]);
			const formattedBal = formatUnits(balance, Number(decimal));
			setTokenData({
				name: name,
				symbol: symbol,
				decimal: decimal,
				balance: balance,
				formattedBal: formattedBal,
				address: token,
			});
		} catch (error) {
			console.error(error?.message);
			setTokenData({
				error: "Unknown Token Address",
			});
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		setLoading(true);

		const addresses = [];
		const amounts = [];

		const formData = new FormData(e.target);
		const data = Object.fromEntries(formData);
		const addressList = data.addressList.split("\n");

		if (!data) return console.error("No form data found!");

		try {
			addressList.forEach((data) => {
				const [address, amount] = data.replaceAll(" ", "").split(",");
				addresses.push(address);
				amounts.push(parseUnits(amount, Number(tokenData.decimal)));
			});

			const [, totalAmountWithFees] = await readContract(config, {
				abi: AirdropABI,
				address: aidrop_CA_BARTIO,
				functionName: "calculateDistributeTokensFees",
				args: [amounts],
			});

			if (tokenData.balance < totalAmountWithFees)
				return console.error(`INSUFFICIENT ${tokenData.symbol} TOKEN`);

			const percentageFee = await readContract(config, {
				abi: AirdropABI,
				address: aidrop_CA_BARTIO,
				functionName: "percentageFee",
			});

			if (!totalAmountWithFees) return console.error("No Data returned!!!");

			const allowance = await checkAllowance(
				address,
				tokenData.address,
				aidrop_CA_BARTIO
			);

			if (!allowance || allowance < totalAmountWithFees) {
				const approval = await approve(
					tokenData.address,
					aidrop_CA_BARTIO,
					totalAmountWithFees
				);
				await waitForTransactionReceipt(config, {
					hash: approval,
				});
			}

			const airdropTx = await airdrop(
				aidrop_CA_BARTIO,
				tokenData.address,
				addresses,
				amounts
			);

			const airdropReciept = await waitForTransactionReceipt(config, {
				hash: airdropTx,
			});
			console.log("send tx reciept!!!", airdropReciept);

			document.getElementById("airdropForm").reset();
		} catch (error) {
			console.error("error", error?.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className=" pt-5 px-3 mb-5 min-h-dvh ">
			<h1 className=" text-[32px] font-bold text-center mb-10">
				AIRDROP TOKEN
			</h1>
			<form
				onSubmit={handleSubmit}
				id="airdropForm"
				className=" bg-slate-700 max-w-[800px] mx-auto px-4 py-6 lg:p-6 rounded-lg shadow-lg ">
				<div className="mb-4">
					<label
						htmlFor="token"
						className="block text-sm font-medium my-1 ">
						Select Token *
					</label>

					<input
						onChange={(e) => getTokenData(e.target.value)}
						required
						type="text"
						id="token"
						name="token"
						placeholder="Input token contract address"
						className="w-full px-3 py-2 placeholder-input text-black bg-input border rounded-md focus:outline-none focus:ring "
					/>

					{tokenData && (
						<p
							className={`italic text-[12px] mt-2  ${
								tokenData.error ? "text-red-500" : "text-white"
							} `}>
							{tokenData.error
								? `${tokenData.error}`
								: `Bal: ${Number(tokenData.formattedBal).toLocaleString()} ${
										tokenData.symbol
								  }`}
						</p>
					)}
				</div>

				<div className="mb-4">
					<label
						htmlFor="addressList"
						className="block text-sm font-medium text-primary my-1">
						Address List *
					</label>
					<textarea
						required
						id="addressList"
						name="addressList"
						placeholder="In each line, input the address and amount seperated by a ' comma ' (,) "
						className="w-full px-3 py-2 h-[150px] placeholder-input text-black bg-input border border-border rounded-md focus:outline-none focus:ring ring-primary "></textarea>
				</div>

				<button
					type="submit"
					className={`bg-slate-400 hover:bg-slate-500 text-primary-foreground hover:bg-primary/80 px-4 py-2 rounded-md mt-5 font-semibold ease-linear duration-150 transition-all ${
						loading && "bg-slate-800 hover:bg-slate-800"
					}`}
					disabled={loading ? true : false}>
					{loading ? <Loading /> : "Submit"}
				</button>
			</form>
		</div>
	);
}

const Loading = () => {
	return (
		<>
			<AiOutlineLoading3Quarters className="animate-spin " />
		</>
	);
};
