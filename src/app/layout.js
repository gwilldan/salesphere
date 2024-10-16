import { Inter } from "next/font/google";
import "./globals.css";
import { Footer, Nav, SideBar } from "@/components";
import Web3Providers from "@/web3/web3Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Salesphere",
	description: "Create, sale and distribute tokens by just clicks!",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body
				className={`${inter.className} bg-slate-800 text-white h-dvh w-dvw md:flex `}>
				<SideBar />
				<main className="w-full h-full flex flex-col overflow-x-hidden">
					<Web3Providers>
						<Nav />
						<div className=" flex-1 overflow-y-auto pt-[30px] lg:pt-[100px] ">
							<div className=" px-4 min-h-dvh">{children}</div>
							<Footer />
						</div>
					</Web3Providers>
				</main>
			</body>
		</html>
	);
}
