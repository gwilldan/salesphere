import { Playball } from "next/font/google";

const playBall = Playball({ subsets: ["latin"], weight: "400" });

const Building = () => {
	return (
		<main className=" grid place-content-center">
			<img
				src="/building.svg"
				className=" my-3 h-[400px] "
			/>
			<p className={`${playBall.className} text-[40px] mx-auto `}>
				Still building, sers!
			</p>
		</main>
	);
};

export default Building;
