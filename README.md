# CI-Status
To check the status of CI Workflow

```
on: [push]

jobs:
  hello_world_job:
    runs-on: ubuntu-latest
    name: A job to say hello
    steps:
      # To use this repository's private action,
      # you must check out the repository
      - name: Checkout
        uses: actions/checkout@v3
      - name: Validate CI status
        uses: siranjeeviajith/CI-Status@v2
        with:
          token: '{token}'
          branch: ${{env.HEAD_BRANCH}}
          workflow_id: '{workflow_id}'
          owner: '{owner}'
          repo: '{repo}'
    
```
