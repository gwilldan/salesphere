"use client";
import { useEffect, useState } from "react";
import { readContract } from "@wagmi/core";
import CrowdfundingABI from "@/web3/ABI/Crowdfunding";
import { crowdFunding_CA_BARTIO } from "@/constants";
import { config } from "@/web3/config";
import { FundCard } from "..";

const BottomSection = () => {
	const [fundings, setFundings] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchFundings = async () => {
			try {
				const result = await readContract(config, {
					abi: CrowdfundingABI,
					address: crowdFunding_CA_BARTIO,
					functionName: "getCampaigns",
				});
				setFundings(result.reverse());
			} catch (error) {
				console.error("Error fetching fundings:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchFundings();
	}, []);

	console.log(fundings);

	if (loading) {
		return <div className="m-10 text-center">Loading...</div>;
	}

	return (
		<section className="mt-4 ">
			<h3 className="mt-5 mb-3">All Campaigns ({fundings.length})</h3>
			{fundings.length ? (
				<div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-5 ">
					{fundings.map((funding) => (
						<FundCard
							key={funding._id}
							funding={funding}
						/>
					))}
				</div>
			) : (
				<div className="m-10 text-center">No funding found!</div>
			)}
		</section>
	);
};

export default BottomSection;
