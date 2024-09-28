"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChainRepository = void 0;
const BadRequestError_1 = require("./common/errors/BadRequestError");
class ChainRepository {
	constructor(sourcifyChainMap) {
		this.sourcifyChainMap = sourcifyChainMap;
		this.sourcifyChainsArray = this._sourcifyChainsArray();
		this.supportedChainsArray = this._supportedChainsArray();
		this.supportedChainMap = this._supportedChainMap();
	}
	// Gets the chainsMap, sorts the chains, returns SourcifyChain array.
	_sourcifyChainsArray() {
		const chainsArray = Object.values(this.sourcifyChainMap);
		// Have Ethereum chains on top.
		const ethereumChainIds = [1, 17000, 5, 11155111, 3, 4];
		const ethereumChains = [];
		ethereumChainIds.forEach((id) => {
			// Ethereum chains might not be in a custom chains.json
			if (this.sourcifyChainMap[id] === undefined) {
				return;
			}
			// Use long form name for Ethereum netorks e.g. "Ethereum Testnet Goerli" instead of "Goerli"
			this.sourcifyChainMap[id].name =
				this.sourcifyChainMap[id].title || this.sourcifyChainMap[id].name;
			ethereumChains.push(this.sourcifyChainMap[id]);
		});
		// Others, sorted by chainId strings
		const otherChains = chainsArray
			.filter((chain) => !ethereumChainIds.includes(chain.chainId))
			.sort((a, b) =>
				a.chainId.toString() > b.chainId.toString()
					? 1
					: a.chainId.toString() < b.chainId.toString()
						? -1
						: 0,
			);
		const sortedChains = ethereumChains.concat(otherChains);
		return sortedChains;
	}
	_supportedChainMap() {
		return this._supportedChainsArray().reduce(
			(map, chain) => ((map[chain.chainId.toString()] = chain), map),
			{},
		);
	}
	_supportedChainsArray() {
		return this._sourcifyChainsArray().filter((chain) => chain.supported);
	}
	/**
	 * To check if a chain is supported for verification.
	 * Note that there might be chains not supported for verification anymore but still exist as a SourcifyChain e.g. Ropsten.
	 */
	checkSupportedChainId(chainId) {
		console.log(this.sourcifyChainMap);
		if (
			!(
				chainId in this.sourcifyChainMap &&
				this.sourcifyChainMap[chainId].supported
			)
		) {
			throw new BadRequestError_1.BadRequestError(
				`Chain ${chainId} not supported for verification!`,
			);
		}
		return true;
	}
	/**
	 * To check if a chain exists as a SourcifyChain.
	 * Note that there might be chains not supported for verification anymore but still exist as a SourcifyChain e.g. Ropsten.
	 */
	checkSourcifyChainId(chainId) {
		if (
			!(chainId in this.sourcifyChainMap && this.sourcifyChainMap[chainId]) &&
			chainId != "0"
		) {
			throw new Error(`Chain ${chainId} is not a Sourcify chain!`);
		}
		return true;
	}
	/**
	 * Validation function for multiple chainIds
	 * Note that this checks if a chain exists as a SourcifyChain.
	 * This is different that checking for verification support i.e. supported: true or monitoring support i.e. monitored: true
	 */
	validateSourcifyChainIds(chainIds) {
		const chainIdsArray = chainIds.split(",");
		const validChainIds = [];
		const invalidChainIds = [];
		for (const chainId of chainIdsArray) {
			try {
				if (this.checkSourcifyChainId(chainId)) {
					validChainIds.push(chainId);
				}
			} catch (e) {
				invalidChainIds.push(chainId);
			}
		}
		if (invalidChainIds.length) {
			throw new Error(`Invalid chainIds: ${invalidChainIds.join(", ")}`);
		}
		return true;
	}
}
exports.ChainRepository = ChainRepository;
//# sourceMappingURL=sourcify-chain-repository.js.map

