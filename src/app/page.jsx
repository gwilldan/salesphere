"use client";
import { Hero, Rotation, Suites } from "@/components";

export default function Home() {
	return (
		<main className=" pt-10 px-3 md:px-5 mb-[75px] ">
			<div className=" grid grid-rows-1 lg:grid-cols-[60%_40%] items-center gap-[100px] lg:gap-[10px] lg:max-w-[1200px] mx-auto mb-[100px] text-center lg:text-left ">
				<Hero />
				<Rotation />
			</div>
			<Suites />
		</main>
	);
}
