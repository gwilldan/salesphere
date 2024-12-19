"use client";
import { Spin as Hamburger } from "hamburger-react";
import ConnectButton from "./ConnectButton";
import Link from "next/link";
import { useState } from "react";
import { MobileNav } from "@/components";
import { AnimatePresence } from "framer-motion";

const Nav = () => {
	const [toggle, setToggle] = useState(false);

	return (
		<nav className=" p-4 bg-slate-900 z-10 flex items-center justify-between border-b-[0.5px] border-slate-700 ease-linear duration-150 transition-all lg:h-[80px] w-full shrink-0 shadow-lg text-white ">
			<div>
				<Link
					href="/"
					className=" font-extrabold bg-slate-700 rounded-md size-8 grid place-content-center lg:hidden">
					S
				</Link>
			</div>

			<section className="flex items-center gap-3 ">
				<ConnectButton />
				<figcaption className=" block lg:hidden">
					<Hamburger
						toggled={toggle}
						onToggle={(toggled) => setToggle(toggled)}
					/>
				</figcaption>
			</section>

			<AnimatePresence>
				{toggle && <MobileNav setToggle={setToggle} />}
			</AnimatePresence>
		</nav>
	);
};

export default Nav;
