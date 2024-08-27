"use client";
import { Hero, Rotation } from "@/components";

export default function Home() {
	return (
		<main className=" pt-10">
			<div className=" grid grid-rows-1 lg:grid-cols-[60%_40%] items-center gap-[100px] lg:gap-[10px] lg:max-w-[1200px] mx-auto ">
				<Hero />
				<Rotation />
			</div>
		</main>
	);
}
