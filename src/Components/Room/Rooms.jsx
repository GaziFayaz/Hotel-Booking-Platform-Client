import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const Rooms = () => {
	const [roomCategories, setRoomCategories] = useState([]);
	const [sorted, setSorted] = useState(false);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		// console.log(sorted);
		axios
			.get(
				`${import.meta.env.VITE_SERVER_URL}/room-categories?sorted=${sorted}`
			)
			.then((res) => {
				// console.log(res.data);
				setRoomCategories(res.data);
				setLoading(false);
			});
	}, [sorted]);
	return (
		<div className="min-h-screen flex flex-col mb-20">
			<Helmet>
				<title>Majestic Oasis | Rooms</title>
			</Helmet>
			<div className="bg-[linear-gradient(to_right_bottom,rgba(0,0,0,0.4),rgba(0,0,0,0.6)),url(hero-3.jpg)] min-w-screen  py-36 md:py-0 min-h-64 bg-cover bg-center bg-no-repeat flex flex-col gap-10 items-center justify-center text-white font-cinzel ">
				<h1 className="text-amber-400 text-5xl text-center">
					Explore Our Luxury Offerings
				</h1>
			</div>

			<div className="mt-6 self-center">
				<button
					onClick={() => setSorted(!sorted)}
					className="btn bg-black text-amber-400"
				>
					Sort by Cost
				</button>
			</div>
			{loading ? (
				<></>
			) : (
				<div className="mt-8 lg:mt-8 md:mx-6 lg:mx-12 lg:gap-x-10 lg:gap-y-10 grid  lg:grid-cols-2">
					{roomCategories.map((roomCategory) => {
						// console.log(roomCategory.reviews)
						return (
							<div
								key={roomCategory._id}
								className="relative md:mb-32 bg-base-100 shadow-xl   md:rounded-lg lg:rounded-xl"
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
										{
											roomCategory.reviews && 
											<p className="font-medium text-amber-500">Total Reviews: <span className="font-bold">{roomCategory.reviews.length}</span></p> ||
											<p className="font-medium text-amber-500">No Reviews Yet</p>
										}
										
									</div>{" "}
								</Link>
							</div>
							//
						);
					})}
				</div>
			)}
		</div>
	);
};

export default Rooms;
