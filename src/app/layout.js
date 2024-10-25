import { Inter } from "next/font/google";
import "./globals.css";
import { Footer, Nav, SideBar } from "@/components";
import Web3Providers from "@/web3/web3Providers";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

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
					<ToastContainer
						position="bottom-right"
						pauseOnHover={false}
						pauseOnFocusLoss={false}
						hideProgressBar
						newestOnTop={false}
						limit={1}
						rtl={false}
						closeButton={false}
					/>
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
