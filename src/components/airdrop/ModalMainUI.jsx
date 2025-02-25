import Image from "next/image";
import { formatUnits } from "viem";

const ModalMainUI = ({ handleFunction, airdropData, decimal }) => {
	return (
		<main>
			<div className="mx-auto size-[200px] rounded-full overflow-hidden mb-5 relative">
				<Image
					src="/images/cuteChog.jpg"
					alt="cuteChog"
					fetchPriority="high"
					loading="eager"
					fill
					priority
				/>
			</div>
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
