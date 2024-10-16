const FormField = ({
	labelName,
	placeholder,
	inputType,
	isTextArea,
	value,
	handleChange,
}) => {
	return (
		<label className="flex-1 w-full flex flex-col ">
			{labelName && (
				<span className="font-epilogue font-medium text-[14px] leading-[22px] text-white mb-[10px]">
					{labelName}
				</span>
			)}
			{isTextArea ? (
				<textarea
					required
					value={value}
					onChange={handleChange}
					rows={10}
					placeholder={placeholder}
					className="py-[15px] bg-white sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-black font-semibold text-[14px] placeholder:text-slate-700 placeholder:font-light rounded-[10px] sm:min-w-[300px]"
				/>
			) : (
				<input
					required
					value={value}
					onChange={handleChange}
					type={inputType}
					step="0.1"
					placeholder={placeholder}
					className="py-[15px]  bg-white sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-black text-[14px] font-semibold placeholder:text-slate-700 placeholder:font-light  rounded-[10px] sm:min-w-[300px]"
				/>
			)}
		</label>
	);
};

export default FormField;
