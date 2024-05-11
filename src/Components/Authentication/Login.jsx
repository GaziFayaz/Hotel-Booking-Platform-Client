import AOS from "aos";
import "aos/dist/aos.css";
import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../Providers/AuthProvider";
import { useForm } from "react-hook-form";

const Login = () => {
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
		loading,
		setLoading,
		signInEmailPassword,
		signInGoogle,
		signInGithub,
	} = useContext(AuthContext);
	const navigate = useNavigate();
	const location = useLocation();

	const [showPassword, setShowPassword] = useState(false);

	const { register, handleSubmit } = useForm();

	const onSubmit = (data) => {
		console.log(data);
		signInEmailPassword(data.email, data.password)
			.then((userCredential) => {
				console.log(userCredential);
				successToast("Login Successful");
				location.state ? navigate(location.state) : navigate(-1);
			})
			.catch((error) => {
				setLoading(false);
				if (error.code === "auth/invalid-credential") {
					errorToast("Invalid email or password");
				}
				console.log(error);
			});
	};

	const loginUsingGoogle = () => {
		signInGoogle()
			.then((userCredential) => {
				successToast("Login Successful");
				// console.log(userCredential.user.uid);
				fetch(
					`https://b9a10-server-side-gazi-fayaz.vercel.app/user/${userCredential.user.uid}`
				)
					.then((res) => res.json())
					.catch(() => {
						// console.log(data)
						console.log("new user");
						const createdAt = userCredential.user?.metadata?.creationTime;
						const user_email = userCredential.user.email;
						const firebase_uid = userCredential.user.uid;
						const tourist_spots = [];
						const newUser = {
							user_email,
							firebase_uid,
							tourist_spots,
							createdAt: createdAt,
						};
						fetch("https://b9a10-server-side-gazi-fayaz.vercel.app/user", {
							method: "POST",
							headers: {
								"content-type": "application/json",
							},
							body: JSON.stringify(newUser),
						});
					});
			})
			.catch((error) => {
				// // Handle Errors here.
				// const errorCode = error.code;
				// const errorMessage = error.message;
				// // The email of the user's account used.
				// const email = error.customData.email;
				// // The AuthCredential type that was used.
				// const credential = GoogleAuthProvider.credentialFromError(error);
				// // ...
				setLoading(false);

				if (error.code === "auth/account-exists-with-different-credential") {
					errorToast("Email is already in use");
				}
			});
	};

	const loginUsingGithub = () => {
		signInGithub()
			.then((userCredential) => {
				successToast("Login Successful");
				// console.log(userCredential.user.uid);
				fetch(
					`https://b9a10-server-side-gazi-fayaz.vercel.app/user/${userCredential.user.uid}`
				)
					.then((res) => res.json())
					.catch(() => {
						// console.log(data)
						console.log("new user");
						const createdAt = userCredential.user?.metadata?.creationTime;
						const user_email = userCredential.user.email;
						const firebase_uid = userCredential.user.uid;
						const tourist_spots = [];
						const newUser = {
							user_email,
							firebase_uid,
							tourist_spots,
							createdAt: createdAt,
						};
						fetch("https://b9a10-server-side-gazi-fayaz.vercel.app/user", {
							method: "POST",
							headers: {
								"content-type": "application/json",
							},
							body: JSON.stringify(newUser),
						});
					});
			})
			.catch((error) => {
				console.log(error);
				setLoading(false);
				if (error.code === "auth/account-exists-with-different-credential") {
					errorToast("Email is already in use");
				}
			});
	};

	if (!user) {
		return (
			<div className="overflow-x-hidden">
				<Helmet>
					<title>Majestic Oasis | Login</title>
				</Helmet>
				<div className="flex flex-row-reverse justify-center h-screen bg-black">
					<div className="hidden bg-cover lg:block lg:w-2/3 bg-[url(login-portrait.avif)] bg-bottom">
						<div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40"></div>
					</div>

					<div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
						<div className="flex-1">
							<div className="text-center">
								<p className="mt-3 text-5xl font-cinzel font-semibold text-amber-500">
									Sign In
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
												<a
													href="#"
													className="text-sm text-gray-400 focus:text-blue-500 hover:text-blue-500 hover:underline"
												>
													Forgot password?
												</a>
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

										<div className="mt-6">
											<input
												type="submit"
												value={"Sign in"}
												className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-amber-600 rounded-lg hover:bg-amber-500 focus:outline-none focus:bg-amber-400 focus:ring focus:ring-amber-400 focus:ring-opacity-50"
											/>
										</div>
									</form>

									<div
										onClick={() => loginUsingGoogle()}
										className="cursor-pointer flex items-center justify-center px-6 py-3 mt-4 transition-colors duration-300 transform border rounded-lg border-gray-700 text-gray-200  hover:bg-gray-600"
									>
										<svg className="w-6 h-6 mx-2" viewBox="0 0 40 40">
											<path
												d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
												fill="#FFC107"
											/>
											<path
												d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
												fill="#FF3D00"
											/>
											<path
												d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
												fill="#4CAF50"
											/>
											<path
												d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
												fill="#1976D2"
											/>
										</svg>

										<span className="mx-2">Sign in with Google</span>
									</div>
									<div
										onClick={() => loginUsingGithub()}
										className="cursor-pointer flex items-center justify-center px-6 py-3 mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg dark:border-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
									>
										<img className="h-6 mx-2" src="github-mark-white.svg"></img>

										<span className="mx-2">Sign in with GitHub</span>
									</div>

									<p className="mt-6 text-sm text-center text-gray-400">
										Don&#x27;t have an account yet?{" "}
										<Link
											to="/register"
											className="text-amber-500 focus:outline-none focus:underline hover:underline"
										>
											Sign up
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

export default Login;
