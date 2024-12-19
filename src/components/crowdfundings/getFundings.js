import { crowdFunding_CA_BARTIO } from "@/constants";
import CrowdfundingABI from "@/web3/ABI/Crowdfunding";
import { readContract } from "viem/actions";

const getFundings = (client) =>
	new Promise(async (res, rej) => {
		try {
			const fundings = await readContract(client, {
				abi: CrowdfundingABI,
				address: crowdFunding_CA_BARTIO,
				functionName: "getCampaigns",
			});

			res(fundings);
		} catch (error) {
			console.error("getFunding error...", error);
			rej(null);
		}
	});

export default getFundings;
