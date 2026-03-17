"use client";

import { ArrowLeftRight, Home, Plus } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";

function Navbar() {
	const [active, setActive] = useState<string | null>(null);
	const pathname = usePathname();
	const router = useRouter();

	const btnProps = (id: string) => ({
		onPointerDown: () => setActive(id),
		onPointerUp: () => setActive(null),
		onPointerLeave: () => setActive(null),
		className: "transition-all duration-150 ease-out",
		style: { flex: active === id ? 1.4 : 1 },
	});

	return (
		<nav className="fixed right-8 bottom-8 left-8 z-100 flex items-center justify-around rounded-full border border-white/10 bg-white/10 px-4 py-1 backdrop-blur-md">
			<div className="flex w-full items-center justify-around">
				<Button
					variant={pathname === "/" ? "active" : "ghost"}
					size="icon"
					{...btnProps("home")}
					onClick={() => router.push("/")}
				>
					<Home
						className={`size-6 transition-transform duration-100 ${active === "home" ? "scale-125" : "scale-100"}`}
					/>
				</Button>

				<Button variant="ghost" size="icon-lg" {...btnProps("create")}>
					<Plus
						className={`size-12 transition-transform duration-100 ${active === "create" ? "scale-125" : "scale-100"}`}
					/>
				</Button>

				<Button
					variant={pathname === "/transactions" ? "active" : "ghost"}
					size="icon"
					{...btnProps("transactions")}
					onClick={() => router.push("/transactions")}
				>
					<ArrowLeftRight
						className={`size-6 transition-transform duration-100 ${active === "transactions" ? "scale-125" : "scale-100"}`}
					/>
				</Button>
			</div>
		</nav>
	);
}

export default Navbar;
