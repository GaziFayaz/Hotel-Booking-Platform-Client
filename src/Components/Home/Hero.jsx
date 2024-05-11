import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/bundle";
import AOS from "aos";
import "aos/dist/aos.css";

import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Hero = () => {
	useEffect(() => {
		AOS.init();
		AOS.refresh();
	}, []);

	const slideContent = (
		<>
			<h1 className="w-1/2 text-center text-4xl md:text-7xl text-amber-400">
				Luxury Redefined
			</h1>
			<h1 className="text-center text-indigo-100 font-medium md:text-2xl md:tracking-wide">
				Your Grand Escape Awaits in a Realm of Unparalleled Tranquility
			</h1>
			<Link to={"/book-now"}>
				<button className="btn bg-black text-amber-400 text-lg border-amber-400">
					Book Now
				</button>
			</Link>
		</>
	);
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
				modules={[Autoplay, Pagination, Navigation]}
			>
				<SwiperSlide>
					<div className="bg-[linear-gradient(to_right_bottom,rgba(0,0,0,0.4),rgba(0,0,0,0.6)),url(hero-3.jpg)] min-w-screen  py-36 md:py-0 md:min-h-screen bg-cover bg-center bg-no-repeat flex flex-col gap-10 items-center justify-center text-white font-cinzel ">
						{slideContent}
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className="bg-[linear-gradient(to_right_bottom,rgba(0,0,0,0.4),rgba(0,0,0,0.6)),url(hero-1.webp)] min-w-screen  py-36 md:py-0 md:min-h-screen bg-cover bg-center bg-no-repeat flex flex-col gap-10 items-center justify-center text-white font-cinzel ">
						{slideContent}
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className="bg-[linear-gradient(to_right_bottom,rgba(0,0,0,0.4),rgba(0,0,0,0.6)),url(hero-2.webp)] min-w-screen  py-36 md:py-0 md:min-h-screen bg-cover bg-center bg-no-repeat flex flex-col gap-10 items-center justify-center text-white font-cinzel ">
						{slideContent}
					</div>
				</SwiperSlide>
			</Swiper>
		</div>
	);
};

export default Hero;
