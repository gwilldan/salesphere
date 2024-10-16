const Suites = () => {
	return (
		<section className=" max-w-[1200px] mx-auto">
			<h2 className=" text-[26px] font-semibold text-center ">
				Our product suites
			</h2>
			<p className="text-slate-400 text-center my-4 max-w-[700px] mx-auto">
				A set of tools to easily create your own tokens and manage your token
				sales and distributions quickly, with no coding needed and fully
				decentralized!
			</p>

			<div className=" my-10 grid gap-4 grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] ">
				{suiteCards.map((suite) => (
					<figcaption
						key={suite.title}
						className=" bg-slate-900 rounded-lg p-6 text-center max-w-[500px] shrink-0 lg:hover:outline outline-slate-400 transition-all ease-linear duration-150 cursor-default">
						{/* <img src="" alt="" className="size-[64px] rounded-full " /> */}
						<div className="size-[64px] rounded-full bg-slate-600 mx-auto mb-7 "></div>
						<h2 className=" text-[18px] font-semibold my-2">{suite.title}</h2>
						<p className=" text-[14px] text-slate-400 ">{suite.description}</p>
					</figcaption>
				))}
			</div>
		</section>
	);
};

export default Suites;

const suiteCards = [
	{
		title: "Token Mint",
		description:
			"Use the minter tool to create any erc20 standard token of your choice.",
	},
	{
		title: "Private Sale",
		description:
			"Create and manage a highly confidential token sale among your chosen participants.",
	},
	{
		title: "Pubic Sale",
		description:
			"Handle token sales that are open to all or limited to a group of whitelisted participants, and track your sale progress.",
	},
	{
		title: "Token Distribution",
		description:
			"Airdrop your tokens to multiple addresses or distribute tokens to sale participants.",
	},
	{
		title: "Crowdfunding Campaigns",
		description: "Participate in crowdfunding and easily request donations.",
	},
	{
		title: "Join sales",
		description:
			"You can also easily participate in private or public sales across the platform.",
	},

	{
		title: "Management",
		description:
			"Stay connected with all your created tokens, sales, and the sales you participated in.",
	},

	{
		title: "Community",
		description:
			"Showcase your tokens to thousands of potential buyers on Salesphere.",
	},
];
