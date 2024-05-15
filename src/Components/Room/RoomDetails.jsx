import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/bundle";
import { Autoplay, Pagination } from "swiper/modules";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";

const RoomDetails = () => {
	const { _id } = useParams();
	const { user } = useContext(AuthContext);
	const navigate = useNavigate();
	const [room, setRoom] = useState({});
	const [reviews, setReviews] = useState([]);
	const [loading, setLoading] = useState(true);
	const [startDate, setStartDate] = useState(new Date());
	useEffect(() => {
		axios.get(`${import.meta.env.VITE_SERVER_URL}/room/${_id}`).then((res) => {
			console.log(res.data);
			setRoom(res.data);
			console.log("reviews", res.data.reviews);
			if (res.data?.category) {
				axios
					.get(
						`${import.meta.env.VITE_SERVER_URL}/room-reviews/${
							res.data.category
						}`
					)
					.then((res) => {
						console.log("reviews from get", res.data);
						setReviews(res.data);
					});
				setLoading(false);
			}
		});
	}, [_id]);

	const handleBook = () => {
		if (user) {
			Swal.fire({
				title: "Confirm Booking?",
				html: `<b>Room</b>: ${room.category}<br /> <b>Price</b>: ${
					room.price_per_night
				} <br><b>Date</b>: ${startDate.toLocaleDateString()}`,
				showCancelButton: true,
				confirmButtonColor: "black",
				cancelButtonColor: "#d33",
				confirmButtonText: "Yes, Confirm!",
			}).then((result) => {
				if (result.isConfirmed) {
					axios
						.post(`${import.meta.env.VITE_SERVER_URL}/booking`, {
							bookedBy: user.uid,
							date: startDate,
							room: room.category,
						})
						.then((res) => {
							// console.log(res.data);
							axios
								.post(
									`${import.meta.env.VITE_SERVER_URL}/book-room/${room._id}`,
									{}
								)
								.then(() => {
									setRoom({ ...room, availability: "Not Available" });
								});
							axios.post(
								`${import.meta.env.VITE_SERVER_URL}/user-book-room/${user.uid}`,
								{ roomId: res.data.insertedId }
							);
						});
				}
			});
		} else {
			navigate("/login");
		}
	};
	return (
		<div className=" flex flex-col mb-20">
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
						className={`bg-gray-900 min-w-screen  py-20 md:py-0   md:min-h-48 lg:min-h-64 bg-cover bg-center bg-no-repeat flex flex-col gap-10 items-center justify-center text-white font-cinzel`}
					>
						<h1 className="text-amber-400 text-2xl md:text-4xl lg:text-5xl text-center">
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
												<img
													className="object-cover h-full w-full"
													src={image}
												/>
											</SwiperSlide>
										);
									})}
								</Swiper>
							</figure>
							<div className="card-body lg:p-16 lg:space-y-5">
								<h1 className="text-2xl md:text-3xl font-lato font-bold">
									{room.category}
								</h1>
								<p className="font-lato text-xl">{room.description}</p>
								<p className="text-xl font-lato">
									<span className="font-bold ">Price:</span> $
									{room.price_per_night}
								</p>
								<p className="text-xl font-lato">
									<span className="font-bold ">Room Size:</span>{" "}
									{room.room_size} sq ft
								</p>
								{room.special_offers ? (
									<p className="text-xl font-lato">
										<span className="font-bold ">Special Offer: </span>{" "}
										{room.special_offers}
									</p>
								) : (
									<></>
								)}

								<div className="card-actions justify-end">
									{room.availability === "Available" ? (
										<div className="flex items-center lg: gap-4">
											<DatePicker
												className="border-2 border-black p-2 rounded-md"
												selected={startDate}
												onChange={(date) => {
													setStartDate(date);
													console.log(date);
												}}
											/>
											<button
												onClick={handleBook}
												className="btn bg-black text-amber-400 font-lato text-lg"
											>
												Book Now
											</button>
										</div>
									) : (
										<p className="card-actions justify-end text-xl font-bold font-lato text-red-600">
											Room Unavailable
										</p>
									)}
								</div>
								{reviews && (
									<div className="w-full bg-gray-900 px-4 md:px-10 py-3 md:py-6 rounded-xl md:rounded-3xl">
										<h1 className="text-lg md:text-2xl text-amber-500 font-bold font-lato mb-2 md:mb-6">
											Ratings
										</h1>
										<div className="w-full flex flex-col gap-4">
											{reviews.map((review) => {
												return (
													<div
														className="p-2 md:p-6 bg-gray-300 rounded-lg"
														key={review._id}
													>
														<h1 className="text-lg md:text-xl font-bold">
															Rated: {review.rating}/5
														</h1>
														<h1 className="font-semibold">
															{review.displayName}
														</h1>
														<p className="">"{review.comment}"</p>
													</div>
												);
											})}
										</div>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default RoomDetails;
