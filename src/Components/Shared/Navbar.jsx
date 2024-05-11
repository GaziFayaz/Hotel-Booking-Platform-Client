import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import { Tooltip } from "react-tooltip";
import { CgProfile } from "react-icons/cg";

const Navbar = () => {
	const { user, loading, logout } = useContext(AuthContext);
	const activeLinkAttr = "text-amber-400 focus:text-amber-400 ";
	if (loading) {
		return <div className="navbar"></div>;
	}

	const routeItems = (
		<>
			<li className="h-full">
				<NavLink
					to="/"
					className={({ isActive }) => (isActive ? activeLinkAttr : "")}
				>
					Home
				</NavLink>
			</li>
			<li className="h-full">
				<NavLink
					to="/rooms"
					className={({ isActive }) => (isActive ? activeLinkAttr : "")}
				>
					Rooms
				</NavLink>
			</li>
			<li className="h-full">
				<NavLink
					to="/my-bookings"
					className={({ isActive }) => (isActive ? activeLinkAttr : "")}
				>
					My Bookings
				</NavLink>
			</li>
		</>
	);

	return (
		<div className="navbar mb-6 lg:mb-20 text-white font-lato">
			<Tooltip id="my-tooltip" />
			<div className="navbar-start w-auto">
				<div className="dropdown">
					<div tabIndex={0} role="button" className="lg:hidden ">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M4 6h16M4 12h8m-8 6h16"
							/>
						</svg>
					</div>
					<ul
						tabIndex={0}
						className="z-50 menu menu-md  dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-40 "
					>
						{routeItems}
						{user ? (
							<>
								<li>
									<button onClick={() => logout()}>Logout</button>
								</li>
								<li
									className="h-full mt-1"
									data-tooltip-id="my-tooltip"
									data-tooltip-content={user.displayName}
									data-tooltip-place="top"
								>
									<div className="h-full">
										{user.photoURL ? (
											<img
												src={user.photoURL}
												alt="profile"
												className="h-10 w-10 rounded-full"
											></img>
										) : (
											<CgProfile className=" text-3xl text-black  rounded-full  object-cover"></CgProfile>
										)}
									</div>
								</li>
							</>
						) : (
							<>
								<li className="h-full">
									<NavLink
										to="/login"
										className={`${({ isActive }) =>
											isActive ? activeLinkAttr : ""} focus:text-white`}
									>
										Login
									</NavLink>
								</li>
								<li className="h-full">
									<NavLink
										to="/register"
										className={`${({ isActive }) =>
											isActive ? activeLinkAttr : ""} focus:text-white`}
									>
										Register
									</NavLink>
								</li>
							</>
						)}
					</ul>
				</div>
				<Link to={"/"} className="font-cinzel text-3xl text-amber-400">
					<button className="text-nowrap hover:font-semibold ml-4">
						Majestic Oasis
					</button>
				</Link>
			</div>
			<div className="navbar-end w-full hidden lg:flex">
				<ul className="menu menu-horizontal px-1 text-lg h-full items-center font-[300]">
					{routeItems}
					{user ? (
						<>
							<Link
								to={"/"}
								className="text-lg text-lato font-light px-4 py-2"
								onClick={() => logout()}
							>
								Logout
							</Link>
							<li
								className="ml-4 h-full"
								data-tooltip-id="my-tooltip"
								data-tooltip-content={user.displayName}
								data-tooltip-place="top"
							>
								<div className="h-full p-0">
									<img
										src={user.photoURL}
										alt="profile"
										className="h-10 w-10 rounded-full object-cover"
									></img>
								</div>
							</li>
						</>
					) : (
						<>
							<li className="h-full">
								<NavLink
									to="/login"
									className={({ isActive }) => (isActive ? activeLinkAttr : "")}
								>
									Login
								</NavLink>
							</li>
							<li className="h-full">
								<NavLink
									to="/register"
									className={({ isActive }) => (isActive ? activeLinkAttr : "")}
								>
									Register
								</NavLink>
							</li>
						</>
					)}
				</ul>
			</div>
		</div>
	);
};

export default Navbar;
