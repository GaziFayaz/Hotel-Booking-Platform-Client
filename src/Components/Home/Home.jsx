import { Helmet } from "react-helmet-async";
import Hero from "./Hero";
import Location from "./Location";
import Newsletter from "./Newsletter";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ReviewsCarousel from "./ReviewsCarousel";

const Home = () => {
	const [roomCategories, setRoomCategories] = useState([]);
	useEffect(() => {
		axios
			.get(`${import.meta.env.VITE_SERVER_URL}/room-categories`)
			.then((res) => setRoomCategories(res.data));
	}, []);
	return (
		<div>
			<Helmet>
				<title>Majestic Oasis | Home</title>
			</Helmet>
			<Hero></Hero>
			<Location></Location>
			<Newsletter></Newsletter>
			<div className="rooms w-full mt-6 md:mt-12 lg:mt-24">
				<h1 className="text-2xl md:text-4xl lg:text-5xl font-cinzel text-amber-500 text-center">
					Featured Rooms
				</h1>
				<p className="font-lato text-sm lg:text-lg text-center lg:mb-10">
					Explore Our Premium Selection of Luxury Rooms
				</p>
				<div className="mx-6 lg:mx-24 lg:gap-x-10 lg:gap-y-10 grid  lg:grid-cols-2">
					{roomCategories.map((roomCategory) => (
						<div
							key={roomCategory._id}
							className="relative mt-4 md:mt-8 lg:mt-0 md:mb-32 bg-base-100 shadow-xl   md:rounded-lg lg:rounded-xl"
						>
							{" "}
							<Link to={`/room-details/${roomCategory._id}`}>
								<img
									className="h-1/2 md:h-full w-full md:rounded-lg lg:rounded-xl"
									src={roomCategory.room_images[0]}
									alt="Shoes"
								/>
								<div className="md:absolute md:rounded-lg lg:rounded-xl md:w-4/5 px-4 md:px-10 py-2 md:py-6 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 bg-gray-100 flex flex-col">
									<h2 className="card-title font-cinzel">
										{roomCategory.category}
									</h2>
									<p className="font-lato">{roomCategory.description}</p>
									<div className="flex items-center w-4/5 font-lato">
										<ul className="list-disc pl-10 mt-3">
											<li>${roomCategory.price_per_night}/Night</li>
											<li>{roomCategory.room_size} sq ft</li>
										</ul>
									</div>

									<div className="card-actions justify-end">
										<Link to={`/room-details/${roomCategory._id}`}>
											<button className="btn bg-black text-amber-400">
												Book Now
											</button>
										</Link>
									</div>
								</div>
							</Link>
						</div>
					))}
				</div>
			</div>
			<ReviewsCarousel></ReviewsCarousel>
		</div>
	);
};

export default Home;
