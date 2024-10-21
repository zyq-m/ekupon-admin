const formatedNum = (num) => {
	return new Intl.NumberFormat("en-US").format(num);
};

export { formatedNum };
