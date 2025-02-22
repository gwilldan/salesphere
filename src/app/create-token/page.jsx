"use client";
import { useState } from "react";
import { useAccount } from "wagmi";
import { config } from "@/web3/config";
import { writeContract, waitForTransactionReceipt } from "@wagmi/core";
import FactoryABI from "@/web3/ABI/FactoryABI";
import { tokenFactory_CA } from "@/constants";
import { Modal, ModalChildren, Loading } from "@/components";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { toast } from "react-toastify";

export default function CreateToken() {
	let toastID;
	const { openConnectModal } = useConnectModal();
	const { isConnected } = useAccount();
	const [loading, setLoading] = useState(false);
	const [tx, setTx] = useState({
		status: "",
		message: "",
	});
	const [toggleModal, setToggleModal] = useState(false);
	const [txHash, setTxHash] = useState("");
	const [tokenData, setTokenData] = useState({
		name: "",
		symbol: "symbol",
		supply: "",
	});

	const handleChange = (value, elementID) => {
		setTokenData({
			...tokenData,
			[elementID]: value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setToggleModal(true);

		if (!tokenData.name || !tokenData.supply || !tokenData.symbol)
			return console.error("No token datas");
		setTx({
			message: "",
			status: "",
		});
	};

	const handleMint = async () => {
		setLoading(true);
		setTx({
			status: "awaiting",
			message: `Waiting for your approval ... `,
		});

		try {
			const tx = await writeContract(config, {
				abi: FactoryABI,
				address: tokenFactory_CA,
				functionName: "createToken",
				args: [tokenData.name, tokenData.symbol, BigInt(tokenData.supply)],
			});

			setTx({
				status: "pending",
				message: `Minting tokens ... `,
			});
			toastID = toast.loading(" Minting tokens ... ");

			const transactionReceipt = await waitForTransactionReceipt(config, {
				hash: tx,
			});

			toast.update(toastID, {
				render: `${tokenData.supply} ${tokenData.symbol} Minted successfully!`,
				type: "success",
				isLoading: false,
				autoClose: 3000,
			});
			setTx({
				status: "completed",
				message: `Minted Successfully `,
			});
			setTxHash(transactionReceipt?.hash);
			console.log(transactionReceipt);
			document.getElementById("myForm").reset();
			setTokenData({
				name: "",
				supply: "",
				symbol: "",
			});
		} catch (error) {
			setTx({
				status: "rejected",
				message: `Transaction Rejected!`,
			});
			toastID
				? toast.update(toastID, {
						render: error.shortmessage,
						autoClose: 5000,
						type: "error",
				  })
				: toast.error(`${error.shortMessage}`, {
						autoClose: 5000,
				  });
			console.error("This is handleMint error!", error.shortMessage);
		} finally {
			setLoading(false);
		}
	};

	return (
		<main className=" pt-5 px-3 mb-5 min-h-dvh  ">
			{toggleModal && (
				<Modal setToggleModal={setToggleModal}>
					<ModalChildren
						tx={tx}
						ModalMainUI={
							<ModalMainUI
								handleFunction={handleMint}
								tokenData={tokenData}
							/>
						}
					/>
				</Modal>
			)}

			<h1 className=" text-[32px] font-bold text-center mb-10">CREATE TOKEN</h1>
			<div className="bg-slate-700 max-w-[800px] mx-auto px-4 py-6 lg:p-6 rounded-lg shadow-lg ">
				<h2 className="text-2xl font-bold mb-4">Token Details</h2>
				<form
					id="myForm"
					onSubmit={handleSubmit}>
					<FormInputField
						handleChange={handleChange}
						name={"name"}
						label={"Coin Name *"}
						placeholder={"Enter coin name"}
						type={"text"}
					/>
					<FormInputField
						handleChange={handleChange}
						name={"symbol"}
						label={"Coin Symbol *"}
						placeholder={"Enter coin symbol"}
						type={"text"}
					/>
					<FormInputField
						handleChange={handleChange}
						name={"supply"}
						label={"Total Supply *"}
						placeholder={"Enter total supply"}
						type={"number"}>
						{tokenData.supply && (
							<p className="italic text-[12px] mt-2 ">
								{Number(tokenData.supply).toLocaleString()}
							</p>
						)}
					</FormInputField>

					{!isConnected ? (
						<button
							type="button"
							onClick={() => openConnectModal()}
							className={`bg-slate-400 hover:bg-slate-500 text-primary-foreground hover:bg-primary/80 px-4 py-2 rounded-md mt-5 font-semibold ease-linear duration-150 transition-all `}>
							Connect wallet
						</button>
					) : (
						<button
							type="submit"
							className={`bg-slate-400 hover:bg-slate-500 text-primary-foreground hover:bg-primary/80 px-4 py-2 rounded-md mt-5 font-semibold ease-linear duration-150 transition-all ${
								loading && "bg-slate-800 hover:bg-slate-800"
							}`}
							disabled={loading ? true : false}>
							{loading ? <Loading /> : "Create"}
						</button>
					)}
				</form>
			</div>
		</main>
	);
}

const FormInputField = ({
	label,
	name,
	type,
	placeholder,
	handleChange,
	children,
}) => {
	return (
		<div className="mb-4">
			<label
				htmlFor={name}
				className="block text-sm font-medium text-primary">
				{label}
			</label>
			<input
				onChange={(e) => handleChange(e.target.value, name)}
				required
				type={type}
				id={name}
				name={name}
				autoComplete="off"
				placeholder={placeholder}
				className="w-full px-3 py-2 bg-input border rounded-md focus:outline-none focus:ring ring-primary text-black my-1"
			/>
			{children}
		</div>
	);
};

const ModalMainUI = ({ tokenData, handleFunction }) => {
	return (
		<main>
			<img
				src="/images/cuteChog.jpg"
				alt="cuteChog"
				fetchPriority="high"
				className="mx-auto h-[200px] "
			/>

			<p className="my-4 text-2xl">
				Mint {Number(tokenData.supply).toLocaleString()} {tokenData.name} (
				{tokenData.symbol}) tokens
			</p>
			<button
				onClick={handleFunction}
				className=" bg-slate-600 shadow-xl w-[150px] h-[50px] grid place-content-center p-2 mx-auto transition-all duration-150 ease-linear hover:bg-slate-500 ">
				Mint
			</button>
		</main>
	);
};
