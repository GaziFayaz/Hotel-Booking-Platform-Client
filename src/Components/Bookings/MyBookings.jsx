import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../Providers/AuthProvider";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCheck } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";

const MyBookings = () => {
	const [loading, setLoading] = useState(true);
	const [bookings, setBookings] = useState([]);
	const [updateClicked, setUpdateClicked] = useState(false);
	const [updateClickedFor, setUpdateClickedFor] = useState(null);
	const [selectedDate, setSelectedDate] = useState(null);
	const { user } = useContext(AuthContext);
	useEffect(() => {
		axios
			.get(`${import.meta.env.VITE_SERVER_URL}/user-bookings/${user.uid}`)
			.then((res) => {
				console.log(res.data);
				setBookings(res.data);
				setLoading(false);
			});
	}, [user.uid]);

	const handleUpdate = (_id) => {
		console.log("booking id", _id);
		console.log("sending Date", selectedDate, typeof selectedDate);
		axios.post(
			`${import.meta.env.VITE_SERVER_URL}/update-booking-date/${_id}`,
			{ date: selectedDate }
		);
		setUpdateClickedFor(null);
		setSelectedDate(null);
		setUpdateClicked(false);
	};

	const handleDelete = (bookingId, room) => {
		axios.post(`${import.meta.env.VITE_SERVER_URL}/user-cancel-book/${user.uid}`, {bookingId: bookingId})
		.then( () => {
			axios.delete(`${import.meta.env.VITE_SERVER_URL}/delete-book/${bookingId}`)
			.then( () => {
				axios.post(`${import.meta.env.VITE_SERVER_URL}/unbook-room/${room}`)
				setBookings(bookings.forEach( booking => {
					if(booking._id !== bookingId){
						return booking
					}
				}))
			})
		})
		
	}

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
				<div className="flex flex-col items-center justify-center">
					<div
						className={`w-full bg-gray-900 min-w-screen  py-20 md:py-0   md:min-h-48 lg:min-h-64 bg-cover bg-center bg-no-repeat flex flex-col gap-10 items-center justify-center text-white font-cinzel`}
					>
						<h1 className="text-amber-400 text-2xl md:text-4xl lg:text-5xl text-center">
							My Bookings
						</h1>
					</div>
					<div className="w-full px-6 md:px-16 lg:px-24">
						<div className="overflow-x-auto w-full">
							<table className="table-lg w-full">
								{/* head */}
								<thead>
									<tr>
										<th></th>
										<th>Date</th>
										<th>Room</th>
										<th>Price</th>
										<th></th>
									</tr>
								</thead>
								<tbody>
									{bookings.map((booking) => {
										return (
											<tr key={booking._id}>
												<th>1</th>
												<td className="">
													{new Date(booking.date).toLocaleDateString()}
												</td>
												<td>{booking.room}</td>
												<td>{booking.price_per_night}</td>
												<td>
													<button className="btn bg-amber-500 text-white ">
														Review
													</button>
												</td>
												<td>
													{updateClicked && updateClickedFor === booking._id ? (
														<div className="flex items-center gap-2">
															{console.log(
																"type of date from booking",
																typeof booking.date
															)}
															<DatePicker
																className="border-2 border-black p-2 rounded-md"
																selected={
																	selectedDate
																		? selectedDate
																		: new Date(booking.date)
																}
																onChange={(date) => {
																	setSelectedDate(date);
																	console.log(
																		"type of date from onchange",
																		typeof date
																	);
																}}
															/>
															<FaCheck
																onClick={() => handleUpdate(booking._id)}
																className="text-xl cursor-pointer"
															/>
															<IoCloseSharp onClick={() => {
																setUpdateClicked(false)
																setUpdateClickedFor(null)
															}} className="text-3xl cursor-pointer" />
														</div>
													) : (
														<button
															onClick={() => {
																setUpdateClicked(!updateClicked);
																setUpdateClickedFor(booking._id);
															}}
															className="btn btn-success text-white"
														>
															Update
														</button>
													)}
												</td>
												<td>
													<button onClick={() => handleDelete(booking._id, booking.room)} className="btn btn-error text-white">
														Cancel
													</button>
												</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default MyBookings;
