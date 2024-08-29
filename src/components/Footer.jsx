import { FaXTwitter, FaTelegram } from "react-icons/fa6";

const Footer = () => {
	return (
		<footer className=" bg-slate-900 h-[70px] p-4 mt-[100px] lg:px-[75px] flex items-center justify-between ">
			<p>
				sale<span className="text-slate-500 font-semibold">SPHERE</span>
			</p>
			<div className="flex gap-3 items-center">
				<a className="hover:text-slate-400 lg:text-2xl" href="#">
					<FaXTwitter />
				</a>
				<a className="hover:text-slate-400 lg:text-2xl" href="#">
					<FaTelegram />
				</a>
			</div>
		</footer>
	);
};

export default Footer;
