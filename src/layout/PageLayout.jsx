import Head from "next/head";
import { title_main_page, meta_description } from "@/config/constants";

export default function PageLayout({ title = "", description = "", useDefaultContainer = true, classes = "", children }) {
	return (
		<>
			<Head>
				<title>{title || title_main_page}</title>
				<meta name="description" content={description || meta_description} />
				<meta charSet="utf-8" />
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>

			{useDefaultContainer ? (
				<div className="w-full flex flex-col items-center min-h-screen bg-dark-1000">
					<div className={classes ? classes : "w-full max-w-[1920px] pt-40 pb-36 px-4 md:px-8 lg:px-16 xl:px-20 2xl:px-36"}>{children}</div>
				</div>
			) : (
				children
			)}
		</>
	);
}
