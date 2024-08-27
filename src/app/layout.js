import { Inter } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components";
import Web3Providers from "@/web3/web3Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Salesphere",
	description: "Create, sale and distribute tokens by just clicks!",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={`${inter.className} bg-slate-800 text-white `}>
				<Web3Providers>
					<Nav />
					{children}
				</Web3Providers>
			</body>
		</html>
	);
}
