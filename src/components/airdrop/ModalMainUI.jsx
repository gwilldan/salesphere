import { formatUnits } from "viem";

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
				{airdropData.symbol} to{" "}
				{airdropData.addressList.length.toLocaleString()} addresses
			</p>

			<button
				onClick={handleFunction}
				className=" bg-slate-600 shadow-xl w-[150px] h-[50px] grid place-content-center p-2 mx-auto transition-all duration-150 ease-linear hover:bg-slate-500 ">
				Airdrop
			</button>
		</main>
	);
};

export default ModalMainUI;
