import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/bundle";
import AOS from "aos";
import "aos/dist/aos.css";

import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useEffect } from "react";

const Hero = () => {
	useEffect(() => {
		AOS.init();
		AOS.refresh();
	}, []);
	return (
		<div data-aos="fade-up" className="w-full">
			<Swiper
				className=""
				pagination={{
					dynamicBullets: true,
				}}
				loop={true}
				autoplay={{
					delay: 5000,
					disableOnInteraction: false,
				}}
				navigation={true}
				// Autoplay,
				modules={[ Pagination, Navigation]}
			>
				<SwiperSlide>
					<div className="bg-[linear-gradient(to_right_bottom,rgba(0,0,0,0.4),rgba(0,0,0,0.4)),url(hero-3.jpg)] min-w-screen  py-36 md:py-0 md:min-h-screen bg-cover bg-center bg-no-repeat flex flex-col gap-10 items-center justify-center text-white font-cinzel ">
						<h1 className="w-1/2 text-center text-4xl md:text-7xl">Luxury Redefined</h1>
						<h1 className=" text-center text- md:text-2xl md:tracking-wide">Your Grand Escape Awaits in a Realm of Unparalleled Opulence and Tranquility</h1>
					</div>
				</SwiperSlide>
				<SwiperSlide>
				<div className="bg-[linear-gradient(to_right_bottom,rgba(0,0,0,0.4),rgba(0,0,0,0.4)),url(hero-1.webp)] min-w-screen  py-36 md:py-0 md:min-h-screen bg-cover bg-center bg-no-repeat flex flex-col gap-10 items-center justify-center text-white font-cinzel ">
						<h1 className="w-1/2 text-center text-4xl md:text-7xl">Luxury Redefined</h1>
						<h1 className=" text-center text- md:text-2xl md:tracking-wide">Your Grand Escape Awaits in a Realm of Unparalleled Opulence and Tranquility</h1>
					</div>
				</SwiperSlide>
				<SwiperSlide>
				<div className="bg-[linear-gradient(to_right_bottom,rgba(0,0,0,0.4),rgba(0,0,0,0.4)),url(hero-2.webp)] min-w-screen  py-36 md:py-0 md:min-h-screen bg-cover bg-center bg-no-repeat flex flex-col gap-10 items-center justify-center text-white font-cinzel ">
						<h1 className="w-1/2 text-center text-4xl md:text-7xl">Luxury Redefined</h1>
						<h1 className=" text-center text- md:text-2xl md:tracking-wide">Your Grand Escape Awaits in a Realm of Unparalleled Opulence and Tranquility</h1>
					</div>
				</SwiperSlide>
			</Swiper>
		</div>
	);
};

export default Hero;
