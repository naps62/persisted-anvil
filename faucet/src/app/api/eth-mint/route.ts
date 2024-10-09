import { Address, getAddress, parseEther, toHex } from "viem";

import { rpc } from "../../../rpc";

interface IBody {
	address: Address;
	amount?: string;
}

const ZeroAddress = getAddress("0x0000000000000000000000000000000000000000");

console.log("here");
export async function POST(req: Request) {
	const data: IBody = await req.json();
	const address = getAddress(data.address);
	const amount = parseEther(data.amount || "1");
	const amountPlusGas = amount + parseEther("0.01");

	await rpc.request({
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		method: "anvil_setBalance" as any,
		params: [ZeroAddress, toHex(amountPlusGas)],
	});

	const hash = await rpc.sendTransaction({
		account: ZeroAddress,
		to: address,
		value: amount,
	});

	return Response.json({ hash });
}
