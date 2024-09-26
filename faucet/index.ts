import Fastify from "fastify";
import {
	createPublicClient,
	getAddress,
	http,
	parseEther,
	toHex,
	type Address,
} from "viem";
import { anvil } from "viem/chains";

const rpc = createPublicClient({
	chain: anvil,
	transport: http("http://anvil:8545"),
});

const server = Fastify({ logger: true });

interface IFaucet {
	address: Address;
	amount?: string;
}

server.post<{ Body: IFaucet }>("/faucet", async function handler(req, res) {
	const address = getAddress(req.body.address);
	const amount = BigInt(req.body.amount || parseEther("1"));

	console.log(amount);
	const current = await rpc.getBalance({ address });
	await rpc.request({
		method: "anvil_setBalance",
		params: [address, toHex(amount + current)],
	});
});

server.listen({ port: 3000, host: "0.0.0.0" });
