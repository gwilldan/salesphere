import { useContext } from "react";
import { Web3Context } from "@/web3/web3Contexts";
import { useAccount } from "wagmi";

const ConnectButton = () => {
	const { address, handleConnect, isConnected } = useContext(
		Web3Context && Web3Context
	);
	const { connector } = useAccount();

	return (
		<button
			className="p-3 bg-slate-400 text-slate-900 font-semibold rounded-lg md:hover:bg-slate-500 transition-colors ease-linear duration-150 flex items-center gap-2 lg:gap-4 "
			onClick={handleConnect}>
			{isConnected && (
				<img
					src={connector.icon}
					alt="icon"
					className="size-[24px] outline-1 outline-black"
				/>
			)}
			{isConnected
				? address.slice(0, 4) + "..." + address.slice(-4)
				: "Connect"}
		</button>
	);
};

export default ConnectButton;
