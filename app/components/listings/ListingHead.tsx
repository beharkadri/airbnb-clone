"use client";

import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import Heading from "../Heading";
import Image from "next/image";
import HeartButton from "../HeartButton";

interface ListingHeadProps {
	id: string;
	currentUser?: SafeUser | null;
	title: string;
	imageSrc: string;
	locationValue: string;
}

const ListingHead: React.FC<ListingHeadProps> = ({
	id,
	currentUser,
	title,
	imageSrc,
	locationValue,
}) => {
	const { getByValue } = useCountries();

	const location = getByValue(locationValue);
	return (
		<>
			<Heading
				title={title}
				subtitle={`${location?.region}, ${location?.label}`}
			/>
			<div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
				<Image
					fill
					src={imageSrc}
					alt="Image"
					className="object-cover w-full"
				/>
				<div className="absolute top-5 right-5">
					<HeartButton listingId={id} currentUser={currentUser} />
				</div>
			</div>
		</>
	);
};

export default ListingHead;
