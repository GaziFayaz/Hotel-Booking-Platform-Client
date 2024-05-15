import { useForm } from "react-hook-form";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { Helmet } from "react-helmet-async";
import AOS from "aos";
import "aos/dist/aos.css";

const Register = () => {
	useEffect(() => {
		AOS.init();
		AOS.refresh();
	}, []);
	const successToast = (message) =>
		toast.success(message, { position: "bottom-right" });
	const errorToast = (message) =>
		toast.error(message, { position: "bottom-right" });
	const {
		user,
    setUser,
		loading,
		setLoading,
		createUserEmailPassword,
		customizeProfile,
	} = useContext(AuthContext);
	const navigate = useNavigate();
	const [showPassword, setShowPassword] = useState(false);

	const { register, handleSubmit } = useForm();

	const onSubmit = (data) => {
		// console.log(data);
		if (data.password.length < 6) {
			errorToast("Password must be at least 6 characters");
			if (!/[A-Z]/.test(data.password)) {
				errorToast("Password must contain at least one uppercase letter");
			}
			if (!/[a-z]/.test(data.password)) {
				errorToast("Password must contain at least one lowercase letter");
			}
			return;
		}
		if (!/[A-Z]/.test(data.password)) {
			errorToast("Password must contain at least one uppercase letter");
			if (!/[a-z]/.test(data.password)) {
				errorToast("Password must contain at least one lowercase letter");
			}
			return;
		}
		if (!/[a-z]/.test(data.password)) {
			errorToast("Password must contain at least one lowercase letter");
			return;
		}
		createUserEmailPassword(data.email, data.password)
			.then((userCredential) => {
				// Signed up
        setUser({...user, photoURL: data.photoUrl, displayName: data.name})
				// console.log(userCredential);
				const createdAt = userCredential.user?.metadata?.creationTime;
				const user_email = userCredential.user.email;
				const firebase_uid = userCredential.user.uid;
				const bookings = [];
				const newUser = {
					user_email,
					firebase_uid,
					bookings,
					createdAt: createdAt,
				};
				fetch(`${import.meta.env.VITE_SERVER_URL}/user"`, {
					method: "POST",
					headers: {
						"content-type": "application/json",
					},
					body: JSON.stringify(newUser),
				});
				customizeProfile(data.name, data.photoUrl)
					.then((userCredential) => {
						// console.log(userCredential);
						successToast("Registration Successful");
						return <Navigate to="/" />;
					})
					.catch((error) => {
						// console.log(error);
					});

				location.state ? navigate(location.state) : navigate(-1);
			})
			.catch((error) => {
				// console.log(error);
				setLoading(false);
				if (error.code === "auth/email-already-in-use") {
					errorToast("Email is already in use");
				}
			});
	};
	if (!user) {
		return (
			<div className="overflow-x-hidden">
				<Helmet>
					<title>Majestic Oasis | Register</title>
				</Helmet>
				<div className="flex flex-row-reverse justify-center h-screen bg-black">
					<div className="hidden bg-cover lg:block lg:w-2/3 bg-[url(login-portrait.avif)] bg-bottom">
						<div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40"></div>
					</div>

					<div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
						<div className="flex-1">
							<div className="text-center">
								<p className="mt-3 text-5xl font-cinzel font-semibold text-amber-500">
									Sign Up
								</p>
							</div>

							{loading ? (
								<div className="flex justify-center spinner"></div>
							) : (
								<div className="mt-8">
									<form
										data-aos="fade-down"
										onSubmit={handleSubmit(onSubmit)}
										action=""
									>
										<div>
											<label
												htmlFor="Name"
												className="block mb-2 text-sm text-gray-200"
											>
												Name
											</label>
											<input
												{...register("name", { required: true })}
												type="text"
												name="name"
												id="name"
												placeholder="Your Name"
												className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
											/>
										</div>
										<div className="mt-6">
											<label
												htmlFor="photoUrl"
												className="block mb-2 text-sm text-gray-200"
											>
												Photo URL
											</label>
											<input
												{...register("photoUrl", { required: true })}
												type="text"
												name="photoUrl"
												id="photoUrl"
												placeholder="Your Photo URL"
												className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
											/>
										</div>
										<div className="mt-6">
											<label
												htmlFor="email"
												className="block mb-2 text-sm text-gray-200"
											>
												Email Address
											</label>
											<input
												{...register("email", { required: true })}
												type="email"
												name="email"
												id="email"
												placeholder="example@example.com"
												className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
											/>
										</div>

										<div className="mt-6 relative">
											<div className="flex justify-between mb-2">
												<label
													htmlFor="password"
													className="text-sm text-gray-200"
												>
													Password
												</label>
											</div>

											<input
												{...register("password", { required: true })}
												type={showPassword ? "text" : "password"}
												name="password"
												id="password"
												placeholder="Your Password"
												className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
											/>
											{showPassword ? (
												<BsEyeFill
													className="absolute right-4 top-10 cursor-pointer"
													onClick={() => setShowPassword(!showPassword)}
												></BsEyeFill>
											) : (
												<BsEyeSlashFill
													className="absolute right-4 top-10 cursor-pointer"
													onClick={() => setShowPassword(!showPassword)}
												></BsEyeSlashFill>
											)}
										</div>
											<p className="text-red-500">registration with email password is bugged right now. Use google sign in</p>
										<div className="mt-6">
											<input
												type="submit"
												value={"Sign Up"}
												className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-amber-600 rounded-lg hover:bg-amber-500 focus:outline-none focus:bg-amber-400 focus:ring focus:ring-amber-400 focus:ring-opacity-50"
											/>
										</div>
									</form>

									<p className="mt-6 text-sm text-center text-gray-400">
										Already Have an Account?{" "}
										<Link
											to="/login"
											className="text-amber-500 focus:outline-none focus:underline hover:underline"
										>
											Sign In
										</Link>
										.
									</p>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		);
	} else {
		navigate("/");
	}
};

export default Register;
