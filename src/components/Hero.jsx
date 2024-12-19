"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const Hero = () => {
	const words = ["Create", "Presale", "Private sale", "Airdrop", "Launch"];
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
		}, 3000);

		return () => clearInterval(interval);
	}, [words.length]);

	return (
		<header className=" ">
			<h2 className=" relative text-[26px] lg:text-[48px] font-semibold leading-[30px] lg:leading-[50px] text-white ">
				<AnimatePresence mode="wait">
					<motion.span
						key={currentIndex}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						transition={{ duration: 0.5 }}
						className="inline-block text-orange-600">
						{words[currentIndex]}
					</motion.span>
				</AnimatePresence>
				<br />
				your tokens in one click
			</h2>
			<p className=" text-[14px] text-slate-400 lg:text-base mt-4 leading-6">
				Simplify your ERC-20 token journey. From creation to distribution,
				manage everything effortlessly with a single platform designed to
				accelerate your token launch. Focus on your vision while Salesphere
				handles the rest
			</p>

			<div className=" flex mt-7 items-center gap-4 w-fit mx-auto lg:w-full ">
				<Link
					href="/create-token"
					className=" bg-slate-400 text-slate-900 px-4 py-3 rounded-md lg:hover:bg-slate-500 font-semibold ease-linear transition-colors duration-100 ">
					Create Token
				</Link>

				<a
					href="#"
					className="underline hover:text-slate-400 ease-linear transition-colors duration-100">
					Learn more
				</a>
			</div>
		</header>
	);
};

export default Hero;
