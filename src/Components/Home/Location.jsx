import { Map, Marker } from "pigeon-maps";

const Location = () => {
	return (
		<div className="mt-6 md:mt-12 lg:mt-24 lg:grid text-center -order-1 lg:grid-cols-5 items-center justify-center px-6 lg:px-24 font-lato gap-10 lg:gap-0">
			<div className="col-span-2">
				<h1 className="text-2xl md:text-4xl lg:text-5xl font-cinzel text-amber-500 lg:text-right">
					Find Us!
				</h1>
				<p className="text-sm lg:text-lg lg:text-right">
					Easily locate our luxury oasis with our interactive map. <br />
					Explore nearby attractions and navigate with ease to our doorstep
				</p>
			</div>
			<div className="col-span-3 rounded-xl lg:row-start-1 mt-4 md:mt-8">
				<Map
					border
					height={500}
					defaultCenter={[21.4138686, 91.9847735]}
					defaultZoom={16}
				>
					<Marker width={50} anchor={[21.4138686, 91.9847735]} />
				</Map>
			</div>
		</div>
	);
};

export default Location;
