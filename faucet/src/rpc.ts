import { createPublicClient, http } from "viem";
import { anvil } from "viem/chains";

export const rpc = createPublicClient({
	chain: anvil,
	transport: http("http://anvil:8545"),
});
