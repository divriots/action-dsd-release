import { getInput, setFailed } from "@actions/core";
import { context } from "@actions/github";
import got from "got";
import { config } from "./config";

const token = getInput("repo-token");
const componentId = getInput("component-id");
const apiToken = getInput("api-token");
const version = getInput("version");

got
  .post(`${config.host}/${config.apiPath}/github-actions/release`, {
    json: {
      apiToken,
      repoToken: `${context.payload.repository!.owner.login}:${token}`,
      wcId: componentId,
      sha1: context.payload.after,
      version,
    },
  })
  .then((response) => console.log(response.body))
  .catch((error) => setFailed(error.response?.body ?? error.message));
