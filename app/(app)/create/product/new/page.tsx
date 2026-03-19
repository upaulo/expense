"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const ICONS = [
	"🍎",
	"🥩",
	"🥦",
	"🧀",
	"🥚",
	"🍞",
	"🧈",
	"🥛",
	"🍗",
	"🐟",
	"🦐",
	"🥬",
	"🧅",
	"🥔",
	"🍋",
	"🍌",
	"🛒",
	"🧴",
	"🧼",
	"🧺",
	"🧻",
	"🪥",
	"🫧",
	"🧹",
	"💊",
	"🩺",
	"🐾",
	"👕",
	"📦",
	"🔧",
	"💡",
	"🎮",
];

const CATEGORIES = [
	{ id: "1", name: "Essencial", color: "#50b880" },
	{ id: "2", name: "Supérfluo", color: "#e06050" },
	{ id: "3", name: "Alimentação", color: "#d4913c" },
	{ id: "4", name: "Bebida", color: "#6090d0" },
	{ id: "5", name: "Limpeza", color: "#60a0a0" },
	{ id: "6", name: "Higiene", color: "#9070c0" },
	{ id: "7", name: "Fixo", color: "#888888" },
	{ id: "8", name: "Variável", color: "#f0c040" },
];

function NewProductPage() {
	const router = useRouter();

	return (
		<div className="flex min-h-screen flex-col bg-background">
			<header className="flex items-center gap-3 px-4 py-5">
				<Button variant="ghost" size="icon-sm" onClick={() => router.back()}>
					<ArrowLeft className="size-5" />
				</Button>
				<span className="font-medium text-base">New Product</span>
			</header>

			<div className="flex flex-col gap-8 px-4 pb-32">
				<div className="flex flex-col gap-2">
					<label
						htmlFor="product-name"
						className="font-medium text-muted-foreground text-xs uppercase tracking-wider"
					>
						Name
					</label>
					<input
						id="product-name"
						type="text"
						placeholder="Ex: Filé de tilápia"
						className="w-full rounded-xl border border-border bg-card px-4 py-3 text-foreground text-sm placeholder:text-muted-foreground focus:border-white/30 focus:outline-none"
					/>
				</div>

				<div className="flex flex-col gap-3">
					<p className="font-medium text-muted-foreground text-xs uppercase tracking-wider">
						Icon
					</p>
					<div className="grid grid-cols-8 gap-2">
						{ICONS.map((icon) => (
							<button
								key={icon}
								type="button"
								className="flex aspect-square items-center justify-center rounded-xl border border-border bg-card text-xl transition-all active:scale-95"
							>
								{icon}
							</button>
						))}
					</div>
				</div>

				<div className="flex flex-col gap-3">
					<p className="font-medium text-muted-foreground text-xs uppercase tracking-wider">
						Categories
					</p>
					<div className="flex flex-wrap gap-2">
						{CATEGORIES.map((cat) => (
							<button
								key={cat.id}
								type="button"
								className="rounded-full border border-border bg-card px-4 py-1.5 font-medium text-muted-foreground text-sm transition-all active:scale-95"
								style={{ borderColor: cat.color }}
							>
								{cat.name}
							</button>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default NewProductPage;
