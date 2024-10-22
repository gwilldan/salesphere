"use client";
import { useState } from "react";

const Fund = () => {
	const [amount, setAmount] = useState("");

	const handleDonate = () => {
		console.log("donating ... ", amount);
	};

	return (
		<div className="flex-1">
			<h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
				Fund
			</h4>

			<div className="mt-[20px] flex flex-col p-4 bg-slate-700 rounded-[10px]">
				<p className="font-epilogue fount-medium text-[20px] leading-[30px] text-center text-white/80">
					Fund the campaign
				</p>
				<div className="mt-[30px]">
					<input
						type="number"
						placeholder="ETH 0.1"
						step="0.01"
						className="w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-white/80 bg-transparent font-epilogue text-white text-[18px] leading-[30px] placeholder:text-white/50 rounded-[10px]"
						value={amount}
						onChange={(e) => setAmount(e.target.value)}
					/>

					<div className="my-[20px] p-4 bg-slate-800 rounded-[10px]">
						<h4 className="font-epilogue font-semibold text-[14px] leading-[22px] text-white">
							Back it because you believe in it.
						</h4>
						<p className="mt-[20px] font-epilogue font-normal leading-[22px] text-[#808191]">
							Support the project for no reward, just because it speaks to you.
						</p>
					</div>

					<Button
						btnType="button"
						title="Fund Campaign"
						styles="w-full bg-[#8c6dfd]"
						handleClick={handleDonate}
					/>
				</div>
			</div>
		</div>
	);
};

export default Fund;

const Button = ({ btnType, title, handleClick, styles }) => {
	return (
		<button
			type={btnType}
			className={`font-epilogue font-semibold text-[16px] leading-[26px] text-white min-h-[52px] px-4 rounded-[10px] ${styles}`}
			onClick={handleClick}>
			{title}
		</button>
	);
};
