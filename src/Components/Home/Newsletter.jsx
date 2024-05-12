import React from "react";

const Newsletter = () => {
	return (
		<div className="lg:mt-24 grid grid-cols-1 text-center lg:grid-cols-2 p-10 items-center justify-center px-24 font-lato">
			<div className="flex flex-col items-center justify-center h-full">
				<h1 className="text-5xl font-cinzel text-amber-500 lg:text-left w-full">
					Newsletter
				</h1>
				<p className="w-full lg:text-left text-black mt-2 text-xl">
					Subscribe to our newsletter for exclusive offers and updates
				</p>
			</div>
			<div className="mt-8 lg:mt-0 flex items-center justify-end">
				<div className="w-full flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:-mx-2">
					<input
						id="email"
						type="text"
						className="w-2/3 p-4 py-4 text-gray-700 bg-white border border-gray-200 rounded-md sm:mx-2  focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
						placeholder="Email Address"
					/>

					<button className="w-1/3 px-6 py-4 text-xl font-bold tracking-wide text-amber-400 capitalize transition-colors duration-300 transform bg-black rounded-md focus:ring focus:ring-amber-300 focus:ring-opacity-80 sm:mx-2 hover:bg-gray-800 focus:outline-none focus:bg-gray-700">
						Subscribe
					</button>
				</div>
			</div>
		</div>
	);
};

export default Newsletter;
