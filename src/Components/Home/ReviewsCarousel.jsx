import axios from "axios";
import { useEffect, useState } from "react";

const ReviewsCarousel = () => {
	const [reviews, setReviews] = useState([]);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		axios.get(`${import.meta.env.VITE_SERVER_URL}/all-reviews`).then((res) => {
			console.log("reviews from get", res.data);
			setReviews(res.data);
			setLoading(false);
		});
	}, []);
	return (
		<div className=" mt-6 md:mt-12 lg:mt-24 flex flex-col items-center justify-center w-full">
			<h1 className="mb-8 text-2xl md:text-4xl lg:text-5xl font-cinzel text-amber-500 text-center ">
				Testimonials
			</h1>
			{!loading && (
				<div className="carousel carousel-center w-2/3 p-4 space-x-4 rounded-box bg-gray-300">
					{reviews.map((review) => {
						return (
							<div className="carousel-item px-10 py-6 bg-white flex flex-col rounded-lg" key={review._id}>
								<div className="text-xl font-bold font-lato text-center mb-4"><span className="text-2xl">{review.rating}</span>/5</div>
                <div className="text-lg font-bold mb-3"> {review.room}</div>
								<div className="font-semibold mb-1">{review.displayName}</div>
								<div>"{review.comment}"</div>
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
};

export default ReviewsCarousel;
