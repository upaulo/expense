"use client";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { Drawer } from "vaul";
import { Button } from "@/components/ui/button";
import { useUIStore } from "@/store/ui";
import "react-day-picker/dist/style.css";

const MOCK_PRODUCT = {
	id: "1",
	name: "Filé de tilápia",
	icon: "🐟",
};

const UNITS = ["un", "g", "kg", "L"] as const;
type Unit = (typeof UNITS)[number];

export default function CreateProductPurchasePage() {
	const [date, setDate] = useState<Date>(new Date());
	const [price, setPrice] = useState("");
	const [quantity, setQuantity] = useState("");
	const { isDatePickerOpen, setIsDatePickerOpen } = useUIStore();
	const [unit, setUnit] = useState<Unit>("un");

	return (
		<div className="flex min-h-screen flex-col gap-4 bg-background px-4 pt-6 pb-32">
			<span className="text-center font-medium text-2xl text-foreground">
				{MOCK_PRODUCT.name}
			</span>

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
								<Drawer.Title className="sr-only">Select date:</Drawer.Title>
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
					<span className="text-8xl">{MOCK_PRODUCT.icon}</span>
				</div>

				{/* Quantity */}
				<div className="absolute bottom-3 left-3">
					<div className="flex items-center gap-1 rounded-2xl border border-border bg-background px-3 py-1.5">
						<input
							type="number"
							inputMode="decimal"
							placeholder="1"
							value={quantity}
							onChange={(e) => setQuantity(e.target.value)}
							className="h-6 w-8 bg-transparent font-medium text-foreground placeholder:text-muted-foreground focus:outline-none"
						/>
						<select
							value={unit}
							onChange={(e) => setUnit(e.target.value as Unit)}
							className="bg-transparent text-muted-foreground focus:outline-none"
						>
							{UNITS.map((u) => (
								<option key={u} value={u}>
									{u}
								</option>
							))}
						</select>
					</div>
				</div>

				{/* Value */}
				<div className="absolute right-3 bottom-3">
					<div className="flex items-center gap-1 rounded-2xl border border-border bg-background px-3 py-1.5">
						<span className="text-muted-foreground">R$</span>
						<input
							type="number"
							inputMode="decimal"
							placeholder="0.00"
							value={price}
							onChange={(e) => setPrice(e.target.value)}
							className="h-6 w-12 bg-transparent text-right font-medium text-foreground placeholder:text-muted-foreground focus:outline-none"
						/>
					</div>
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
