"use client";
import { useRef, useEffect, useState } from "react";

const Modal = ({ children, setToggleModal }) => {
	const ref = useRef();

	useEffect(() => {
		const outsideClode = (e) => {
			if (ref.current && !ref.current.contains(e.target)) {
				setToggleModal(false);
			}
		};

		window.addEventListener("mousedown", outsideClode);

		return () => window.removeEventListener("mousedown", outsideClode);
	}, []);

	return (
		<div className=" w-dvw h-dvh z-50 fixed top-0 left-0 grid place-content-center bg-slate-950/60 text-white p-4 ">
			<main
				ref={ref}
				className="bg-slate-700 rounded-lg shadow-2xl w-[350px] h-[500px] lg:size-[500px] p-4 grid place-content-center ">
				<div>{children}</div>
			</main>
		</div>
	);
};

export default Modal;
