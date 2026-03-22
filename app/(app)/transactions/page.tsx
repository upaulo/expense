"use client";

import { Search } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const MOCK_CATEGORIES = [
	{ id: "1", name: "Essencial", color: "#50b880" },
	{ id: "2", name: "Alimentação", color: "#d4913c" },
	{ id: "3", name: "Bebida", color: "#6090d0" },
	{ id: "4", name: "Fixo", color: "#888888" },
];

const MOCK_TRANSACTIONS = [
	{
		id: "1",
		name: "Filé de tilápia",
		icon: "🐟",
		price: 32.9,
		quantity: 1,
		unit: "kg",
		date: "2026-03-27",
		type: "product",
		category: "Alimentação",
	},
	{
		id: "2",
		name: "Aluguel",
		icon: null,
		price: 800,
		quantity: null,
		unit: null,
		date: "2026-03-26",
		type: "bill",
		category: "Fixo",
	},
	{
		id: "3",
		name: "Coca-Cola",
		icon: "🥤",
		price: 8.5,
		quantity: 2,
		unit: "L",
		date: "2026-03-25",
		type: "product",
		category: "Bebida",
	},
	{
		id: "4",
		name: "Netflix",
		icon: null,
		price: 55,
		quantity: null,
		unit: null,
		date: "2026-03-24",
		type: "bill",
		category: "Essencial",
	},
	{
		id: "5",
		name: "Arroz",
		icon: "🌾",
		price: 24.9,
		quantity: 5,
		unit: "kg",
		date: "2026-03-23",
		type: "product",
		category: "Alimentação",
	},
];

type FilterType = "all" | "product" | "bill";

function TransactionsPage() {
	const [search, setSearch] = useState("");
	const [typeFilter, setTypeFilter] = useState<FilterType>("all");
	const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

	const toggleCategory = (name: string) => {
		setSelectedCategories((prev) =>
			prev.includes(name) ? prev.filter((c) => c !== name) : [...prev, name],
		);
	};

	const filtered = MOCK_TRANSACTIONS.filter(
		(t) =>
			t.name.toLowerCase().includes(search.toLowerCase()) &&
			(typeFilter === "all" || t.type === typeFilter) &&
			(selectedCategories.length === 0 ||
				selectedCategories.includes(t.category)),
	);

	return (
		<div className="flex min-h-screen flex-col gap-4 bg-background px-4 pt-6 pb-32">
			{/* Search */}
			<div className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-3">
				<Search className="size-4 shrink-0 text-muted-foreground" />
				<input
					type="text"
					placeholder="Search..."
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					className="w-full bg-transparent text-foreground text-sm placeholder:text-muted-foreground focus:outline-none"
				/>
			</div>

			{/* Type filter */}
			<div className="flex gap-2">
				{(["all", "product", "bill"] as FilterType[]).map((type) => (
					<Button
						key={type}
						variant="ghost"
						size="sm"
						onClick={() => setTypeFilter(type)}
						className={cn(
							"rounded-full border border-border",
							typeFilter === type && "border-foreground text-foreground",
						)}
					>
						{type === "all" ? "All" : type === "product" ? "Item" : "Bill"}
					</Button>
				))}
			</div>

			{/* Category Filter */}
			<div className="flex flex-wrap gap-2">
				{MOCK_CATEGORIES.map((cat) => (
					<Button
						key={cat.id}
						variant="ghost"
						size="sm"
						onClick={() => toggleCategory(cat.name)}
						className="rounded-full border"
						style={{
							borderColor: selectedCategories.includes(cat.name)
								? cat.color
								: undefined,
							color: selectedCategories.includes(cat.name)
								? cat.color
								: undefined,
						}}
					>
						{cat.name}
					</Button>
				))}
			</div>

			{/* List */}
			<div className="flex flex-col gap-2">
				{filtered.length === 0 ? (
					<p className="py-12 text-center text-muted-foreground text-sm">
						No transactions! 🎉
					</p>
				) : (
					filtered.map((t) => (
						<div
							key={t.id}
							className="flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3"
						>
							{/* Icon */}
							<div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border bg-background text-xl">
								{t.icon ?? "🧾"}
							</div>

							{/* Info */}
							<div className="flex flex-1 flex-col gap-0.5">
								<span className="font-medium text-foreground text-sm">
									{t.name}
								</span>
								<span className="text-muted-foreground text-xs">{t.date}</span>
							</div>

							{/* Value */}
							<div className="flex flex-col items-end gap-0.5">
								<span className="font-medium text-foreground text-sm">
									R$ {t.price.toFixed(2)}
								</span>
								{t.quantity && (
									<span className="text-muted-foreground text-xs">
										{t.quantity} {t.unit}
									</span>
								)}
							</div>
						</div>
					))
				)}
			</div>
		</div>
	);
}

export default TransactionsPage;
