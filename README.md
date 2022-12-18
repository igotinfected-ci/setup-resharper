# Setup ReSharper Command Line Tools

<p align="center">
  <a href="https://github.com/igotinfected-ci/setup-resharper/actions"><img alt="setup-resharper status" src="https://github.com/igotinfected-ci/setup-resharper/workflows/build-test/badge.svg"></a>
</p>

This action installs the [ReSharper Command Line Tools](https://www.jetbrains.com/help/resharper/ReSharper_Command_Line_Tools.html) for use in other GitHub actions.

## Acknowledgements

This repo is built upon the previous work of [goIT & jozefizso's](https://github.com/goit/setup-resharper) `setup-resharper` action.

## Usage

```yaml
name: "workflow name"
on: pull_request

jobs:
  do-something:
    runs-on: ${{ matrix.operating-system }}
    strategy:
      matrix:
        operating-system: [ubuntu-latest, windows-latest, macos-latest]
    steps:
      - uses: actions/checkout@v2
      - name: Set up ReSharper CLT with latest version
        uses: igotinfected/setup-resharper@latest
      # ReSharper CLT commands are now available...

  do-something-else:
    runs-on: ${{ matrix.operating-system }}
    strategy:
      matrix:
        operating-system: [ubuntu-latest, windows-latest, macos-latest]
    steps:
      - uses: actions/checkout@v2
      - name: Set up ReSharper CLT with specific version
        uses: igotinfected/setup-resharper@latest
        with:
          version: "2022.2.4"
      # ReSharper CLT commands are now available...
```
