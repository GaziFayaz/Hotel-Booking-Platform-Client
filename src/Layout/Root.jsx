import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import { Slide } from "react-awesome-reveal";

const Root = () => {
	return (
		<div className={`font-poppins min-h-screen flex flex-col justify-between`}>
			<Navbar></Navbar>
			<Slide>
				<div className="mx-6 md:mx-12 lg:mx-32">
					<Outlet></Outlet>
					<ToastContainer />
				</div>
			</Slide>
			<Footer></Footer>
		</div>
	);
};

export default Root;
