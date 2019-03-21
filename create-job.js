const fs = require("fs");
const Client = require("kubernetes-client").Client;
const config = require("kubernetes-client").config;
const yaml = require("js-yaml");

async function createJob() {
	const client = new Client({
		config: config.fromKubeconfig(),
		version: "1.9"
	});

	try {
		const config = yaml.safeLoad(
			fs.readFileSync("./training-job.yaml", "utf8")
		);
    config.metadata.name = `trainingannotation-${Date.now()}`
		console.log(JSON.stringify(config, null, 4));

		const create = await client.apis.batch.v1.namespaces('default').jobs.post({ body: config});
		console.log("create job", create);
	} catch (e) {
		console.log(e);
	}
}

createJob();
