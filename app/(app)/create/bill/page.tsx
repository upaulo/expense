"use client";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon, DollarSign, RepeatIcon } from "lucide-react";
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { Drawer } from "vaul";
import { Button } from "@/components/ui/button";
import { useUIStore } from "@/store/ui";
import "react-day-picker/dist/style.css";

const MOCK_CATEGORIES = [
	{ id: "1", name: "Essencial", color: "#50b880" },
	{ id: "2", name: "Supérfluo", color: "#e06050" },
	{ id: "3", name: "Alimentação", color: "#d4913c" },
	{ id: "4", name: "Bebida", color: "#6090d0" },
	{ id: "5", name: "Limpeza", color: "#60a0a0" },
	{ id: "6", name: "Higiene", color: "#9070c0" },
	{ id: "7", name: "Fixo", color: "#888888" },
	{ id: "8", name: "Variável", color: "#f0c040" },
];

export default function CreateBillPage() {
	const [date, setDate] = useState<Date>(new Date());
	const [price, setPrice] = useState("");
	const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
	const { isDatePickerOpen, setIsDatePickerOpen } = useUIStore();

	const toggleCategory = (id: string) => {
		setSelectedCategories((prev) =>
			prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id],
		);
	};

	return (
		<div className="flex min-h-screen flex-col gap-4 bg-background px-4 pt-6 pb-32">
			{/* Name */}
			<div className="flex flex-col gap-2">
				<label
					htmlFor="name"
					className="font-medium text-muted-foreground text-xs uppercase tracking-wider"
				>
					Name
				</label>
				<input
					id="name"
					type="text"
					placeholder="Ex: Aluguel"
					className="w-full rounded-xl border border-border bg-card px-4 py-3 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none"
				/>
			</div>

			{/* Card */}
			<div className="relative rounded-2xl border border-border bg-card">
				{/* Date */}
				<div className="absolute top-3 right-3">
					<Drawer.Root
						open={isDatePickerOpen}
						onOpenChange={setIsDatePickerOpen}
					>
						<Drawer.Trigger asChild>
							<Button className="flex items-center gap-1.5 rounded-2xl border border-border bg-background px-3 py-1.5">
								<CalendarIcon className="size-3 text-muted-foreground" />
								<span className="text-muted-foreground text-xs">
									{format(date, "dd MMM", { locale: ptBR })}
								</span>
							</Button>
						</Drawer.Trigger>

						<Drawer.Portal>
							<Drawer.Overlay className="fixed inset-0 z-50 bg-black/60" />
							<Drawer.Content className="fixed right-0 bottom-0 left-0 z-50 rounded-t-2xl border border-border bg-card px-4 pt-4 pb-8">
								<Drawer.Title className="sr-only">Select date</Drawer.Title>
								<div className="mx-auto mb-4 h-1 w-10 rounded-full bg-border" />
								<DayPicker
									mode="single"
									selected={date}
									onSelect={(d) => {
										if (d) {
											setDate(d);
											setIsDatePickerOpen(false);
										}
									}}
									locale={ptBR}
									className="flex justify-center"
								/>
							</Drawer.Content>
						</Drawer.Portal>
					</Drawer.Root>
				</div>

				{/* Icon */}
				<div className="flex items-center justify-center py-20">
					<span className="font-medium text-muted-foreground text-sm">
						<DollarSign width={64} height={64} />
					</span>
				</div>

				{/* Recurrence */}
				<div className="absolute bottom-3 left-3">
					<Button
						variant="ghost"
						className="flex items-center gap-1.5 rounded-2xl border border-border bg-background py-1.5"
					>
						<RepeatIcon className="text-muted-foreground" />
					</Button>
				</div>

				{/* Value */}
				<div className="absolute right-3 bottom-3">
					<div className="flex items-center gap-1 rounded-2xl border border-border bg-background px-3 py-1.5">
						<span className="text-muted-foreground">R$</span>
						<input
							type="number"
							inputMode="decimal"
							placeholder="0,00"
							value={price}
							onChange={(e) => setPrice(e.target.value)}
							className="w-20 bg-transparent text-right font-medium text-foreground placeholder:text-muted-foreground focus:outline-none"
						/>
					</div>
				</div>
			</div>

			{/* Category */}
			<div className="flex flex-col gap-2">
				<p className="font-medium text-muted-foreground text-xs uppercase tracking-wider">
					Categories
				</p>
				<div className="flex flex-wrap gap-2">
					{MOCK_CATEGORIES.map((cat) => (
						<Button
							key={cat.id}
							variant="ghost"
							size="sm"
							onClick={() => toggleCategory(cat.id)}
							className="rounded-full border"
							style={{
								borderColor: selectedCategories.includes(cat.id)
									? cat.color
									: undefined,
								color: selectedCategories.includes(cat.id)
									? cat.color
									: undefined,
							}}
						>
							{cat.name}
						</Button>
					))}
				</div>
			</div>

			{/* Obs */}
			<div className="flex flex-col gap-2">
				<label
					htmlFor="notes"
					className="font-medium text-muted-foreground text-xs uppercase tracking-wider"
				>
					Description
				</label>
				<textarea
					id="notes"
					placeholder="..."
					rows={3}
					className="w-full resize-none rounded-xl border border-border bg-card px-4 py-3 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none"
				/>
			</div>
		</div>
	);
}
