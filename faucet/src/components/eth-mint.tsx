"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export function EthMint() {
	const [address, setAddress] = useState("");
	const [amount, setAmount] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log("Submitted:", { address, amount });
		const post = async () => {
			await fetch("/api/eth-mint", {
				method: "POST",
				body: JSON.stringify({ address, amount }),
			});
		};

		post().then(() => {
			console.log("minted");
		});
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-blue-600">
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle>Ethereum Transaction</CardTitle>
					<CardDescription>
						Enter an Ethereum address and optional amount
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit} className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="address">Ethereum Address</Label>
							<Input
								id="address"
								placeholder="0x..."
								value={address}
								onChange={(e) => setAddress(e.target.value)}
								required
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="amount">ETH Amount (Optional)</Label>
							<Input
								id="amount"
								type="number"
								placeholder="0.0"
								value={amount}
								onChange={(e) => setAmount(e.target.value)}
								step="0.000000000000000001"
								min="0"
							/>
						</div>
						<Button type="submit" className="w-full">
							Submit
						</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
