"use client";
import { useState } from "react";
import { useAccount } from "wagmi";
import { config } from "@/web3/config";
import {
	writeContract,
	switchChain,
	waitForTransactionReceipt,
} from "@wagmi/core";
import FactoryABI from "@/web3/ABI/FactoryABI";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { tokenFactory_CA_BARTIO } from "@/constants";
import { Modal } from "@/components";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { toast } from "react-toastify";

export default function CreateToken() {
	const { openConnectModal } = useConnectModal();
	const { chainId, isConnected } = useAccount();
	const configChain = config.chains[0].id;

	const [loading, setLoading] = useState(false);
	const [txStatus, setTxStatus] = useState("");
	const [toggleModal, setToggleModal] = useState(false);
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

		if (!tokenData.name || !tokenData.supply || !tokenData.symbol)
			return console.error("No token datas");

		setToggleModal(true);
	};

	const handleMint = async () => {
		try {
			setLoading(true);

			const tx = await writeContract(config, {
				abi: FactoryABI,
				address: tokenFactory_CA_BARTIO,
				functionName: "createToken",
				args: [tokenData.name, tokenData.symbol, BigInt(tokenData.supply)],
			});

			const toastID = toast.loading(" Minting tokens ... ", {
				style: {
					backgroundColor: "#64748b",
					color: "white",
				},
			});

			const transactionReceipt = await waitForTransactionReceipt(config, {
				hash: tx,
			});

			toast.update(toastID, {
				render: `${tokenData.supply} ${tokenData.symbol} Minted successfully!`,
				type: "success",
				isLoading: false,
				autoClose: 3000,
			});

			console.log("Submitted", transactionReceipt);
			document.getElementById("myForm").reset();
		} catch (error) {
			console.error("This is handleMint error!", error);
		} finally {
			setLoading(false);
			setTokenData({
				name: "",
				supply: "",
				symbol: "",
			});
		}
	};

	return (
		<main className=" pt-5 px-3 mb-5 min-h-dvh ">
			{toggleModal && (
				<Modal setToggleModal={setToggleModal}>
					<ModalChildren
						tokenData={tokenData}
						handleMint={handleMint}
						loading={loading}
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
						type={"text"}>
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

const Loading = () => {
	return (
		<>
			<AiOutlineLoading3Quarters className="animate-spin " />
		</>
	);
};

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

const ModalChildren = ({ handleMint, tokenData, loading }) => {
	return (
		<div className=" w-fit h-fit text-center ">
			<img
				src="/images/cuteBear.webp"
				alt="cutebear"
				className="mx-auto h-[200px] "
			/>
			{/* <img
				src="/images/dancingBear.gif"
				alt="cuteBear"
				className=" size-[100px] mx-auto rounded-full"
			/> */}
			<p className="my-4 text-2xl ">
				{" "}
				Mint {Number(tokenData.supply).toLocaleString()} {tokenData.name} (
				{tokenData.symbol}) tokens
			</p>

			<button
				onClick={handleMint}
				disabled={loading ? true : false}
				className={` bg-slate-600 shadow-xl w-[150px] h-[50px] grid place-content-center p-2 mx-auto transition-all duration-150 ease-linear hover:bg-slate-500 ${
					loading && "bg-slate-800 hover:bg-slate-800"
				} `}>
				{loading ? <Loading /> : "Mint"}
			</button>
		</div>
	);
};
