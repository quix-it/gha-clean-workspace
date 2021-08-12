# Workspace cleanup

Action used for cleaning a given directory when invoked and optionally after the job has completed

## Inputs

| Name | Mandatory | Default | Description |
| - | - | - | - |
| path | `false` | `.` | The path to the local folder to clean |
| post | `false` | `true` | Whether or not to cleanup at the end of the job |


## Outputs

The action produces no outputs.

## Usage

Using defaults (purges current folder when invoked and at the end of the job):
```yaml
...
    - uses: quix-it/gha-clean-workspace@v1
...
```

With parameters:
```yaml
...
    - uses: quix-it/gha-clean-workspace@v1
      with:
        path: ./my-staging-folder
        post: false
...
```
