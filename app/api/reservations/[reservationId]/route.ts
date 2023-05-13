import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams {
	reservationId?: string;
}

export async function DELETE(
	request: Request,
	{ params }: { params: IParams }
) {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		return NextResponse.error();
	}

	const { reservationId } = params;

	if (!reservationId || typeof reservationId !== "string") {
		throw new Error("Invalid ID");
	}

	// Only the person who created the reservation or the owner of the listing can delete reservations
	const updatedUser = await prisma.reservation.deleteMany({
		where: {
			id: reservationId,
			OR: [{ userId: currentUser.id }, { listing: { userId: currentUser.id } }],
		},
	});

	return NextResponse.json(updatedUser);
}
