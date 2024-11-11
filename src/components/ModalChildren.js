import { Loading } from ".";

const ModalChildren = ({ ModalMainUI, tx, txHash }) => {
	console.log("tx... ", tx);

	return (
		<div className="text-center ">
			{!tx.status && ModalMainUI}

			{tx.status === "rejected" && <div>{tx.message} </div>}

			{tx.status === "completed" && (
				<main>
					<img
						src="/images/dancingBear.gif"
						alt="cuteBear"
						className=" size-[200px] mx-auto rounded-full mb-5 "
					/>
					<div>
						<h2 className=" my-3">{tx.message} </h2>
						<p>{txHash}</p>
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
						src="/images/cuteBear.avif"
						alt="cutebear"
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
