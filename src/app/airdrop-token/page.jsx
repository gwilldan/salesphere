"use client";
import { useState } from "react";
import AirdropABI from "@/web3/ABI/AirdropABI";
import { config } from "@/web3/config";
import { readContract, waitForTransactionReceipt } from "@wagmi/core";
import { useAccount } from "wagmi";
import { formatUnits, parseUnits } from "viem";
import { aidrop_CA } from "@/constants";
import {
	checkAllowance,
	approve,
	getDecimal,
	airdrop,
	getSymbol,
	getBalance,
	getName,
} from "@/web3/utils";
import {
	Modal,
	ModalChildren,
	Loading,
	CSVUpload,
	ModalMainUI,
	ParseCSV,
} from "@/components";
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
	const [csvFile, setCsvFile] = useState();
	const [csvToggle, setCsvToggle] = useState(false);

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
				address: aidrop_CA,
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
				aidrop_CA
			);
			if (!allowance || allowance < totalAmountWithFees) {
				const approval = await approve(
					tokenData.address,
					aidrop_CA,
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
				aidrop_CA,
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
			setTokenData("");
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

	const handleSubmitCSV = async (e) => {
		e.preventDefault();
		if (!csvFile) {
			return toast.error("No CSV Uploaded!");
		}

		try {
			const { addresses, amounts } = await ParseCSV(csvFile, tokenData.decimal);
			submit(tokenData.address, addresses, amounts);
		} catch (error) {
			console.error(error);
		}
	};

	const handleSubmitText = (e) => {
		e.preventDefault();
		const addresses = [];
		const amounts = [];

		const formData = new FormData(e.target);
		const data = Object.fromEntries(formData);

		if (!data) return console.error("No form data found!");

		const addressList = data.addressList.split("\n");

		addressList.forEach((data) => {
			const [address, amount] = data.replaceAll(" ", "").split(",");
			addresses.push(address);
			amounts.push(parseUnits(amount, Number(tokenData.decimal)));
		});

		submit(tokenData.address, addresses, amounts);
	};

	const submit = async (tokenCA, addresses, amounts) => {
		setTx({
			message: "",
			status: "",
		});

		try {
			const percentageFee = await readContract(config, {
				abi: AirdropABI,
				address: aidrop_CA,
				functionName: "percentageFee",
			});
			const [feeAmount, totalAmountWithFees] = await readContract(config, {
				abi: AirdropABI,
				address: aidrop_CA,
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
			console.error("handleSubmit error ---- ", error);
		}
	};

	const handleFileChange = (e) => {
		setCsvFile(e.target.files[0]);
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
				onSubmit={csvToggle ? handleSubmitCSV : handleSubmitText}
				id="airdropForm"
				className=" bg-slate-700 max-w-[800px] h-[450px] relative  mx-auto px-4 py-6 lg:p-6 rounded-lg shadow-lg ">
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

				<div className="">
					<label
						htmlFor="csv"
						className="mr-5 cursor-pointer">
						<input
							type="radio"
							id="csv"
							value="csv"
							name="inputFormat"
							onClick={() => setCsvToggle(true)}
							className="mr-2 "
						/>
						CSV
					</label>
					<label
						htmlFor="text"
						className=" cursor-pointer">
						<input
							id="text"
							type="radio"
							value="text"
							name="inputFormat"
							onClick={() => setCsvToggle(false)}
							className="mr-2"
							defaultChecked
						/>
						TEXT
					</label>
				</div>

				<div className="mb-4">
					{csvToggle ? (
						<CSVUpload
							csvFile={csvFile}
							handleFileChange={handleFileChange}
						/>
					) : (
						<>
							<label
								htmlFor="addressList"
								className="block text-sm font-medium text-primary my-1">
								Address List
							</label>
							<textarea
								required
								id="addressList"
								name="addressList"
								placeholder="In each line, input the address and amount seperated by a ' comma ' (,) "
								className="w-full px-3 py-2 h-[150px] placeholder-input text-black bg-input border border-border rounded-md focus:outline-none focus:ring ring-primary "></textarea>
						</>
					)}
				</div>

				<button
					type="submit"
					className={` absolute bottom-6 left-6 bg-slate-400 hover:bg-slate-500 text-primary-foreground hover:bg-primary/80 px-4 py-2 rounded-md mt-5 font-semibold ease-linear duration-150 transition-all active:bg-slate-400 ${
						loading && "bg-slate-800 hover:bg-slate-800"
					}`}
					disabled={loading ? true : false}>
					{loading ? <Loading /> : "Aidrop"}
				</button>
			</form>
		</div>
	);
}
