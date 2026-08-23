# Bug log

One line per bug that escaped you — reached QA, review, or production. Bugs you
caught yourself before pushing do not count; those are the system working.

Takes ten seconds. After about twenty entries your three recurring patterns
become obvious, and those get promoted to the top of your pre-push checklist.
That is the point: turn a generic checklist into one that catches *your* bugs.

## Categories

| Tag | Means |
| --- | --- |
| `spec` | Built what I remembered, not what the ticket said |
| `state` | A state I never handled — empty, error, loading, long, many |
| `radius` | Broke something I never opened |
| `react` | Effect deps, keys, stale closure, race, derived state |
| `typo` | Wrong variable, off-by-one, copy-paste slip |
| `env` | Worked locally, failed in prod — config, CORS, auth domain |
| `other` | Genuinely new. If this fills up, add a category. |

## Entries

| Date | Tag | What happened | Would have caught it by |
| --- | --- | --- | --- |
| | | | |

<!--
Example:
| 2026-08-30 | radius | Renamed a prop on TaskRow, broke the template editor | Grepping imports before changing a shared component |
| 2026-09-02 | state  | Empty list rendered a blank page, no message         | Listing states in STATEMENTS.md before coding |
-->

## Monthly review

Ten minutes, once a month. Count the tags. The top one gets a new automated
check if possible, and a line at the top of the pre-push list if not.

| Month | Top tag | What I changed because of it |
| --- | --- | --- |
| | | |
