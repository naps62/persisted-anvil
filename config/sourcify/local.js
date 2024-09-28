const {
	WStorageIdentifiers,
	RWStorageIdentifiers,
} = require("../server/services/storageServices/identifiers");

module.exports = {
	repositoryV1: {
		path: "/data/v1",
	},
	repositoryV2: {
		path: "/data/v2",
	},
	storage: {
		read: RWStorageIdentifiers.RepositoryV1,
		writeOrWarn: [RWStorageIdentifiers.RepositoryV1],
		writeOrErr: [WStorageIdentifiers.RepositoryV2],
	},
};
