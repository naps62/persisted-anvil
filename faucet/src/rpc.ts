import { createPublicClient, http, walletActions } from "viem";
import { anvil } from "viem/chains";

const subvisual = { ...anvil, id: 7566690 };

export const rpc = createPublicClient({
  chain: subvisual,
  transport: http(process.env.ANVIL_URL),
}).extend(walletActions);
