"use client";
import { useEffect, useState } from "react";
import { TopSection, BottomSection } from "@/components";
import { fundingData } from "@/components/crowdfundings/data";

const page = () => {
	const [fundings, setFundings] = useState(fundingData);
	const [search, setSearch] = useState("");

	const handleSearch = () => {
		setFundings(
			fundingData.filter(
				(data) =>
					data.title.toLowerCase().includes(search.toLowerCase()) ||
					data.category.toLowerCase().includes(search.toLowerCase()) ||
					data.description.toLowerCase().includes(search.toLowerCase())
			)
		);
		return;
	};

	useEffect(() => {
		if (!search) setFundings(fundingData);
	}, [search]);

	return (
		<main className=" pt-[50px] px-3 md:px-5 min-h-dvh mb-[100px]  ">
			<div className=" max-w-[1200px] mx-auto ">
				<TopSection
					setSearch={setSearch}
					handleSearch={handleSearch}
				/>
				<BottomSection fundings={fundings} />
			</div>
		</main>
	);
};

export default page;
