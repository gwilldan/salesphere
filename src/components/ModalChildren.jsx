import Image from "next/image";
import { Loading } from ".";
import addToMetamask from "@/web3/addToMetamask";

const ModalChildren = ({ ModalMainUI, tx, txHash, token }) => {
	console.log("tx... ", tx);

	return (
		<div className="text-center  ">
			{!tx.status && ModalMainUI}

			{tx.status === "rejected" && <div>{tx.message} </div>}

			{tx.status === "completed" && (
				<main className=" ">
					<div className="size-[200px] mx-auto rounded-full mb-5 relative">
						<Image
							src="/images/dancingChog.gif"
							alt="dancingChog"
							fill
							priority
							fetchPriority="high"
							loading="eager"
						/>
					</div>
					<div className="">
						<h2 className=" my-1">{tx.message} </h2>
						<p className="max-w-[350px] mx-auto flex flex-wrap overflow-hidden">
							<a
								className=" underline text-blue-300 hover:text-blue-100 "
								target="_blank"
								href={`https://testnet.monadexplorer.com/tx/${txHash}`}
								alt="txHash">{`https://testnet.monadexplorer.com/tx/${txHash}`}</a>
						</p>

						{token && (
							<div className="pt-5">
								<p>Token address </p>
								<p>{token}</p>
								<button
									onClick={() => addToMetamask(token)}
									className=" border shadow-sm my-4 px-2 py-1 bg-slate-300 text-black ">
									Add Token to metamask{" "}
								</button>
							</div>
						)}
					</div>
				</main>
			)}

			{tx.status === "approving" && (
				<main>
					<Loading className={"text-[100px] my-4 "} />
					<p className="text-xl"> {tx.message} </p>
				</main>
			)}

			{tx.status === "awaiting" && (
				<main>
					<img
						src="/images/cuteChog.jpg"
						alt="cuteChog"
						fetchPriority="high"
						className="mx-auto h-[200px] mb-5 "
					/>
					<p className="text-xl"> {tx.message} </p>
				</main>
			)}

			{tx.status === "pending" && (
				<main>
					<Loading className={"text-[100px] my-4 "} />
					<p className="text-xl"> {tx.message} </p>
				</main>
			)}
		</div>
	);
};

export default ModalChildren;
