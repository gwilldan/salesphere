import { TopSection, BottomSection } from "@/components";

const page = () => {
	return (
		<main className=" pt-[75px] lg:pt-5 px-2 ">
			<div className=" max-w-[1200px] mx-auto ">
				<TopSection />
				<BottomSection />
			</div>
		</main>
	);
};

export default page;
