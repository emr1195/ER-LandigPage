# Domain docs

This repo uses a single-context layout:

- `GLOSSARY.md` at the repo root for domain vocabulary.
- `docs/adr/` for architectural decision records.

## Before exploring

Read `GLOSSARY.md` and ADRs relevant to the area being explored.

If these documents do not exist, proceed silently. Domain modeling
creates them lazily when terminology or decisions are resolved.

## Use domain vocabulary

Use glossary terms in issue titles, proposals, hypotheses, and tests.
For an undefined concept, reconsider whether it matches existing
language; record genuine gaps for `/domain-modeling`.

## Surface decision conflicts

If a proposal contradicts an existing ADR, name the ADR and explain
why the decision should be reconsidered.
