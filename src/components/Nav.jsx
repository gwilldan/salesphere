"use client";
import { useContext } from "react";
import { Spin as Hamburger } from "hamburger-react";
import ConnectButton from "./ConnectButton";

const Nav = () => {
	return (
		<nav className=" p-4 bg-slate-900 z-10  flex items-center justify-between">
			<h1 className=" font-extrabold bg-slate-700 rounded-md size-8 grid place-content-center">
				S
			</h1>

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
