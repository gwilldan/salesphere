import { TopSection, BottomSection, getFundings } from "@/components";

const Crowdfundings = () => {
	return (
		<main className=" pt-[50px] px-3 md:px-5 min-h-dvh mb-[100px]  ">
			<div className=" max-w-[1200px] mx-auto ">
				<TopSection />
				<BottomSection />
			</div>
		</main>
	);
};

export default Crowdfundings;
