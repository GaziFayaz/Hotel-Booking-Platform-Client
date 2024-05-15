import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const ErrorElement = () => {
	return (
		<div className="flex flex-col items-center gap-10 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
			<Helmet>
					<title>Majestic Oasis | Page Not Found</title>
				</Helmet>
				<img src="404.svg" className="w-full h-full"/>

			<Link to={"/"} className="link link-primary">
				Go to Home Page
			</Link>
		</div>
	);
};

export default ErrorElement;
