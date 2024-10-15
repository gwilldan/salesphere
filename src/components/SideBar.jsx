import { FiPlusCircle } from "react-icons/fi";
import { FaRocket } from "react-icons/fa6";
import { GoShieldLock } from "react-icons/go";
import { TbDroplets } from "react-icons/tb";
import { AiOutlineDollarCircle } from "react-icons/ai";
import Link from "next/link";

const SideBar = () => {
	return (
		<aside className=" hidden lg:block bg-slate-900 border-r-[0.5px] border-slate-700 md:h-dvh w-[80px]">
			<Link
				href="/"
				className=" size-[80px] border-r-[0.5px] border-b-[0.5px] border-slate-700 grid place-content-center">
				<figcaption
					href="/"
					className=" font-extrabold bg-slate-700 rounded-md size-10 grid place-content-center ">
					S
				</figcaption>
			</Link>
			<div className=" p-4 flex flex-col gap-6 mt-10 items-center">
				{pages.map((page) => (
					<Link
						href={page.href}
						key={page.name}
						className=" size-10 transition-colors ease-linear duration-150 hover:bg-slate-700 rounded-md text-[24px] grid place-content-center relative group ">
						{page.icon}
						<div className=" hidden absolute left-[75px] p-3 bg-slate-300 text-slate-900 rounded-md group-hover:block transition-all ease-linear duration-200 w-[130px] text-[12px] font-semibold z-10">
							{page.name}
						</div>
					</Link>
				))}
			</div>
		</aside>
	);
};

export default SideBar;

export const pages = [
	{
		name: "Create Token",
		icon: <FiPlusCircle />,
		href: "create-token",
	},
	{
		name: "Airdrop Token",
		icon: <TbDroplets />,
		href: "airdrop-token",
	},
	{
		name: "Create Sale",
		icon: <AiOutlineDollarCircle />,
		href: "create-sale",
	},
	{
		name: "Join Public sale",
		icon: <FaRocket />,
		href: "/public-sale",
	},
	{
		name: "Join Private Sale",
		icon: <GoShieldLock />,
		href: "/private-sale",
	},
];
