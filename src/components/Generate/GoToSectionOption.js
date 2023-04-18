const GoToSectionOption = ({ name, id, icon }) => {
	return (
		<div
			onClick={() => {
				const section = document.getElementById(id);
				section.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
			}}
			className={
				"group flex flex-col justify-center items-center cursor-pointer text-light-200 transition duration-300 "
				// " pb-2 border-b-2 border-b-transparent hover:border-b-primary-400"
			}
		>
			<i className={"text-gradient-primary-tr-group text-2xl " + (icon ? icon : "fa-solid fa-xmark")}></i>
			<div className="text-gradient-primary-tr-group text-sm mt-2 text-center">{name}</div>
		</div>
	);
};

export default GoToSectionOption;
