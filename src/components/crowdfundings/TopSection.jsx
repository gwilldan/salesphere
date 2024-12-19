"use client";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";

const TopSection = () => {
	return (
		<section className=" flex flex-col gap-3 lg:flex-row justify-between ">
			<div className="flex gap-3 bg-slate-600 rounded-lg">
				<input
					autoComplete="off"
					onChange={(e) => console.log(e.target.value)}
					type="text"
					name="searchCampaigns"
					placeholder="Search address ... "
					id="searchCampaigns"
					className="bg-transparent text-white/80 rounded-lg px-4 py-2 focus:outline-none focus-visible:bg-inherit focus-visible:outline-none flex-1 "
				/>
				<button
					onClick={() => console.log("searching... ")}
					className="bg-blue-500 px-4 grid place-content-center text-lg rounded-lg hover:bg-blue-700 ease-linear duration-150 transition-colors ">
					<FaSearch />
				</button>
			</div>
			<Link
				href="/create-campaign"
				className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-700 ease-linear duration-150 transition-colors text-center ">
				Request Crowdfunding
			</Link>
		</section>
	);
};

export default TopSection;
