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
			<Web3Providers>
				<body
					className={`${inter.className} bg-slate-800 text-white h-dvh w-dvw overflow-hidden md:flex`}
				>
					<SideBar />
					<main className="w-full">
						<Nav />

						{children}
					</main>
				</body>
			</Web3Providers>
		</html>
	);
}
