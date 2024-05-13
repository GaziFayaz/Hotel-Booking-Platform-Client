import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root";
import Home from "../Components/Home/Home";
import Login from "../Components/Authentication/Login";
import Register from "../Components/Authentication/Register";
import Rooms from "../Components/Room/Rooms";
import RoomDetails from "../Components/Room/RoomDetails";
import MyBookings from "../Components/Bookings/MyBookings";
import PrivateRoutes from "./PrivateRoutes";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <Root></Root>,
		children: [
			{
				path: "/",
				element: <Home></Home>,
			},
			{
				path: "/rooms",
				element: <Rooms></Rooms>,
			},
			{
				path: "/room-details/:_id",
				element: <RoomDetails></RoomDetails>,
			},
			{
				path: "/my-bookings",
				element: (
					<PrivateRoutes>
						<MyBookings></MyBookings>
					</PrivateRoutes>
				),
			},
			{
				path: "/login",
				element: <Login></Login>,
			},
			{
				path: "/register",
				element: <Register></Register>,
			},
		],
	},
]);
