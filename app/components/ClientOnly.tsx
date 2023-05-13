"use client";

import { useState, useEffect } from "react";

interface ClientOnlyProps {
	children: React.ReactNode;
}

const ClientOnly: React.FC<ClientOnlyProps> = ({ children }) => {
	const [hasMounted, setHasMounted] = useState(false);

	useEffect(() => {
		setHasMounted(true);
	}, []);

	return hasMounted ? <>{children}</> : null;
};

export default ClientOnly;
