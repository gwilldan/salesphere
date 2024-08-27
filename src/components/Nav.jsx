"use client";
import { Spin as Hamburger } from "hamburger-react";
import ConnectButton from "./ConnectButton";
import Link from "next/link";

const Nav = () => {
	return (
		<nav className=" p-4 bg-slate-900 z-10  flex items-center justify-between border-b-[0.5px] border-slate-700 lg:h-[80px]">
			<div>
				<Link
					href="/"
					className=" font-extrabold bg-slate-700 rounded-md size-8 grid place-content-center lg:hidden"
				>
					S
				</Link>
			</div>

			<section className="flex items-center gap-3 ">
				<ConnectButton />

				<figcaption className=" block md:hidden">
					<Hamburger />
				</figcaption>
			</section>
		</nav>
	);
};

export default Nav;
