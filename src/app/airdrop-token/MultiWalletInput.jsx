"use client";

import { useEffect, useRef, useState } from "react";

const MultiWalletInput = ({ lines, setLines }) => {
	const inputRefs = useRef([]);
	const [value, setValue] = useState("");
	const [lineCount, setLineCount] = useState(1);

	useEffect(() => {
		console.log("lines...", lines);
		console.log("lineCount", lineCount);

		const lastIndex = lineCount - 1;
		if (inputRefs.current[lastIndex]) {
			inputRefs.current[lastIndex].focus();
		}
	}, [lineCount, lines, inputRefs]);

	const setValueForLine = () => {
		if (!value) return;

		if (lineCount === 1) {
			setLines([value]);
			setValue("");
		} else {
			setLines([...lines, value]);
			setValue("");
		}
	};

	const clear = () => {
		setLines([""]);
		setValue("");
		setLineCount(1);
		inputRefs.current[0].value = "";
	};

	const giveKeys = (event, index) => {
		if (event.key.toLowerCase() === "enter" && value) {
			setValueForLine();
			setLineCount(lineCount + 1);
		}
		if (event.key.toLowerCase() === "backspace") {
			if (!inputRefs.current[index].value && lineCount > 1) {
				setLineCount(lineCount - 1);
			}
		}
	};

	return (
		<div className="mt-6 mb-2 transition-all rounded-2xl duration-500 overflow-hidden bg-white text-black border border-neutral-lines h-[240px] ">
			<input
				className="!hidden block p-6 input h-[60px] w-full rounded-2xl bg-transparent text-typo-80 border-0 !outline-0 text-lg placeholder:text-typo-20 "
				placeholder="Enter your wallet address"
				name="singleAddress"
			/>
			<div className="h-full relative rounded-2xl overflow-hidden min-w-[250px] mb-2 ">
				<button
					onClick={clear}
					className="absolute z-10 top-2 right-2 rounded-lg cursor-pointer bg-slate-200 p-2 ">
					Clear all
				</button>
				<div className="px-3 py-4 border-0 !outline-0 rounded-2xl text-typo-80 bg-transparent text-lg min-h-[200px] h-full overflow-y-scroll">
					{Array(lineCount)
						.fill(0)
						.map((_, index) => (
							<div
								key={index}
								className="flex items-baseline gap-2">
								<span className="w-[3ch] text-center text-typo-20 text-slate-500 ">
									{index + 1}
								</span>
								<input
									ref={(el) => (inputRefs.current[index] = el)}
									onBlur={() => setValueForLine(index)}
									onChange={(event) => setValue(event.target.value)}
									onKeyDown={(event) => giveKeys(event, index)}
									autoComplete="off"
									placeholder="Enter address, amount. e.g 0x000001, 123"
									className="relative input input-sm grow-[10] !text-lg !px-0 input-ghost !outline-none !border-none text-typo-80 placeholder:text-typo-20"
								/>
							</div>
						))}
				</div>
			</div>
		</div>
	);
};

export default MultiWalletInput;
