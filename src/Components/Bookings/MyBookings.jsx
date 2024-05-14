import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../Providers/AuthProvider";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCheck } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

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
		// console.log("booking id", _id);
		// console.log("sending Date", selectedDate, typeof selectedDate);
		axios.post(
			`${import.meta.env.VITE_SERVER_URL}/update-booking-date/${_id}`,
			{ date: selectedDate }
		);
		bookings.forEach((booking) => {
			if (booking._id === _id) {
				booking.date = selectedDate;
			}
		});
		setUpdateClickedFor(null);
		setSelectedDate(null);
		setUpdateClicked(false);
    toast.success("Booking date has been Updated Successfully");
	};

	const handleDelete = (bookingId, room) => {
		Swal.fire({
			title: "Are you sure?",
			text: "You booking will be canceled!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, cancel it!",
		}).then((result) => {
			if (result.isConfirmed) {
				axios
					.post(
						`${import.meta.env.VITE_SERVER_URL}/user-cancel-book/${user.uid}`,
						{
							bookingId: bookingId,
						}
					)
					.then(() => {
						axios
							.delete(
								`${import.meta.env.VITE_SERVER_URL}/delete-book/${bookingId}`
							)
							.then(() => {
								axios.post(
									`${import.meta.env.VITE_SERVER_URL}/unbook-room/${room}`
								);
								// console.log(bookings.map( booking => {
								// 	if(booking._id !== bookingId){
								// 		return booking
								// 	}
								// }))
								setBookings(
									bookings.filter((booking) => booking._id !== bookingId)
								);
							});
					});
          toast.success("Booking Cancelled");
			}
		});
	};

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
						{bookings.length === 0 ? (
							<h1 className="text-center h-full mt-24 text-2xl font-lato font-bold text-red-500">
								No Bookings Available!
							</h1>
						) : (
							<div className="overflow-x-auto w-full">
								<table className="table-lg w-full font-lato text-center font-bold">
									{/* head */}
									<thead>
										<tr className="text-xl">
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
													<td className="text-lg">
														{new Date(booking.date).toLocaleDateString()}
													</td>
													<td className="text-lg">{booking.room}</td>
													<td className="text-lg">{booking.price_per_night}</td>
													<td>
														<button className="btn bg-amber-500 text-lg text-white ">
															Review
														</button>
													</td>
													<td>
														{updateClicked &&
														updateClickedFor === booking._id ? (
															<div className="flex items-center gap-2">
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
																<IoCloseSharp
																	onClick={() => {
																		setUpdateClicked(false);
																		setUpdateClickedFor(null);
																	}}
																	className="text-3xl cursor-pointer"
																/>
															</div>
														) : (
															<button
																onClick={() => {
																	setUpdateClicked(!updateClicked);
																	setUpdateClickedFor(booking._id);
																}}
																className="btn btn-success text-lg text-white"
															>
																Update
															</button>
														)}
													</td>
													<td>
														<button
															onClick={() =>
																handleDelete(booking._id, booking.room)
															}
															className="btn btn-error text-lg text-white"
														>
															Cancel
														</button>
													</td>
												</tr>
											);
										})}
									</tbody>
								</table>
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default MyBookings;
