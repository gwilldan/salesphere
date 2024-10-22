import { fundingData } from "@/components/crowdfundings/data";
import { Fund } from "@/components";

const page = ({ params }) => {
	const camapign = fundingData.find(
		(funding) => funding.id == params.fundingID
	);

	if (!camapign)
		return (
			<div className=" m-[100px] text-center text-2xl font-semibold min-h-dvh">
				Error!
			</div>
		);

	const donators = [];

	return (
		<div className="  pt-5 px-3 mb-5 min-h-dvh lg:mb-[100px] ">
			<main className=" max-w-[1200px] mx-auto ">
				<div className=" flex md:flex-row flex-col mt-10 gap-[30px]">
					<div className="flex-1 flex-col">
						<div className=" overflow-hidden rounded-xl ">
							<img
								src={camapign.image}
								alt="campaign"
								className="w-full h-[410px] object-cover opacity-75 rounded-xl transition-all hover:opacity-90 hover:scale-110 duration-150 ease-linear "
							/>
						</div>
						<div className="relative w-full h-[5px] bg-[#3a3a43] mt-2">
							<div
								className="absolute h-full bg-[#4acd8d]"
								style={{
									// width: `${calculateBarPercentage(
									// 	state.target,
									// 	state.amountCollected
									// )}%`,
									width: "50%",
									maxWidth: "100%",
								}}></div>
						</div>
					</div>

					<div className="flex md:w-[150px] w-full flex-wrap justify-between gap-[30px]">
						<CountBox
							title="Days Left"
							value={camapign.remainingDays}
						/>
						<CountBox
							title={`Raised of ${camapign.totalAmount}`}
							value={camapign.amountCollected}
						/>
						<CountBox
							title="Total Backers"
							value={donators.length}
						/>
					</div>
				</div>

				<div className="mt-[60px] flex lg:flex-row flex-col gap-5">
					<div className="flex-[2] flex flex-col gap-[40px]">
						<div>
							<h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
								Creator
							</h4>

							<div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
								<div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-slate-900 cursor-pointer">
									<img
										src="/type.svg"
										alt="user"
										className="w-[60%] h-[60%] object-contain"
									/>
								</div>
								<div>
									<h4 className="font-epilogue font-semibold text-[14px] text-white break-all">
										{camapign.owner}
									</h4>
									<p className="mt-[4px] font-epilogue font-normal text-[12px] text-[#808191]">
										10 Campaigns
									</p>
								</div>
							</div>
						</div>

						<div>
							<h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
								Story
							</h4>

							<div className="mt-[20px]">
								<p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
									{camapign.description}
								</p>
							</div>
						</div>

						<div>
							<h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
								Donators
							</h4>

							<div className="mt-[20px] flex flex-col gap-4">
								{donators.length > 0 ? (
									donators.map((item, index) => (
										<div
											key={`${item.donator}-${index}`}
											className="flex justify-between items-center gap-4">
											<p className="font-epilogue font-normal text-[16px] text-[#b2b3bd] leading-[26px] break-ll">
												{index + 1}. {item.donator}
											</p>
											<p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] break-ll">
												{item.donation}
											</p>
										</div>
									))
								) : (
									<p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
										No donators yet. Be the first one!
									</p>
								)}
							</div>
						</div>
					</div>

					<Fund />
				</div>
			</main>
		</div>
	);
};

export default page;

const CountBox = ({ title, value }) => {
	return (
		<div className="flex flex-col items-center w-[150px] cursor-default ">
			<h4 className="font-epilogue font-bold text-[30px] text-white p-3 bg-slate-700 rounded-t-[10px] w-full text-center truncate">
				{value}
			</h4>
			<p className="font-epilogue font-normal text-[16px] text-[#cecfda] bg-slate-600 px-3 py-2 w-full rouned-b-[10px] text-center shadow-xl">
				{title}
			</p>
		</div>
	);
};
