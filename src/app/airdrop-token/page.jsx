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
	getSymbol,
	getBalance,
	getName,
} from "@/web3/utils";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Modal, ModalChildren, Loading } from "@/components";
import { toast } from "react-toastify";

export default function AirdropToken() {
	const [tokenData, setTokenData] = useState();
	const [airdropData, setAirdropData] = useState({
		token: "",
		symbol: "",
		feePercentage: "",
		feeAmount: "",
		tokenAmount: "",
		addressList: [],
		amountList: [],
	});
	const [tx, setTx] = useState({
		status: "",
		message: "",
	});
	const { address, chainId, isConnected } = useAccount();

	const [loading, setLoading] = useState(false);
	const [toggleModal, setToggleModal] = useState(false);
	let toastID;

	const getTokenData = async (token) => {
		if (!token) {
			setTokenData("");
			console.error("Input token address!");
			return;
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

	const handleAirdrop = async () => {
		setLoading(true);
		setTx({ status: "awaiting", message: `Waiting for your confirmation...` });
		try {
			//get fee information
			const [, totalAmountWithFees] = await readContract(config, {
				abi: AirdropABI,
				address: aidrop_CA_BARTIO,
				functionName: "calculateDistributeTokensFees",
				args: [airdropData.amountList],
			});

			// if there's no fee data
			if (!totalAmountWithFees) {
				console.error("No Data returned!!!");
				toast.error("No Data returned", {
					autoClose: 3000,
				});
				setTx({ status: "rejected", message: `No Data Returned!` });
				return;
			}

			//check if balance there's sufficient balance for transaction.
			if (tokenData.balance < totalAmountWithFees) {
				toast.error(`INSUFFICIENT ${tokenData.symbol} TOKEN`, {
					autoClose: 3000,
				});
				setTx({
					status: "rejected",
					message: `Insufficient ${token.symbol} token`,
				});
				console.error(`INSUFFICIENT ${tokenData.symbol} TOKEN`);
				return;
			}

			// check and handle token allowance
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

				setTx("approving");
				setTx({
					status: "approving",
					message: `Approving tokens for the airdrop ... `,
				});
				toastID = toast.loading(" Approving tokens for airdrop ... ");

				await waitForTransactionReceipt(config, {
					hash: approval,
				});
			}
			const airdropTx = await airdrop(
				aidrop_CA_BARTIO,
				tokenData.address,
				airdropData.addressList,
				airdropData.amountList
			);

			setTx({ status: "pending", message: `Airdropping tokens to users ` });
			toastID
				? toast.update(toastID, {
						render: "Airdropping tokens to users",
						autoClose: 5000,
				  })
				: (toastID = toast.loading(`Airdropping tokens to users`, {
						autoClose: 5000,
				  }));

			const airdropReciept = await waitForTransactionReceipt(config, {
				hash: airdropTx,
			});

			toast.update(toastID, {
				render: "Successfully airdropped!",
				autoClose: 5000,
				type: "success",
				isLoading: false,
			});
			setTx({
				status: "completed",
				message: `Airdrop successful`,
			});

			document.getElementById("airdropForm").reset();
		} catch (error) {
			console.error("error", error?.shortMessage);
			toastID
				? toast.update(toastID, {
						render: error.shortmessage,
						autoClose: 5000,
						type: "error",
				  })
				: toast.error(`${error.shortMessage}`, {
						autoClose: 5000,
				  });

			setTx({
				status: "rejected",
				message: `Transaction Rejected!`,
			});
		} finally {
			setLoading(false);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		setTx({
			message: "",
			status: "",
		});

		const addresses = [];
		const amounts = [];

		const formData = new FormData(e.target);
		const data = Object.fromEntries(formData);
		const addressList = data.addressList.split("\n");
		const tokenCA = data.token;

		if (!data) return console.error("No form data found!");

		try {
			addressList.forEach((data) => {
				const [address, amount] = data.replaceAll(" ", "").split(",");
				addresses.push(address);
				amounts.push(parseUnits(amount, Number(tokenData.decimal)));
			});
			const res = await Promise.all([]);
			const percentageFee = await readContract(config, {
				abi: AirdropABI,
				address: aidrop_CA_BARTIO,
				functionName: "percentageFee",
			});
			const [feeAmount, totalAmountWithFees] = await readContract(config, {
				abi: AirdropABI,
				address: aidrop_CA_BARTIO,
				functionName: "calculateDistributeTokensFees",
				args: [amounts],
			});

			setAirdropData({
				...airdropData,
				addressList: addresses,
				amountList: amounts,
				symbol: tokenData.symbol,
				token: tokenCA,
				feePercentage: percentageFee,
				feeAmount: feeAmount,
				tokenAmount: totalAmountWithFees - feeAmount,
			});

			setToggleModal(true);
		} catch (error) {
			toast.error(
				error.shortMessage ? error.shortMessage : "Submission Error!"
			);
			console.error("handleSubmit error ---- ", error?.shortMessage);
		}
	};

	return (
		<div className=" pt-5 px-3 mb-5 min-h-dvh ">
			{toggleModal && (
				<Modal setToggleModal={setToggleModal}>
					<ModalChildren
						ModalMainUI={
							<ModalMainUI
								handleFunction={handleAirdrop}
								airdropData={airdropData}
								decimal={tokenData.decimal}
							/>
						}
						tx={tx}
					/>
				</Modal>
			)}
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
						autoComplete="off"
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
					className={`bg-slate-400 hover:bg-slate-500 text-primary-foreground hover:bg-primary/80 px-4 py-2 rounded-md mt-5 font-semibold ease-linear duration-150 transition-all active:bg-slate-400 ${
						loading && "bg-slate-800 hover:bg-slate-800"
					}`}
					disabled={loading ? true : false}>
					{loading ? <Loading /> : "Aidrop"}
				</button>
			</form>
		</div>
	);
}

const ModalMainUI = ({ handleFunction, airdropData, decimal }) => {
	return (
		<main>
			<img
				src="/images/cuteBear.avif"
				alt="cuteBear"
				fetchPriority="high"
				className="mx-auto h-[200px] mb-5 "
			/>
			<p className=" my-5">
				Confirm the Airdrop of{" "}
				{Number(formatUnits(airdropData.tokenAmount, decimal)).toLocaleString()}{" "}
				{airdropData.symbol} to {airdropData.addressList.length} addresses
			</p>

			<button
				onClick={handleFunction}
				className=" bg-slate-600 shadow-xl w-[150px] h-[50px] grid place-content-center p-2 mx-auto transition-all duration-150 ease-linear hover:bg-slate-500 ">
				Airdrop
			</button>
		</main>
	);
};
