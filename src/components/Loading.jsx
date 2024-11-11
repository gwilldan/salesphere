import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Loading = ({ className }) => {
	return (
		<div className={className && className}>
			<AiOutlineLoading3Quarters className="animate-spin mx-auto " />
		</div>
	);
};

export default Loading;
