"use client";

import {
	ArrowLeftRight,
	Check,
	Home,
	Plus,
	Receipt,
	ShoppingCart,
	X,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/store/ui";

function Navbar() {
	const [active, setActive] = useState<string | null>(null);
	const [isOpen, setIsOpen] = useState(false);
	const [isPending, startTransition] = useTransition();
	const pathname = usePathname();
	const router = useRouter();
	const navRef = useRef<HTMLElement>(null);
	const { isDatePickerOpen } = useUIStore();

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

	const isSavePage =
		pathname === "/create/product/new" ||
		pathname === "/create/bill" ||
		(pathname.startsWith("/create/product/") && pathname !== "/create/product");

	const navigate = (path: string) => {
		startTransition(() => {
			router.push(path);
		});
	};

	return (
		<nav
			ref={navRef}
			className={cn(
				"fixed right-8 bottom-8 left-8 z-40 flex flex-col items-center gap-2 transition-all duration-200",
				isDatePickerOpen && "pointer-events-none translate-y-4 opacity-0",
			)}
		>
			{/* Popup */}
			{!isSavePage && (
				<div
					className={`flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-2 backdrop-blur-md transition-all duration-200 ease-out ${isOpen ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"}`}
				>
					<Button
						variant="ghost"
						className="w-23 gap-2 bg-white/10"
						onClick={() => {
							setIsOpen(false);
							navigate("/create/product");
						}}
					>
						<ShoppingCart className="size-4" />
						Item
					</Button>
					<div className="h-4 w-px bg-white/20" />
					<Button
						variant="ghost"
						className="w-23 gap-2 bg-white/10"
						onClick={() => {
							setIsOpen(false);
							navigate("/create/bill");
						}}
					>
						<Receipt className="size-4" />
						Bill
					</Button>
				</div>
			)}

			{/* Navbar */}
			<div className="flex w-full items-center justify-around rounded-full border border-white/10 bg-white/10 px-4 py-1 backdrop-blur-md">
				{isSavePage ? (
					<>
						<Button
							variant="ghost"
							size="icon-lg"
							{...btnProps("cancel")}
							onClick={() => navigate("/create/product")}
						>
							<X
								className={cn(
									"size-8 transition-transform duration-100",
									active === "cancel" ? "scale-125" : "scale-100",
								)}
							/>
						</Button>
						<Button
							variant="active"
							size="icon-lg"
							{...btnProps("save")}
							onClick={() => {
								navigate(
									pathname === "/create/product/new"
										? "/create/product"
										: "/transactions",
								);
							}}
						>
							<Check
								className={cn(
									"size-8 transition-transform duration-100",
									active === "save" ? "scale-125" : "scale-100",
								)}
							/>
						</Button>
					</>
				) : (
					<>
						<Button
							variant={
								pathname === "/" && !isOpen && !isPending ? "active" : "ghost"
							}
							size="icon"
							{...btnProps("home")}
							onClick={() => {
								setIsOpen(false);
								navigate("/");
							}}
						>
							<Home
								className={cn(
									"size-6 transition-transform duration-100",
									active === "home" ? "scale-125" : "scale-100",
								)}
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
							variant={
								pathname === "/transactions" && !isOpen && !isPending
									? "active"
									: "ghost"
							}
							size="icon"
							{...btnProps("transactions")}
							onClick={() => {
								setIsOpen(false);
								navigate("/transactions");
							}}
						>
							<ArrowLeftRight
								className={cn(
									"size-6 transition-transform duration-100",
									active === "transactions" ? "scale-125" : "scale-100",
								)}
							/>
						</Button>
					</>
				)}
			</div>
		</nav>
	);
}

export default Navbar;
