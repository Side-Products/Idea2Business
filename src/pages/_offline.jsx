import PageWrapper from "@/layout/PageWrapper";
import Error404 from "@/components/Error404";

const OfflinePageForPWA = () => {
	return (
		<PageWrapper useDefaultContainer={false}>
			<Error404 />
		</PageWrapper>
	);
};

export default OfflinePageForPWA;
