import Head from "next/head";
import { title_main_page, meta_description } from "@/config/constants";

export default function PageWrapper({ title = "", description = "", useDefaultContainer = true, classes = "", blog = false, children }) {
	return (
		<>
			<Head>
				<title>{title || title_main_page}</title>
				<meta name="description" content={description || meta_description} />
				<meta charSet="utf-8" />
				<meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover" />
			</Head>

			{useDefaultContainer ? (
				<div className="w-full flex flex-col items-center min-h-screen bg-dark-1000">
					<div
						className={
							blog
								? "w-full max-w-[768px] px-6 md:px-8 lg:px-0 py-40"
								: classes
								? classes
								: "w-full max-w-[1920px] pt-36 pb-36 px-4 md:px-8 lg:px-16 xl:px-20 2xl:px-36"
						}
					>
						{children}
					</div>
				</div>
			) : (
				children
			)}
		</>
	);
}
