import { Playball } from "next/font/google";
import Image from "next/image";

const playBall = Playball({ subsets: ["latin"], weight: "400" });

const Building = () => {
	return (
		<main className=" grid place-content-center">
			<div className=" my-3 h-[400px] relative">
				<Image
					src="/building.jpeg"
					className=""
					alt="building"
					fill
					loading="eager"
				/>
			</div>

			<p className={`${playBall.className} text-[40px] mx-auto `}>
				Still building, sers!
			</p>
		</main>
	);
};

export default Building;
