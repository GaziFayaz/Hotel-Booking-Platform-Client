import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Slide } from "react-awesome-reveal";
import Navbar from "../Components/Shared/Navbar";

const Root = () => {
	return (
		<div className={`min-h-screen flex flex-col relative`}>
			<div className="absolute w-full top-0 z-40">
				<Navbar></Navbar>
			</div>
			<Slide>
				{/* <div className="mx-6 md:mx-12 lg:mx-32"> */}
				<Outlet></Outlet>
				<ToastContainer />
				{/* </div> */}
			</Slide>
			{/* <Footer></Footer> */}
		</div>
	);
};

export default Root;
