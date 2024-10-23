import Link from "next/link";

const FundCard = ({ funding }) => {
	return (
		<Link
			href={`/crowdfundings/${funding.id}`}
			className="rounded-[15px] bg-slate-700 cursor-pointer group hover:bg-slate-600 ease-linear duration-150 transition-all ">
			<div className="h-[158px] w-full overflow-hidden bg-slate-900 rounded-t-[15px]">
				<img
					src={funding.image}
					alt="fund"
					className=" object-cover rounded-[15px] group-hover:scale-110 ease-linear duration-150 transition-all"
				/>
			</div>

			<div className="flex flex-col p-4">
				<div className="flex flex-row items-center mb-[18px]">
					<img
						src="/type.svg"
						alt="tag"
						className="w-[17px] h-[17px] object-contain"
					/>
					<p className="ml-[12px] mt-[2px] font-epilogue font-medium text-[12px] text-[#808191]">
						Education
					</p>
				</div>

				<div className="block">
					<h3 className="font-epilogue font-semibold text-[16px] text-white text-left leading-[26px] truncate">
						{funding.title}
					</h3>
					<p className="mt-[5px] font-epilogue font-normal text-[#808191] text-left leading-[18px] truncate">
						{funding.description}
					</p>
				</div>

				<div className="flex justify-between flex-wrap mt-[15px] gap-2">
					<div className="flex flex-col">
						<h4 className="font-epilogue font-semibold text-[14px] text-[#b2b3bd] leading-[22px]">
							{funding.amountCollected}
						</h4>
						<p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate">
							Raised of {funding.totalAmount}
						</p>
					</div>
					<div className="flex flex-col">
						<h4 className="font-epilogue font-semibold text-[14px] text-[#b2b3bd] leading-[22px]">
							{funding.remainingDays}
						</h4>
						<p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate">
							Days Left
						</p>
					</div>
				</div>

				<div className="flex items-center mt-[20px] gap-[12px]">
					<div className="w-[30px] h-[30px] rounded-full flex justify-center items-center bg-slate-900">
						<img
							src="/type.svg"
							alt="user"
							className="w-1/2 h-1/2 object-contain"
						/>
					</div>
					<p className="flex-1 font-epilogue font-normal text-[12px] text-[#808191] truncate">
						by <span className="text-[#b2b3bd]">{funding.owner}</span>
					</p>
				</div>
			</div>
		</Link>
	);
};

export default FundCard;
