import { Helmet } from "react-helmet-async";
import Hero from "./Hero";
import Location from "./Location";
import Newsletter from "./Newsletter";

const Home = () => {
	return (
		<div>
			<Helmet>
					<title>Majestic Oasis | Home</title>
				</Helmet>
			<Hero></Hero>
			<Location></Location>
			<Newsletter></Newsletter>
		</div>
	);
};

export default Home;
