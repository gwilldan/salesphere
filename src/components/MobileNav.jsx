"use client";
import { motion } from "framer-motion";
import { slideDown, slideDownChild } from "@/components/anim";
import Link from "next/link";
import { pages } from "./SideBar";

const MobileNav = ({ setToggle }) => {
	return (
		<motion.ul
			variants={slideDown}
			initial="initial"
			animate="animate"
			exit="initial"
			className="absolute h-0 transition-all ease-linear duration-150 top-[80px] bg-slate-900 w-full right-0 lg:hidden flex flex-col gap-10 pt-20 "
		>
			{pages.map((page) => (
				<motion.li
					key={page.name}
					variants={slideDownChild}
					className=" ml-[30%]"
				>
					<Link
						href={page.href}
						onClick={() => setToggle(false)}
						className="flex gap-4 items-center "
					>
						<figcaption className=" text-2xl">{page.icon}</figcaption>
						<figcaption>{page.name}</figcaption>
					</Link>
				</motion.li>
			))}
		</motion.ul>
	);
};

export default MobileNav;
