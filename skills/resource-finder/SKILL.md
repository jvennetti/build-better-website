---
name: resource-finder
description: >
  Find, check, and organize online resources (articles, videos, tools,
  books, courses, products) into a clean list for a website or artifact.
  ALWAYS invoke when asked to research resources, gather links, find the
  best books or tools on a topic, "look on Amazon", build a resource page or
  reading list, or fill a resource-collection artifact with real items.
---

# Resource Finder

Every link that goes on the page must be real, working, and checked. A
resource list with one dead or invented link loses the reader's trust.

## 1. Ask once, then search

If the user hasn't said, ask these in one message:
- The topic, and who the page is for (beginners, professionals, parents).
- Which types to include: articles, videos, books, tools, courses, products.
- About how many items to find (default: 10 to 15).

Then search. Run several web searches with different wording. Prefer
primary sources: the author's own site, the publisher, the official tool
page, the creator's YouTube channel.

## 2. Verify every item

For each candidate, open the page and confirm:
- The link loads and goes to the right page.
- The title, author or creator, and date match what you will write.
- The resource is about the topic, beyond a passing mention in the title.

Drop anything you could not open. Never write a link from memory. Never
guess a URL.

## 3. Books and products (Amazon)

- Find books and products through web search. Amazon blocks automated
  browsing and its terms prohibit scraping, so do not crawl Amazon pages
  or work around its bot checks.
- Use the Amazon link that appears in search results. If none appears,
  link an Amazon search for the exact title instead:
  `https://www.amazon.com/s?k=<title+author>`
- Prices change daily. Leave prices out unless the user asks. If they ask,
  write the date beside the price ("$18.99 on Nov 5, 2026").
- If the user has an Amazon Associates tag, add `?tag=<their-tag>` to
  product links and tell them to add the required affiliate disclosure
  to the page.

## 4. Record each item the same way

| Field | Example |
|---|---|
| title | The Design of Everyday Things |
| type | book |
| creator | Don Norman |
| url | (the checked link) |
| summary | One plain sentence on what the reader gets from it. |
| why | One sentence on why it made the list. |
| checked | 2026-11-05 |

Write summaries in your own words. Do not copy descriptions from the
source page.

## 5. Hand off to the page

- Save the list as `resources.json` in the project folder so the page and
  later sessions can reuse it.
- If the page is an artifact that people will add to, store the items in
  the artifact's database so new resources can be added without
  rebuilding the page.
- Group items by type or by level (start here, go deeper). Ranked lists
  beat flat grids when one resource is clearly the best starting point.

## 6. Report

Tell the user how many items you found, how many you dropped and why, and
any type you could not fill.
