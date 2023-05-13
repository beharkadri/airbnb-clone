import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams {
	listingId?: string;
}

export async function POST(request: Request) {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		return NextResponse.error();
	}

	const { listingId, startDate, endDate, totalPrice } = await request.json();

	if (!listingId || !startDate || !endDate || !totalPrice) {
		return NextResponse.error();
	}

	const listingAndReservation = await prisma.listing.update({
		where: {
			id: listingId,
		},
		data: {
			reservations: {
				create: {
					userId: currentUser.id,
					startDate,
					endDate,
					totalPrice,
				},
			},
		},
	});

	return NextResponse.json(listingAndReservation);
}

export async function DELETE(
	request: Request,
	{ params }: { params: IParams }
) {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		return NextResponse.error();
	}

	const { listingId } = params;

	if (!listingId || typeof listingId !== "string") {
		throw new Error("Invalid ID");
	}

	const favoriteIds = [
		...(currentUser.favoriteIds.filter((id) => id !== listingId) || []),
	];

	const updatedUser = await prisma.user.update({
		where: {
			id: currentUser.id,
		},
		data: { favoriteIds },
	});

	return NextResponse.json(updatedUser);
}
