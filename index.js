const core = require('@actions/core');
const github = require('@actions/github');

try {
  // `payload` input defined in action metadata file
  const payload = core.getInput('payload');
  console.log(`Hello ${payload}!`);
  const time = (new Date()).toTimeString();
  core.setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow
  const jsonPayload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${jsonPayload}`);
} catch (error) {
  core.setFailed(error.message);
}