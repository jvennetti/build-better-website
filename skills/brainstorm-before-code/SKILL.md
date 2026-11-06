---
name: brainstorm-before-code
description: >
  Requirements interview and design approval before building. ALWAYS invoke
  when starting a new project, or a feature whose shape is not fully
  specified — before writing any code. Also on "/brainstorm", "let's plan
  this", "new project", "I want to build". Skip for small well-defined
  tasks: bug fixes, copy changes, a single clearly-described component.
---

# Brainstorm Before Code

The most expensive AI failure is not bad code — it is a thousand good
lines solving the wrong problem. No code, no scaffolding, no file
creation until the user approves a design.

## 1. Interview

Ask questions **one at a time** (five or fewer total) until you could
explain the goal to a stranger. Cover the gaps the user did not state:
who uses it, what "done" looks like to them, what already exists, hard
constraints (stack, budget, deadline), and what is explicitly OUT of
scope. Stop asking the moment the shape is clear.

## 2. Propose approaches

Present 2–3 genuinely different approaches with one-line trade-offs
each, and **recommend one with a reason**. Simplest-that-works gets the
benefit of the doubt.

## 3. Write the design doc

Save to
`docs/specs/<project-name>_<feature>_<YYYYMMDD>.md`:

- **Goal** — 2–3 sentences, the finish line.
- **Approach** — the chosen one, and why the runners-up lost.
- **Scope** — what's in; what's explicitly out.
- **Plan** — small numbered steps, each independently verifiable.
- **Open questions** — anything deferred, so it isn't silently dropped.

## 4. Approval gate

Present the doc and **wait for approval before writing any code** —
unless the user already said to build straight through, or cannot
respond; then state the design in one paragraph and proceed.

## 5. Execute

Work through the plan step by step. The doc is the contract: if
reality forces a change to the approach, update the doc and say so —
don't drift silently. Requirements changes mid-build come from the
user, not from you.
