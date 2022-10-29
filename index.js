const core = require("@actions/core");
const github = require("@actions/github");

/*Inputs*/
const token = core.getInput("token");
const owner = core.getInput("repo");
const workflow_id = core.getInput("workflow_id");
const branch = core.getInput("branch");

const fetchWorkFlow = () => {
  return github.getOctokit(token).rest.actions.listWorkflowRuns({
    owner,
    repo,
    workflow_id,
    branch,
  });
};
const run = async () => {
  try {
    const time = new Date().toTimeString();
    core.setOutput("time", time);

    let workflow;
    let status, conclusion;
    do {
      const { data } = await fetchWorkFlow();
      workflow = data?.workflow_runs?.[0];
      status = workflow?.status;
      conclusion = workflow?.conclusion;
      console.log(`Workflow status: ${status}`);
      setTimeout(() => {}, 1000 * 1);
    } while (status !== "completed");
    console.log(`Workflow conclusion: ${conclusion}`);
    if (conclusion !== "success")
      core.setFailed(
        `Workflow run failed : status${status} conclusion:${conclusion}`
      );
    core.setOutput('result', conclusion);
  } catch (error) {
    core.setFailed(error.message);
  }
};
run();
