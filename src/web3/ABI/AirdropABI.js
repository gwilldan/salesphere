export const AidropABI = [
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "distributor",
				type: "address",
			},
			{
				indexed: true,
				internalType: "address",
				name: "token",
				type: "address",
			},
			{
				indexed: true,
				internalType: "address",
				name: "recipient",
				type: "address",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount",
				type: "uint256",
			},
		],
		name: "AirdropExecuted",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "from",
				type: "address",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "feeAmount",
				type: "uint256",
			},
		],
		name: "FeeCollected",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "previousOwner",
				type: "address",
			},
			{
				indexed: true,
				internalType: "address",
				name: "newOwner",
				type: "address",
			},
		],
		name: "OwnershipTransferred",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "uint256",
				name: "newPercentageFee",
				type: "uint256",
			},
		],
		name: "PercentageFeeUpdated",
		type: "event",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address",
			},
		],
		name: "airdropCounts",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address[]",
				name: "recipients",
				type: "address[]",
			},
			{
				internalType: "uint256",
				name: "amount",
				type: "uint256",
			},
		],
		name: "calculateDistributeSingleAmountFees",
		outputs: [
			{
				internalType: "uint256",
				name: "totalFee",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "totalAmount",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256[]",
				name: "amounts",
				type: "uint256[]",
			},
		],
		name: "calculateDistributeTokensFees",
		outputs: [
			{
				internalType: "uint256",
				name: "totalFee",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "totalAmount",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "token",
				type: "address",
			},
			{
				internalType: "address[]",
				name: "recipients",
				type: "address[]",
			},
			{
				internalType: "uint256",
				name: "amount",
				type: "uint256",
			},
		],
		name: "distributeSingleAmount",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "token",
				type: "address",
			},
			{
				internalType: "address[]",
				name: "recipients",
				type: "address[]",
			},
			{
				internalType: "uint256[]",
				name: "amounts",
				type: "uint256[]",
			},
		],
		name: "distributeTokens",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [],
		name: "owner",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "percentageFee",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "renounceOwnership",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_percentageFee",
				type: "uint256",
			},
		],
		name: "setPercentageFee",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "newOwner",
				type: "address",
			},
		],
		name: "transferOwnership",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
];
