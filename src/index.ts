import { getInput, setFailed } from "@actions/core";
import { context } from "@actions/github";
import got from "got";
import { config } from "./config";

const providedRepoToken = getInput("repo-token");
const repoToken = providedRepoToken
  ? `${context.payload.repository!.owner.login}:${providedRepoToken}`
  : undefined;
const componentId = getInput("component-id");
const apiToken = getInput("api-token");
const version = getInput("version");

got
  .post(`${config.host}/${config.apiPath}/github-actions/release`, {
    headers: {
      Authorization: `Bearer ${apiToken}`,
    },
    json: {
      repoToken,
      wcId: componentId,
      sha1: context.sha,
      version,
    },
  })
  .then((response) => console.log(response.body))
  .catch((error) => setFailed(error.response?.body ?? error.message));
