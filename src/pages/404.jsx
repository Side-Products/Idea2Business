import PageWrapper from "@/layout/PageWrapper";
import Error404 from "@/components/Error404";

const ErrorPage = () => {
	return (
		<PageWrapper useDefaultContainer={false}>
			<Error404 />
		</PageWrapper>
	);
};

export default ErrorPage;
