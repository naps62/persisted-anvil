import { Address, getAddress, parseEther, toHex } from "viem";

import { rpc } from "../../../rpc";

interface IBody {
	address: Address;
	amount?: string;
}

export async function POST(req: Request) {
	const data: IBody = await req.json();
	const address = getAddress(data.address);
	const amount = BigInt(data.amount || parseEther("1"));

	console.log(amount);
	const current = await rpc.getBalance({ address });
	await rpc.request({
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		method: "anvil_setBalance" as any,
		params: [address, toHex(amount + current)],
	});

	return Response.json({});
}
