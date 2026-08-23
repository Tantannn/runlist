# Runlist

Todo lists and repeatable checklists, synced to your Google account.

**This is a learning project. You write it.** The skeleton below exists so you
never lose a weekend to config. Everything marked *yours* is your code, written
by hand.

---

## The rules

1. **Three hours a week on this repo.** One weekend block. Two hours is the floor for a bad week. The rest of your practice budget lives at work — see the plan in `../notes/slow-rebuild.html`.
2. **AI off inside that block.** Docs open, Stack Overflow open, AI closed.
   Everywhere else in your life it stays on — this is the one zone.
3. **Miss a week → resume, don't restart.**
4. **Every push runs the pre-push pass.** Including here. Especially here.

If a session ends with one working checkbox, that was a good session.

---

## Setup — do this once (about 20 minutes)

### 1. Firebase project

1. Go to <https://console.firebase.google.com> and create a project. Turn
   Google Analytics off — you don't need it.
2. **Build → Authentication → Get started → Google → Enable.** Set a support
   email. Save.
3. **Build → Firestore Database → Create database.** Start in **production
   mode**. Pick the region closest to you (`asia-southeast1` for Singapore).
4. **Project settings → General → Your apps → Web (`</>`).** Register the app.
   Copy the `firebaseConfig` values it shows you.

### 2. Local config

```bash
cp .env.example .env.local
```

Paste the values from step 4 into `.env.local`. It is gitignored.

These keys are **not secrets** — Firebase web config is public by design, and
every Firebase app on the internet ships them in its bundle. Your data is
protected by the security rules below, not by hiding the keys.

### 3. Security rules — the part that actually protects you

**Firestore → Rules**, replace everything with:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

Publish. This says: you can only touch documents under your own user id, and
only while signed in. Without it, production mode denies everything and you'll
think your code is broken.

### 4. Run it

```bash
npm run dev
```

---

## Commands

```bash
npm run dev        # vite dev server
npm run build      # tsc -b && vite build
npm test           # vitest run
npm run test:watch
npm run lint
```

---

## What I wrote / what's yours

**Mine — plumbing. Don't rewrite unless it's wrong:**

| File | What it is |
| --- | --- |
| `vite.config.ts` | Vite + Tailwind + vitest wiring, GitHub Pages base path |
| `src/types.ts` | The data model. The spec in TypeScript form. |
| `src/lib/firebase.ts` | Firebase init. Exports `auth`, `db`, `googleProvider`. |
| `src/test/setup.ts` | Testing Library cleanup between tests |
| `.env.example` | Config template |

**Yours — every line:**

`src/lib/auth.ts` · `src/lib/db.ts` · `src/hooks/*` · `src/components/*` ·
`src/App.tsx` · every test.

---

## Build order

Each milestone is a session or two. **Ship each one before starting the next** —
a half-finished milestone is how projects die.

### 0 · Read the spec, write the statements
Read `SPEC.md`. Turn it into numbered testable statements in `STATEMENTS.md`.
Answer every question in its "deliberately not decided" section, in writing.

*Done when:* every statement is something you could verify by clicking.

### 1 · Sign in
`src/lib/auth.ts` — sign in with popup, sign out, subscribe to auth state — and
a `useAuth` hook. Screen shows a sign-in button when signed out, your name and a
sign-out button when signed in.

*Done when:* you refresh the page and stay signed in.

### 2 · One list, in memory
No Firestore yet. Hardcode a `TaskList`, render its tasks, tick a checkbox, add
a task, delete a task. Pure React state.

*Done when:* it works, and you can explain every re-render.

### 3 · That list, in Firestore
`src/lib/db.ts` — read and write `users/{uid}/lists/{listId}`. Wire the UI from
milestone 2 to it. Handle loading and error states, because you wrote them into
your statements.

*Done when:* you tick a box on your phone and see it ticked on your laptop.

### 4 · Many lists
Sidebar, create, rename, delete, switch. Delete asks first.

*Done when:* deleting a list can't lose data you wanted.

### 5 · Templates
Create a template, add and edit items, reorder them, delete it. Reuse what you
built in milestone 4 — if you're copy-pasting, stop and extract instead.

*Done when:* your real pre-push checklist is in there, typed by you.

### 6 · Runs
Start a run from a template, tick through it, finish it. **A run copies the
template's items and name at creation and never reads the template again** —
see the invariant in `types.ts`. Show progress. Keep history.

*Done when:* you rename the template and last week's run is unchanged.

### 7 · Make it good
Keyboard shortcuts. Phone layout. Empty states. The unglamorous 20% that decides
whether you actually use it.

### 8 · Deploy
GitHub Actions → GitHub Pages, `BASE_PATH=/runlist/`. Add your Pages domain to
**Firebase → Authentication → Settings → Authorised domains**, or Google sign-in
fails in production while working fine locally.

*Done when:* it's on the internet and you use it for a real push.

---

## Tests

Not everything. These, as you go:

- Pure functions first — progress calculation, ordering, the template → run copy.
- One component test per milestone, on behaviour: "ticking a box marks the task
  done", not "the div has class x".
- Every bug you fix gets a test that fails without the fix. This is the habit
  that compounds.

---

## Getting review

When a milestone is done, or when you're stuck for more than 30 minutes:

- `review milestone 3` — I read the diff and comment. Findings only, no fixes.
- `explain <file>` — walk through code you didn't fully follow.
- `unblock: <what you tried>` — say what you tried first. The attempt is where
  the learning is.

I won't write feature code in this repo unless you explicitly tell me to
override that.
