import { FaUpload } from "react-icons/fa";

const CSVUpload = ({ handleFileChange, csvFile }) => {
	return (
		<>
			<div className=" my-5 ">
				<p>
					Upload a .csv file containing the address (not greater than 1,000) and
					amounts data. Here&apos;s a sample
				</p>
				<a
					className="underline italic hover:text-slate-400 ease-linear transition-colors duration-150 "
					href="/airdrop.csv">
					csv sample
				</a>{" "}
			</div>
			<div className=" flex gap-5 items-center ">
				<span>
					<label
						htmlFor="file-upload"
						className=" bg-slate-500 p-3 grid place-content-center rounded-md hover:cursor-pointer hover:bg-slate-400 ease-linear duration-150 transition-colors max-w-[200px] ">
						<span className="flex gap-4">
							<FaUpload size={24} />
							<p>upload CSV</p>
						</span>
					</label>
					<input
						id="file-upload"
						type="file"
						accept=".csv"
						onChange={handleFileChange}
						className="hidden"
					/>
				</span>
				{csvFile && (
					<span>
						<p className=" italic ">{csvFile?.name}</p>
					</span>
				)}
			</div>
		</>
	);
};

export default CSVUpload;
