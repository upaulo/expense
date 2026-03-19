"use client";

import {
	ArrowLeftRight,
	Home,
	Plus,
	Receipt,
	ShoppingCart,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";

function Navbar() {
	const [active, setActive] = useState<string | null>(null);
	const [isOpen, setIsOpen] = useState(false);
	const pathname = usePathname();
	const router = useRouter();
	const navRef = useRef<HTMLElement>(null);

	useEffect(() => {
		function handleClickOutside(e: MouseEvent) {
			if (navRef.current && !navRef.current.contains(e.target as Node)) {
				setIsOpen(false);
			}
		}
		if (isOpen) document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [isOpen]);

	const btnProps = (id: string) => ({
		onPointerDown: () => setActive(id),
		onPointerUp: () => setActive(null),
		onPointerLeave: () => setActive(null),
		className: "transition-all duration-150 ease-out",
		style: { flex: active === id ? 1.4 : 1 },
	});

	return (
		<nav
			ref={navRef}
			className="fixed right-8 bottom-8 left-8 z-100 flex flex-col items-center gap-2"
		>
			{/* Popup */}
			<div
				className={`flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-2 backdrop-blur-md transition-all duration-200 ease-out${isOpen ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"}
				`}
			>
				<button
					type="button"
					onClick={() => {
						setIsOpen(false);
						router.push("/create/product");
					}}
					className="flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 font-medium text-sm text-white backdrop-blur-sm transition-all hover:bg-white/20 active:scale-95"
				>
					<ShoppingCart className="size-4" />
					Product
				</button>

				<div className="h-4 w-px bg-white/20" />

				<button
					type="button"
					onClick={() => {
						setIsOpen(false);
						router.push("/create/bill");
					}}
					className="flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 font-medium text-sm text-white backdrop-blur-sm transition-all hover:bg-white/20 active:scale-95"
				>
					<Receipt className="size-4" />
					Bill
				</button>
			</div>

			{/* Navbar */}
			<div className="flex w-full items-center justify-around rounded-full border border-white/10 bg-white/10 px-4 py-1 backdrop-blur-md">
				<Button
					variant={pathname === "/" && !isOpen ? "active" : "ghost"}
					size="icon"
					{...btnProps("home")}
					onClick={() => {
						setIsOpen(false);
						router.push("/");
					}}
				>
					<Home
						className={`size-6 transition-transform duration-100 ${active === "home" ? "scale-125" : "scale-100"}`}
					/>
				</Button>

				<Button
					variant={isOpen ? "active" : "ghost"}
					size="icon-lg"
					{...btnProps("create")}
					onClick={() => setIsOpen((prev) => !prev)}
				>
					<div
						className={`transition-transform duration-200 ${isOpen ? "rotate-45" : "rotate-0"}`}
					>
						<Plus className="size-12" />
					</div>
				</Button>

				<Button
					variant={pathname === "/transactions" && !isOpen ? "active" : "ghost"}
					size="icon"
					{...btnProps("transactions")}
					onClick={() => {
						setIsOpen(false);
						router.push("/transactions");
					}}
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
