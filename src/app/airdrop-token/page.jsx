"use client";
import { useState, useEffect } from "react";
import { AidropABI } from "@/web3/ABI/AirdropABI";
import { config } from "@/web3/config";
import { writeContract, readContract } from "@wagmi/core";
import { useAccount } from "wagmi";
import { erc20Abi, parseUnits } from "viem";
import {
	checkAllowance,
	approve,
	getDecimal,
	airdrop,
	getSingleAirdropData,
	txComplete,
	getSymbol,
} from "@/web3/utils";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function AirdropToken() {
	// // airdropTool deployed contract address
	// const CA = "0xC318C75A4F7Aae09fFDBb09062E1116828f894E2";
	// const [decimal, setDecimal] = useState(18);
	// const [symbol, setSymbol] = useState("");
	// const { address, chainId } = useAccount();
	const [loading, setLoading] = useState(false);

	// const getTokenData = async (e) => {
	// 	e.preventDefault();
	// 	const token = e?.target?.value;
	// 	if (!token) return console.error("token address input value missing!");
	// 	const decimal = await getDecimal(token);
	// 	const symbol = await getSymbol(token);

	// 	console.log(decimal);
	// 	console.log(symbol);
	// 	// setDecimal(decimal);
	// 	// setSymbol(symbol);
	// };

	const handleSubmit = async (e) => {
		e.preventDefault();

		const formData = new FormData(e.target);
		const data = Object.fromEntries(formData);

		console.log("form data =======> ", data);

		// if (!data) return console.error("No form data found!");

		// try {
		// 	const token = data.token;
		// 	const addressList = data.addressList.replace(/\s+/g, "").split(",");
		// 	const amounts = data.amounts
		// 		.replace(/\s+/g, "")
		// 		.split(",")
		// 		.map((val) => parseUnits(val, Number(decimal)));

		// 	if (token && addressList && amounts) {
		// 		if (amounts.length === 1) {
		// 			const singleAmount = amounts[0];

		// 			const { totalAmountWithFees } = await getSingleAirdropData(
		// 				CA,
		// 				addressList,
		// 				singleAmount
		// 			);

		// 			if (!totalAmountWithFees) return console.log("No Data returned!!!");

		// 			const allowance = await checkAllowance(address, token, CA);
		// 			console.log(
		// 				"Total amount with fees",
		// 				totalAmountWithFees,
		// 				typeof totalAmountWithFees
		// 			);
		// 			console.log("Allowance", allowance, typeof allowance);

		// 			// if (allowance == 0 || allowance < totalAmountWithFees) {
		// 			// 	console.log("allowance is less than the total amount required ");
		// 			// } else {
		// 			// 	console.log(
		// 			// 		"You can transfer tokens as the allowance is greater than amount needed!"
		// 			// 	);
		// 			// }

		// 			if (allowance == 0 || allowance < totalAmountWithFees) {
		// 				const approval = await approve(token, CA, totalAmountWithFees);
		// 				console.log("hash", approval);
		// 				// const txReciept = await txComplete(approval);
		// 				// console.log("tx reciept!!!", txReciept);
		// 			}

		// 			const tx = await airdrop(CA, token, addressList, singleAmount);
		// 			console.log(tx);

		// 			// document.getElementById("airdropForm").reset();
		// 		} else {
		// 			console.log("amount array", amounts);
		// 			// const allowance = await checkAllowance(address, token, CA);
		// 			// if (allowance == 0) {
		// 			// 	console.log("ALLOWANCE IS ZERO");
		// 			// } else {
		// 			// 	console.log("THERE IS FUCKING ALLOWANCE!!! " + allowance);
		// 			// }

		// 			// const tx = await writeContract(config, {
		// 			// 	abi: AidropABI,
		// 			// 	address: CA,
		// 			// 	functionName: "distributeTokens",
		// 			// 	args: [token, addressList, amounts],
		// 			// });

		// 			// console.log("Successful...", tx);
		// 			// document.getElementById("airdropForm").reset();
		// 		}
		// 	}
		// } catch (error) {
		// 	console.error("error", error);
		// }
	};

	return (
		<div className=" mb-[150px]">
			<h1 className=" text-[32px] font-bold text-center mb-10">
				AIRDROP TOKEN
			</h1>
			<form
				onSubmit={handleSubmit}
				id="airdropForm"
				className=" bg-slate-700 max-w-[800px] mx-auto px-4 py-6 lg:p-6 rounded-lg shadow-lg "
			>
				<div className="mb-4">
					<label htmlFor="token" className="block text-sm font-medium my-1 ">
						Select Token
					</label>

					<input
						// onBlur={getTokenData}
						type="text"
						id="token"
						name="token"
						placeholder="Input token contract address"
						className="w-full px-3 py-2 placeholder-input text-black bg-input border rounded-md focus:outline-none focus:ring "
					/>
				</div>
				<div className="mb-4">
					<label
						htmlFor="addressList"
						className="block text-sm font-medium text-primary my-1"
					>
						Address List
					</label>
					<textarea
						required
						id="addressList"
						name="addressList"
						placeholder="Enter addresses separated by commas"
						rows="3"
						className="w-full px-3 py-2 placeholder-input text-black bg-input border border-border rounded-md focus:outline-none focus:ring ring-primary"
					></textarea>
				</div>
				<div className="mb-4">
					<label className="block text-sm font-medium text-primary my-1">
						Send Same Amount?
					</label>
					<div className="flex items-center">
						<input
							type="radio"
							id="same"
							name="same-amount"
							value="yes"
							className="mr-2"
						/>
						<label htmlFor="notSame" className="mr-4">
							Yes
						</label>
						<input
							type="radio"
							id="notSame"
							name="same-amount"
							value="no"
							className="mr-2"
						/>
						<label htmlFor="same-amount-no">No</label>
					</div>
				</div>
				<div className="mb-4 hidden" id="amount-input">
					<label
						htmlFor="amount"
						className="block text-sm font-medium text-primary my-1"
					>
						Amount
					</label>
					<input
						type="number"
						id="amount"
						name="amount"
						placeholder="Enter amount"
						className="w-full px-3 py-2 placeholder-input text-black bg-input border border-border rounded-md focus:outline-none focus:ring ring-primary"
					/>
				</div>
				<div className="mb-4">
					<label
						htmlFor="amounts"
						className="block text-sm font-medium text-primary my-1"
					>
						Amounts
					</label>
					<textarea
						required
						id="amounts"
						name="amounts"
						placeholder="Enter amounts for each address seperated by commas"
						rows="3"
						className="w-full px-3 py-2 placeholder-input text-black bg-input border border-border rounded-md focus:outline-none focus:ring ring-primary"
					></textarea>
				</div>
				<button
					type="submit"
					className={`bg-slate-400 hover:bg-slate-500 text-primary-foreground hover:bg-primary/80 px-4 py-2 rounded-md mt-5 font-semibold ease-linear duration-150 transition-all ${loading &&
						"bg-slate-800 hover:bg-slate-800"}`}
					disabled={loading ? true : false}
				>
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
