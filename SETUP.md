# Setup instructions for Claude

Claude: follow these steps after copying the skills. The person you are
helping may be new to computers. Explain each step in one plain sentence
before you run it, and tell them when an approval prompt or a Windows
"allow changes" window is expected.

## 1. Copy the skills

Copy every folder inside `skills/` into `~/.claude/skills/`. If a folder
with the same name already exists, ask before replacing it.

## 2. Check for Node.js

Run `node --version`. If it prints a version of 18 or higher, skip to
step 3.

If Node.js is missing or older, install the current LTS version:

- **Windows:** `winget install --id OpenJS.NodeJS.LTS -e --accept-source-agreements --accept-package-agreements`
- **Mac with Homebrew:** `brew install node`
- **Mac without Homebrew:** read https://nodejs.org/dist/index.json and
  take the first entry whose `lts` field is not `false`. Download
  `https://nodejs.org/dist/<version>/node-<version>.pkg` into
  `~/Downloads` with `curl -fLo`, then run `open` on the file. Tell the
  person the installer window is open, to click Continue with the default
  options, and to enter their Mac password when asked.

New terminals pick up Node.js after the install. Check again with
`node --version` in a fresh shell. If it still fails, tell the person to
restart Claude, then re-check.

## 3. Install the screenshot tool

In `~/.claude/skills/design-review/`, run:

```
npm install
npx playwright install chromium
```

## 4. Confirm

Tell the person which skills were installed, whether Node.js was
installed or already present, and that they should restart Claude so the
new skills load.
