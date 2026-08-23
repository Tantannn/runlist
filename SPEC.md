# Runlist — what it does

Read this once. **Do not start coding from it.**

Your first task is to turn this prose into numbered, testable statements —
Phase 1 of your pre-push pass. This document is deliberately written the way a
real ticket arrives: readable, incomplete, and full of decisions nobody made
yet. Finding those gaps is the exercise.

---

## The product

Two things in one app, sharing an account and a sidebar.

### Todo lists

Lists of tasks, like TickTick. A list has a name and a colour. A task has a
title, a done state, optional notes, and an optional due date. Tasks can be
reordered inside their list. Completed tasks stay visible but out of the way.

### Repeatable checklists

A **template** is a named checklist you keep — "Pre-push pass", "Before a
deploy", "Weekly review". It holds items, each with a title and an optional
hint line.

A **run** is one pass through a template. You start a run, tick your way down
it, and finish it. Tomorrow you start a fresh run of the same template with
everything unticked. Past runs stay as history, so you can see whether you
actually ran the check before the three pushes that broke.

The point of the split: a todo item is done once and gone. A checklist item is
done again every time, and the history is the useful part.

## Sign in

Google account only. No passwords, no email flow. Signing in on another device
shows the same data.

Nobody else can read your data. Ever.

## Feel

Fast enough to use during a push. Keyboard-first where it can be. Works on a
phone screen. Nothing that needs a manual.

---

## Deliberately not decided

These are yours to decide, and the decisions belong in your statements list
before any of them turns into code:

- What happens to a run you never finished, when you start a new one?
- Can you edit a run's items mid-run, or only the template?
- What does deleting a template do to its past runs?
- Does a todo list task have subtasks? (Think hard before saying yes.)
- Offline: does it need to work with no network, or is that v2?
- How far back does run history go?

## Out of scope for v1

Sharing, collaboration, tags, search, notifications, recurring due dates,
calendar view, mobile app, dark mode toggle (respect the OS instead).

Write these down as out of scope in your own list too. It is the sentence that
protects you when someone says "I assumed you'd also…".
