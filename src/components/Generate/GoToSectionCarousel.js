import SwiperCarousel from "@/components/ui/Swiper";
import GoToSectionOption from "@/components/Generate/GoToSectionOption";
import { goToSectionCarouselOptions } from "@/config/constants";

const GoToSectionCarousel = () => {
	return <SwiperCarousel data={goToSectionCarouselOptions} GoToSectionOption={GoToSectionOption} />;
};

export default GoToSectionCarousel;
