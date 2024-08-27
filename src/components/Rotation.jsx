import React from "react";

const Rotation = () => {
	return (
		<div className="relative w-[200px] h-[200px] lg:w-[300px] lg:h-[300px] mx-auto flex items-center justify-center">
			<div className="absolute w-[60px] h-[60px] bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold">
				Token
			</div>
			<div className="absolute w-full h-full">
				<div className="absolute w-full h-full animate-spin-slow">
					<div className="absolute w-[150px] h-[150px] border border-dashed border-gray-200 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
						<div className="absolute top-0 left-1/2 w-[30px] h-[30px] bg-blue-300 rounded-full flex items-center justify-center text-xs transform -translate-x-1/2 -translate-y-full">
							create
						</div>
					</div>
					<div className="absolute w-full h-full animate-spin-slow">
						<div className="absolute w-[200px] h-[200px] border border-dashed border-gray-200 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
							<div className="absolute top-0 left-1/2 w-[30px] h-[30px] bg-green-300 rounded-full flex items-center justify-center text-xs transform -translate-x-1/2 -translate-y-full">
								sale
							</div>
						</div>
					</div>
					<div className="absolute w-full h-full animate-spin-slow">
						<div className="absolute w-[250px] h-[250px] border border-dashed border-gray-200 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
							<div className="absolute top-0 left-1/2 w-[30px] h-[30px] bg-red-300 rounded-full flex items-center justify-center text-xs transform -translate-x-1/2 -translate-y-full delay-75">
								airdrop
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Rotation;
