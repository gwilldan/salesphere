"use client";
import { useAccount } from "wagmi";
import { config } from "@/web3/config";
import {
	writeContract,
	switchChain,
	waitForTransactionReceipt,
} from "@wagmi/core";
import { FactoryABI } from "@/web3/ABI/FactoryABI";
import { Web3Context } from "@/web3/web3Contexts";
import { useContext, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function CreateToken() {
	const { chainId } = useAccount();
	const configChain = config.chains[0].id;
	const { isConnected } = useAccount();
	const { handleConnectPromise } = useContext(Web3Context);

	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		const formData = new FormData(e.target);
		const data = Object.fromEntries(formData);

		if (!data) return console.error("No form data");

		try {
			if (!isConnected) {
				await handleConnectPromise();
			}

			if (chainId !== configChain) {
				await switchChain(config, { chainId: configChain });
			}
			const tx = await writeContract(config, {
				abi: FactoryABI,
				address: "0x8c2a5f464d3ef1178850aa430b8b6a8ad1c06231",
				functionName: "createToken",
				args: [data.name, data.symbol, BigInt(data.supply)],
			});

			const transactionReceipt = await waitForTransactionReceipt(config, {
				hash: tx,
			});

			console.log("Submitted", transactionReceipt);
			document.getElementById("myForm").reset();
		} catch (error) {
			console.error("This is handleSubmit error!", error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<main className=" pt-5 ">
			<h1 className=" text-[32px] font-bold text-center mb-10">CREATE TOKEN</h1>
			<div className="bg-slate-700 max-w-[800px] mx-auto px-4 py-6 lg:p-6 rounded-lg shadow-lg ">
				<h2 className="text-2xl font-bold mb-4">Token Details</h2>
				<form
					id="myForm"
					onSubmit={handleSubmit}>
					<div className="mb-4">
						<label
							htmlFor="name"
							className="block text-sm font-medium text-primary">
							Coin Name *
						</label>
						<input
							required
							type="text"
							id="name"
							name="name"
							placeholder="Enter coin name"
							className="w-full px-3 py-2 bg-input border rounded-md focus:outline-none focus:ring ring-primary text-black my-1"
						/>
					</div>
					<div className="mb-4">
						<label
							htmlFor="symbol"
							className="block text-sm font-medium text-primary">
							Coin Symbol *
						</label>
						<input
							required
							type="text"
							id="symbol"
							name="symbol"
							placeholder="Enter coin symbol"
							className="w-full px-3 py-2 placeholder-input bg-input border rounded-md focus:outline-none focus:ring ring-primary text-black my-1"
						/>
					</div>

					<div className="mb-4">
						<label
							htmlFor="coin-symbol"
							className="block text-sm font-medium text-primary">
							Total Supply *
						</label>
						<input
							required
							type="number"
							id="supply"
							name="supply"
							placeholder="Enter total supply"
							className="w-full px-3 py-2 placeholder-input bg-input border rounded-md focus:outline-none focus:ring ring-primary text-black no-arrows  my-1"
						/>
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
