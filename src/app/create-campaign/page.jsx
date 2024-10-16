"use client";
import { useState } from "react";
import { Loader } from "@/components";
import FormField from "@/components/crowdfundings/FormField";

const CreateCampaign = () => {
	const [isLoading, setIsLoading] = useState(false);
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
		console.log("FORM VALUES", form);

		// checkIfImage(form.image, async (exists) => {
		// 	if (exists) {
		// 		setIsLoading(true);
		// 		await createCampaign({
		// 			...form,
		// 			target: ethers.utils.parseUnits(form.target, 18),
		// 		});
		// 		setIsLoading(false);
		// 		navigate("/");
		// 	} else {
		// 		alert("Provide valid image URL");
		// 		setForm({ ...form, image: "" });
		// 	}
		// });
	};

	return (
		<div className=" mt-[75px] lg:mt-[50px] bg-slate-700 text-white max-w-[800px] mx-auto flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
			{isLoading && <Loader />}
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
	);
};

export default CreateCampaign;
