import type { ReactNode } from "react";
import Navbar from "@/components/navbar";

export default function AppLayout({ children }: { children: ReactNode }) {
	return (
		<>
			<main className="relative min-h-screen">{children}</main>
			<Navbar />
		</>
	);
}
