import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/bundle";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { indexedDBLocalPersistence } from "firebase/auth/cordova";

const RoomDetails = () => {
	const { _id } = useParams();
	// console.log("_id", _id)
	const [room, setRoom] = useState({});
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		axios.get(`${import.meta.env.VITE_SERVER_URL}/room/${_id}`).then((res) => {
			console.log(res.data);
			setRoom(res.data);
			setLoading(false);
		});
	}, [_id]);
	return (
		<div className="min-h-screen flex flex-col mb-20">
			<Helmet>
				<title>{`Majestic Oasis | ${room.category}`}</title>
			</Helmet>
			{loading ? (
				<div>
					<span className="loading loading-infinity loading-lg"></span>
				</div>
			) : (
				<div>
					<div
						className={`bg-gray-900 min-w-screen  py-36 md:py-0 min-h-64 bg-cover bg-center bg-no-repeat flex flex-col gap-10 items-center justify-center text-white font-cinzel`}
					>
						<h1 className="text-amber-400 text-5xl text-center">
							{room.category}
						</h1>
					</div>
					<div className="mx-6 md:mx-16 lg:mx-24">
						<div className="mt-8 lg:mt-8 card lg:card-side bg-base-100 shadow-xl">
							<figure className="lg:w-1/2">
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
									modules={[Autoplay, Pagination]}
								>
									{room.room_images.map((image, index) => {
										return (
											<SwiperSlide key={index}>
												<img className="object-cover" src={image} />
											</SwiperSlide>
										);
									})}
								</Swiper>
							</figure>
							<div className="card-body ">
								<p className="font-lato text-xl font-bold">{room.description}</p>
                <p><span className="font-bold text-xl">Price:</span> ${room.price_per_night}</p>
								<div className="card-actions justify-end">
                  {room.availability==="Availale"?(
                    <button className="btn btn-primary">Listen</button>
                  ):(
                    <p className="card-actions justify-end text-xl font-bold font-lato text-red-600">Room Unavailable</p>
                  )}
									
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default RoomDetails;
