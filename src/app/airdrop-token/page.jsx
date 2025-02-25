"use client";
import { useState } from "react";
import AirdropABI from "@/web3/ABI/AirdropABI";
import { config } from "@/web3/config";
import { readContract, waitForTransactionReceipt } from "@wagmi/core";
import { useAccount } from "wagmi";
import { formatUnits, isAddress, parseUnits } from "viem";
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
import MultiWalletInput from "./MultiWalletInput";

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
	const [txHash, setTxHash] = useState("");
	const { address, chainId, isConnected } = useAccount();
	const [lines, setLines] = useState([""]);

	const [loading, setLoading] = useState(false);
	const [toggleModal, setToggleModal] = useState(false);
	let toastID = 0;
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

			console.log("waiting to confim...", airdropTx);

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

			console.log("airdrop receipt", airdropReciept);

			setTxHash(airdropReciept?.transactionHash);
			console.log("txHash...", txHash);

			toastID &&
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

			setTokenData("");
			setCsvFile();
		} catch (error) {
			console.error("error", error);
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
			setCsvFile();
		}
	};

	const handleSubmitCSV = async () => {
		setLoading(true);

		if (!tokenData || !tokenData.address) {
			toast.error("Pls, Input contract address", { autoClose: 2000 });
			setLoading(false);
			return;
		}

		if (!csvFile) {
			setLoading(false);
			return toast.error("No CSV Uploaded!");
		}

		try {
			const { addresses, amounts } = await ParseCSV(csvFile, tokenData.decimal);

			if (addresses.length > 1_000 || amounts.length > 1_000) {
				console.error("Address list above 1,000");
				toast.error("Address list above 1,000");
				setLoading(false);
				return;
			}

			submit(tokenData.address, addresses, amounts);
		} catch (error) {
			console.error(error);
			setLoading(false);
		}
	};

	const handleSubmitText = async () => {
		try {
			setLoading(true);

			const addresses = [];
			const amounts = [];

			if (!tokenData || !tokenData.address) {
				toast.error("Input contract address", { autoClose: 2000 });
				setLoading(false);
				return;
			}

			await new Promise((res, rej) => {
				lines.forEach((data) => {
					const [address, amount] = data.replaceAll(" ", "").split(",");

					if (!address || !amount) {
						toast.error("Address and Amount Cannot be empty ");
						setLoading(false);
						rej("Address and Amount Cannot be empty ");
						return;
					}

					if (!isAddress(address) || isNaN(amount)) {
						toast.error("Input valid Address and Amount ");
						setLoading(false);
						rej("Input valid Address and Amount ");
						return;
					}

					addresses.push(address);
					amounts.push(parseUnits(amount, Number(tokenData.decimal)));
					res();
				});
			});

			if (addresses.length > 200 || amounts.length > 200) {
				console.error("Address list above 1,000");
				toast.error("Address list above 1,000");
				setLoading(false);
				return;
			}

			submit(tokenData.address, addresses, amounts);
		} catch (error) {
			console.error("error from ");
		}
	};

	const submit = async (tokenCA, addresses, amounts) => {
		setTx({
			message: "",
			status: "",
		});

		console.log("token Address....", tokenCA);
		console.log("addresses....", addresses);
		console.log("addresses....", amounts);

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
						token={""}
						txHash={txHash}
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
			<div
				id="airdropForm"
				className=" bg-slate-700 max-w-[800px] h-[550px] relative  mx-auto px-4 py-6 lg:p-6 rounded-lg shadow-lg ">
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
								Address List - not greater than 200. Use CSV for addresses up to
								1,000
							</label>
							<MultiWalletInput
								lines={lines}
								setLines={setLines}
							/>
						</>
					)}
				</div>

				<button
					onClick={csvToggle ? handleSubmitCSV : handleSubmitText}
					className={` absolute bottom-6 left-6 bg-slate-400 hover:bg-slate-500 text-primary-foreground hover:bg-primary/80 px-4 py-2 rounded-md mt-5 font-semibold ease-linear duration-150 transition-all active:bg-slate-400 ${
						loading && "bg-slate-800 hover:bg-slate-800"
					}`}
					disabled={loading ? true : false}>
					{loading ? <Loading /> : "Aidrop"}
				</button>
			</div>
		</div>
	);
}
