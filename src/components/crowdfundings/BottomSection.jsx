import { FundCard } from "..";

const BottomSection = ({ fundings }) => {
	return (
		<section className="mt-4 ">
			<h3 className=" mt-5 mb-3">All Campaigns (8) </h3>
			{fundings.length ? (
				<div className=" grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-5 ">
					{fundings.map((funding, index) => (
						<FundCard
							key={index}
							funding={funding}
						/>
					))}
				</div>
			) : (
				<div className=" m-10 text-center ">No funding found!</div>
			)}
		</section>
	);
};

export default BottomSection;
