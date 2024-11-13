import Papa from "papaparse";
import { parseUnits } from "viem";

const ParseCVS = async (csv, decimal) =>
	new Promise((res, rej) => {
		const addresses = [];
		const amounts = [];

		try {
			Papa.parse(csv, {
				step: (row) => {
					const address = row.data[0].replaceAll(" ", "");
					const amount = row.data[1].replaceAll(" ", "");

					if (!address || !amount) return;
					addresses.push(address);
					amounts.push(parseUnits(amount, Number(decimal)));
				},
				skipEmptyLines: true,
				complete: () => {
					res({
						addresses,
						amounts,
					});
				},
			});
		} catch (error) {
			rej(null);
			console.error(error);
		}
	});

export default ParseCVS;
