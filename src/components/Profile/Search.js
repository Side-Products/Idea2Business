import { useState } from "react";
import { useRouter } from "next/router";
import CustomButton from "@/layout/CustomButton";

export default function Search() {
	const [searchText, setSearchText] = useState("");
	const router = useRouter();

	const submitHandler = (e) => {
		e.preventDefault();
		if (searchText.trim()) {
			router.push(`/profile?search=${searchText}`);
		} else {
			router.push(`/profile`);
		}
	};

	return (
		<form className="w-full flex gap-x-2" onSubmit={submitHandler}>
			<div className="w-2/3 h-[40px] bg-search-200 rounded-full p-1.5 group">
				<input
					className="p-0 pl-3 border-0 bg-transparent outline-0 text-sm transition duration-300 leading-[28px]"
					id="search-input"
					type="text"
					placeholder="Search"
					value={searchText}
					onChange={(e) => {
						setSearchText(e.target.value);
					}}
				/>
				<span className="flex items-center justify-center float-right p-2 duration-300 rounded-full cursor-pointer dark:text-white w-7 h-7 bg-search-100 dark:bg-dark-600 hover:bg-dark-800 group-hover:text-black group-hover:bg-white">
					<i className="fas fa-search"></i>
				</span>
			</div>

			<div>
				<CustomButton type="submit" primary={true} rounded={true} classes="text-md px-6 h-full">
					Search
				</CustomButton>
			</div>
		</form>
	);
}
