import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Mousewheel, Keyboard } from "swiper";

export default function SwiperCarousel({ data, GoToSectionOption }) {
	return (
		<div className="swiper-container">
			<Swiper
				breakpoints={{
					320: {
						slidesPerView: 2,
						slidesPerGroup: 2,
						spaceBetween: 10,
					},
					640: {
						slidesPerView: 4,
						slidesPerGroup: 2,
						spaceBetween: 20,
					},
					768: {
						slidesPerView: 5,
						slidesPerGroup: 2,
						spaceBetween: 20,
					},
					1024: {
						slidesPerView: 6,
						slidesPerGroup: 2,
						spaceBetween: 30,
					},
					1280: {
						slidesPerView: 7,
						slidesPerGroup: 2,
						spaceBetween: 40,
					},
					1440: {
						slidesPerView: 8,
						slidesPerGroup: 2,
						spaceBetween: 10,
					},
					1800: {
						slidesPerView: 8,
						spaceBetween: 10,
					},
				}}
				autoHeight={false}
				autowidth={"false"}
				enabled={true}
				cssMode={true}
				centerInsufficientSlides={true}
				navigation={true}
				mousewheel={true}
				keyboard={true}
				modules={[Navigation, Mousewheel, Keyboard]}
			>
				{data.map((option, index) => {
					return (
						<SwiperSlide key={index}>
							<GoToSectionOption name={option.name} id={option.id} icon={option.icon} />
						</SwiperSlide>
					);
				})}
			</Swiper>
		</div>
	);
}
