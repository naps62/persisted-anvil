import { createPublicClient, http, walletActions } from "viem";
import { anvil } from "viem/chains";

const subvisual = { ...anvil, id: 7566690 };

export const rpc = createPublicClient({
	chain: subvisual,
	transport: http("http://anvil:8545"),
}).extend(walletActions);
