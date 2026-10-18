# Issue tracker: Local Markdown

Issues and specs live as Markdown files under `.scratch/`.

## Conventions

- One feature per directory: `.scratch/<feature-slug>/`.
- Spec: `.scratch/<feature-slug>/spec.md`.
- One file per implementation ticket:
  `.scratch/<feature-slug>/issues/<NN>-<slug>.md`, numbered from `01`.
- Record triage state near the top as `Status: <label>`, using the
  mapping in `docs/agents/triage-labels.md`.
- Append conversation history under `## Comments`.

## Publishing and fetching

When a skill says "publish to the issue tracker", create the appropriate
spec or ticket file, creating its directory if needed.

When a skill says "fetch the relevant ticket", read the referenced file.
Resolve ticket numbers within the relevant feature directory.

## Wayfinding operations

For `/wayfinder`:

- Map: `.scratch/<effort>/map.md`, containing Notes, Decisions-so-far,
  and Fog.
- Child ticket: `.scratch/<effort>/issues/<NN>-<slug>.md`.
  Record `Type: research|prototype|grilling|task`.
- Blocking: record `Blocked by: NN, NN`. A ticket is unblocked when
  every listed blocker has `Status: resolved`.
- Frontier: choose the first ticket by number that is open, unblocked,
  and unclaimed.
- Claim: save `Status: claimed` before beginning work.
- Resolve: append the answer under `## Answer`, set `Status: resolved`,
  and append a summary and link to Decisions-so-far in the map.

The `claimed` and `resolved` statuses apply to wayfinding tickets;
ordinary triage uses the five labels in `triage-labels.md`.
