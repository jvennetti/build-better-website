# Build better website

These are the Claude Code skills used in the course *Build a Website with Claude Code*.

## Install

Open Claude Code and paste this line:

```
Set me up with https://github.com/jvennetti/build-better-website by following its SETUP.md.
```

Claude copies the skills and installs Node.js and the screenshot tool if your computer needs them. Click **Allow** when it asks. Restart Claude when it's done.

## What's included

| Skill | What it does |
|---|---|
| `brainstorm-before-code` | Asks you a few questions and gets your OK on a plan before Claude builds anything. |
| `frontend-design` | Sets a design direction, fonts, and colors first, then shows you one section for approval before it builds the full page. |
| `resource-finder` | Searches the web for articles, videos, tools, and books, checks every link, and saves the list for your page. |
| `design-review` | Screenshots your page at phone, tablet, and desktop sizes, then fixes what looks broken. |
| `humanizer` | Edits your page copy to remove word-level and phrase-level signs of AI writing. |
| `structural-humanizer` | A second editing pass that fixes AI patterns in structure, such as tidy lesson endings and predictable arcs. |

## Credits and licenses

- `brainstorm-before-code`, `frontend-design`, `resource-finder`, and `design-review` are by Joshua Vennetti, under the MIT License in `LICENSE`.
- `humanizer` is based on [blader/humanizer](https://github.com/blader/humanizer) by @blader (Siqi Chen), under the MIT License. That license is in `skills/humanizer/LICENSE-blader-humanizer`. The skill builds on [Wikipedia:Signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing) (CC BY-SA 4.0). The full attribution is in `skills/humanizer/ATTRIBUTION.md`.
- `structural-humanizer` comes from [NulightJens/humanizer-stack](https://github.com/NulightJens/humanizer-stack) under the MIT License. It's grounded in the StoryScope study (Russell et al., 2026, arXiv:2604.03136), and the attribution is in `skills/structural-humanizer/ATTRIBUTION.md`.
