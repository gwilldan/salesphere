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
			<body className={`${inter.className} bg-slate-800 text-white`}>
				<Web3Providers>
					<main className=" w-dvw h-dvh flex ">
						<SideBar />
						<div className=" flex-1 flex flex-col ">
							<Nav />
							<div className=" flex-1 overflow-y-auto  flex-shrink-0 ">
								{children}
								<Footer />
							</div>
						</div>
					</main>
				</Web3Providers>
			</body>
		</html>
	);
}
