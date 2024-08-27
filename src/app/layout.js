import { Inter } from "next/font/google";
import "./globals.css";
import { Nav, SideBar } from "@/components";
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
				className={`${inter.className} bg-slate-800 text-white h-dvh w-dvw md:flex`}
			>
				<Web3Providers>
					<SideBar />
					<main className="w-full h-full flex flex-col">
						<Nav />
						<div className=" flex-1 overflow-y-auto pb-10 px-4 pt-[30px]">
							{children}
						</div>
					</main>
				</Web3Providers>
			</body>
		</html>
	);
}
