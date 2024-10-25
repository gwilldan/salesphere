"use client";
import { useState } from "react";
import { useAccount } from "wagmi";
import { config } from "@/web3/config";
import { writeContract, waitForTransactionReceipt } from "@wagmi/core";
import FactoryABI from "@/web3/ABI/FactoryABI";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { tokenFactory_CA_BARTIO } from "@/constants";
import { Modal } from "@/components";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { toast } from "react-toastify";

export default function CreateToken() {
	let toastID;
	const { openConnectModal } = useConnectModal();
	const { isConnected } = useAccount();
	const [loading, setLoading] = useState(false);
	const [txStatus, setTxStatus] = useState("");
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
		setTxStatus();
	};

	const handleMint = async () => {
		setLoading(true);
		setTxStatus("pending");

		try {
			const tx = await writeContract(config, {
				abi: FactoryABI,
				address: tokenFactory_CA_BARTIO,
				functionName: "createToken",
				args: [tokenData.name, tokenData.symbol, BigInt(tokenData.supply)],
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
			setTxStatus("completed");
			setTxHash(transactionReceipt?.hash);
			console.log(transactionReceipt);
			document.getElementById("myForm").reset();
			setTokenData({
				name: "",
				supply: "",
				symbol: "",
			});
		} catch (error) {
			setTxStatus("rejected");
			toastID
				? toast.update(toastID, {
						render: error.message,
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
						tokenData={tokenData}
						handleMint={handleMint}
						loading={loading}
						txStatus={txStatus}
						txHash={txHash}
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

const ModalChildren = ({
	handleMint,
	tokenData,
	loading,
	txStatus,
	txHash,
}) => {
	console.log("TX ----- ", txStatus);

	return (
		<div className="text-center ">
			{!txStatus && (
				<main>
					<img
						src="/images/cuteBear.webp"
						alt="cutebear"
						fetchPriority="high"
						className="mx-auto h-[200px] "
					/>

					<p
						className={`my-4 text-2xl ${
							txStatus === "pending" && "text-red-500"
						} `}>
						{" "}
						Mint {Number(tokenData.supply).toLocaleString()} {tokenData.name} (
						{tokenData.symbol}) tokens
					</p>
					<button
						onClick={handleMint}
						className={` bg-slate-600 shadow-xl w-[150px] h-[50px] grid place-content-center p-2 mx-auto transition-all duration-150 ease-linear hover:bg-slate-500 ${
							loading && "bg-slate-800 hover:bg-slate-800"
						} `}>
						Mint
					</button>
				</main>
			)}

			{txStatus === "rejected" && <div>TX REJECTED ...! </div>}

			{txStatus === "completed" && (
				<main>
					<img
						src="/images/dancingBear.gif"
						alt="cuteBear"
						className=" size-[200px] mx-auto rounded-full mb-5 "
					/>
					<div>
						<h2 className=" my-3">Token mint successful </h2>
						<p>{txHash}</p>
					</div>
				</main>
			)}

			{txStatus === "pending" && (
				<main>
					<div className=" text-[100px] my-4 ">
						<Loading />
					</div>
					<p className="text-xl"> Minting ... </p>
				</main>
			)}
		</div>
	);
};
