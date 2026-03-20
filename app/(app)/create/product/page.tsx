"use client";

import { ArrowLeft, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const MOCK_PRODUCTS = [
	{ id: "1", name: "Filé de tilápia", icon: "🐟" },
	{ id: "2", name: "Arroz", icon: "🌾" },
	{ id: "3", name: "Feijão", icon: "🫘" },
	{ id: "4", name: "Coca-Cola", icon: "🥤" },
	{ id: "5", name: "Detergente", icon: "🧴" },
	{ id: "6", name: "Ovos", icon: "🥚" },
	{ id: "7", name: "Pão", icon: "🍞" },
	{ id: "8", name: "Manteiga", icon: "🧈" },
];

export default function ProductsPage() {
	const router = useRouter();

	return (
		<div className="flex min-h-screen flex-col bg-background">
			{/* Header */}
			<header className="flex items-center gap-3 px-4 py-5">
				<Button variant="ghost" size="icon-sm" onClick={() => router.back()}>
					<ArrowLeft className="size-5" />
				</Button>
				<span className="font-medium text-base">Products</span>
			</header>

			{/* Grid */}
			<div className="grid grid-cols-3 gap-3 px-4 pb-32">
				{MOCK_PRODUCTS.map((product) => (
					<Button
						key={product.id}
						variant="ghost"
						className="h-auto flex-col gap-2 rounded-2xl border border-border bg-card p-4"
						onClick={() => router.push(`/create/product/${product.id}`)}
					>
						<span className="text-4xl">{product.icon}</span>
						<span className="text-center font-medium text-foreground text-xs">
							{product.name}
						</span>
					</Button>
				))}
				<Button
					variant="ghost"
					className="h-auto flex-col gap-2 rounded-2xl border border-border border-dashed p-4"
					onClick={() => router.push("/create/product/new")}
				>
					<Plus className="size-8 text-muted-foreground" />
					<span className="text-center font-medium text-muted-foreground text-xs">
						New
					</span>
				</Button>
			</div>
		</div>
	);
}
