import React, { useContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async';
import { AuthContext } from '../../Providers/AuthProvider';
import axios from 'axios';

const MyBookings = () => {
  const [loading, setLoading] = useState(true)
  const [bookings, setBookings] = useState([])
  const {user} = useContext(AuthContext)
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_SERVER_URL}/user-bookings/${user.uid}`)
    .then(res => {
      // console.log(res.data)
      setBookings(res.data)
      setLoading(false)
    })
  }, [user.uid])
  return (
    <div className=" flex flex-col mb-20">
			<Helmet>
				<title>Majestic Oasis | My Bookings</title>
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
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
  )
}

export default MyBookings