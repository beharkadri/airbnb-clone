import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";
import ReservationsClient from "./ReservationsClient";

import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";

const ReservationsPage = async () => {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		return (
			<ClientOnly>
				<EmptyState title="Unathorized" subtitle="Please login" />
			</ClientOnly>
		);
	}

	const reservations = await getReservations({ authorId: currentUser.id });

	if (reservations.length === 0)
		return (
			<ClientOnly>
				<EmptyState
					title="No reservations found"
					subtitle="Looks like you have no reservations on your properties"
				/>
			</ClientOnly>
		);

	return (
		<ClientOnly>
			<ReservationsClient
				currentUser={currentUser}
				reservations={reservations}
			></ReservationsClient>
		</ClientOnly>
	);
};

export default ReservationsPage;
