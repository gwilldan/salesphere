export const slideDownChild = {
	initial: { opacity: 0 },
	animate: { opacity: 1 },
};

export const slideDown = {
	initial: {
		height: 0,
		transition: {
			staggerChildren: 0.05,
			staggerDirection: -1,
			ease: "linear",
			when: "afterChildren",
		},
	},

	animate: {
		height: "calc(100dvh - 80px)",
		transition: {
			delayChildren: 0.2,
			staggerChildren: 0.2,
		},
	},
};

export const popIn = {
	initial: {
		opacity: 0,
		scale: 0.8,
		transition: {
			ease: "linear",
			when: "afterChildren",
			duration: 0.5,
		},
	},

	animate: {
		opacity: 1,
		scale: 1,
		transition: {
			ease: "linear",
			when: "beforeChildren",
			duration: 0.5,
		},
	},
};

export const slideIn = {
	initial: {
		opacity: 0,
		width: 0,
		transition: {
			ease: "linear",
			when: "afterChildren",
			duration: 0.5,
		},
	},

	animate: {
		opacity: 1,
		width: 300,
		transition: {
			ease: "linear",
			when: "beforeChildren",
			duration: 0.5,
		},
	},
};
