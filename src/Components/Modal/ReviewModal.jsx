import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const ReviewModal = ({ user, booking, bookings, setBookings }) => {
	const { register, handleSubmit } = useForm();
	const onSubmit = (data) => {
		// console.log(data);
		// console.log("booking", booking)
		const review = {
			displayName: user.displayName,
			reviewer: user.uid,
			...data,
			rating: parseInt(data.rating),
			room: booking.room,
			timestamp: new Date(),
		};
		// console.log("review", review);
		axios
			.post(`${import.meta.env.VITE_SERVER_URL}/add-review`, review)
			.then((res) => {
				// console.log("review added", res.data);
				const reviewId = res.data.insertedId;
				if (reviewId) {
					axios
						.post(
							`${import.meta.env.VITE_SERVER_URL}/add-review-to-user/${
								user.uid
							}`,
							{ reviewId: reviewId }
						)
						.then((res) => {
							// console.log("user reviews update", res.data);
						});
					axios
						.post(
							`${import.meta.env.VITE_SERVER_URL}/add-review-to-room/${
								booking.room
							}`,
							{ reviewId: reviewId }
						)
						.then((res) => {
							// console.log("room reviews update", res.data);
						});
					axios
						.post(
							`${import.meta.env.VITE_SERVER_URL}/booking-reviewed/${
								booking._id
							}`
						)
						.then((res) => {
							// console.log("booking review updated", res.data);
							booking.reviewed = true;
							setBookings(
								bookings.filter((singleBooking) => {
									if (singleBooking._id === booking._id) {
										return booking;
									}
                  else{
                    return singleBooking
                  }
								})
							);
						});

					document.getElementById("my_modal_5").close();
					toast.success("Thanks for the review!");
				}
			});
	};
	return (
		<dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
			<div className="modal-box bg-amber-500">
				<form
					onSubmit={handleSubmit(onSubmit)}
					action=""
					className="text-left space-y-4"
				>
					<h1 className="text-3xl font-bold text-center text-white mb-8">
						Leave a Review
					</h1>
					<div className="w-full">
						<p className="text-xl font-semibold text-white mb-2">Name</p>
						<input
							// {...register("name", { required: true })}
							value={user.displayName}
							disabled
							type="text"
							name="name"
							id="name"
							placeholder="Your Name"
							required
							className="border-b-2 border-gray-400 w-full p-2 rounded-xl"
						/>
					</div>
					<div className="w-full">
						<p className="text-xl font-semibold text-white mb-2">Rating</p>
						<div className="flex w-full gap-10">
							{[1, 2, 3, 4, 5].map((value) => {
								return (
									<div key={value} className="flex flex-col items-center gap-2">
										<input
											{...register("rating", { required: true })}
											type="radio"
											value={value}
											id={value}
											className="radio border-white border-2"
										/>
										<p className="text-white">{value}</p>
									</div>
								);
							})}
						</div>
					</div>
					<div className="w-full">
						<p className="text-xl font-semibold text-white mb-2">Comment</p>
						<textarea
							{...register("comment")}
							type="text"
							name="comment"
							id="comment"
							placeholder="Leave a comment"
							className="border-b-2 border-gray-400 w-full p-2 rounded-xl"
						/>
					</div>
					<input
						type="submit"
						value={"Submit Review"}
						className="btn bg-black text-amber-400 w-full text-xl border-none font-lato"
					/>
				</form>
				<div className="modal-action">
					<form method="dialog">
						{/* if there is a button in form, it will close the modal */}
						<button className="btn">Close</button>
					</form>
				</div>
			</div>
		</dialog>
	);
};

export default ReviewModal;
