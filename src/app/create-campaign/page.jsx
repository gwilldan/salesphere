"use client";
import { useState } from "react";
import { Loader } from "@/components";
import FormField from "@/components/crowdfundings/FormField";
import { useAccount } from "wagmi";
import { toast } from "react-toastify";
import Link from "next/link";
import { waitForTransactionReceipt, writeContract } from "@wagmi/core";
import { config } from "@/web3/config";
import CrowdfundingABI from "@/web3/ABI/Crowdfunding";
import { crowdFunding_CA_BARTIO } from "@/constants";

const CreateCampaign = () => {
	const { address } = useAccount();

	const [form, setForm] = useState({
		name: "",
		title: "",
		description: "",
		target: "",
		deadline: "",
		image: "",
	});

	const handleFormFieldChange = (fieldName, e) => {
		setForm({ ...form, [fieldName]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const owner = address;
		const title = form.title;
		const description = form.description;
		const target = Number(form.target);
		const deadline = Math.floor(new Date(form.deadline) / 1000);
		const image = form.image;

		try {
			const result = await toast.promise(
				async () => {
					const res = await writeContract(config, {
						abi: CrowdfundingABI,
						address: crowdFunding_CA_BARTIO,
						functionName: "createCampaign",
						args: [owner, title, description, target, deadline, image],
					});
					const txRes = await waitForTransactionReceipt(config, {
						hash: res,
					});
					return txRes;
				},
				{
					error: {
						render: "Error!",
					},
					pending: {
						render: "Creating Campaign ... ",
					},
					success: {
						render: () => {
							return (
								<div>
									<p>Campain created successfully!</p>
									<Link
										className="underline "
										href={`../crowdfundings`}>
										See your campaign
									</Link>
								</div>
							);
						},
					},
				}
			);

			console.log("result", result);
		} catch (error) {
			console.error("error", error);
		}
	};

	return (
		<main className=" px-3 mb-[100px] min-h-dvh ">
			<div className=" mt-[75px] lg:mt-[50px] bg-slate-700 text-white max-w-[800px] mx-auto flex justify-center items-center flex-col rounded-[10px] md:p-10 py-5 px-3">
				<h1 className=" text-[32px] font-bold text-center">Start a campaign</h1>

				<form
					onSubmit={handleSubmit}
					className="w-full mt-[25px] flex flex-col gap-5 lg:gap-[30px]">
					<div className="flex flex-wrap gap-5 lg:gap-[40px]">
						<FormField
							labelName="Your Name *"
							placeholder="John Doe"
							inputType="text"
							value={form.name}
							handleChange={(e) => handleFormFieldChange("name", e)}
						/>
						<FormField
							labelName="Campaign Title *"
							placeholder="Write a title"
							inputType="text"
							value={form.title}
							handleChange={(e) => handleFormFieldChange("title", e)}
						/>
					</div>

					<FormField
						labelName="Story *"
						placeholder="Write your story"
						isTextArea
						value={form.description}
						handleChange={(e) => handleFormFieldChange("description", e)}
					/>

					<div className="w-full flex justify-start items-center p-4 bg-[#8c6dfd] h-[75px] rounded-[10px]">
						<img
							src="/money.svg"
							alt="money"
							className="w-[40px] h-[40px] object-contain"
						/>
						<h4 className="font-epilogue font-bold text-5 lg:text-[25px] text-white ml-[20px]">
							You will get 100% of the raised amount
						</h4>
					</div>

					<div className="flex flex-wrap gap-5 lg:gap-[40px]">
						<FormField
							labelName="Goal ($) *"
							placeholder="1,000,000"
							inputType="text"
							value={form.target}
							handleChange={(e) => handleFormFieldChange("target", e)}
						/>
						<FormField
							labelName="End Date *"
							placeholder="End Date"
							inputType="date"
							value={form.deadline}
							handleChange={(e) => handleFormFieldChange("deadline", e)}
						/>
					</div>

					<FormField
						labelName="Campaign image *"
						placeholder="Place image URL of your campaign"
						inputType="url"
						value={form.image}
						handleChange={(e) => handleFormFieldChange("image", e)}
					/>

					<button className=" bg-blue-500 hover:bg-blue-600 px-5 py-3 mx-auto rounded-lg shadow-md">
						Submit new campaign
					</button>
				</form>
			</div>
		</main>
	);
};

export default CreateCampaign;
