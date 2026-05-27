# bitácora

A Claude Code skill that maintains a **living documentation system** across dev sessions.

Automatically tracks: session logbook, feature plans, task checklists, and idea backlog — all in plain markdown under `docs/dev/`.

---

## Install

```bash
npx skills add JuancaSterba/bitacora
```

> Requires [skills CLI](https://skills.sh): `npm i -g skills`

---

## What it does

Every time you work with Claude, bitácora:

- **Logs** what was done, what was changed, and what's next — in `docs/dev/LOGBOOK.md`
- **Tracks ideas** and backlog items that come up — in `docs/dev/IDEAS_BACKLOG.md`
- **Plans features** with acceptance criteria and test plans — in `docs/dev/FEATURE_PLAN_*.md`
- **Breaks features into tasks** with binary done/not-done state — in `docs/dev/TASKS_*.md`

At the start of any session, just say **"donde quedamos"** and Claude will reconstruct exactly where you left off.

---

## Session resume

```
donde quedamos
where did we leave off
continuemos
qué sigue
catch me up
```

Claude reads the last logbook entries, active feature plan, and pending tasks, then outputs a structured brief and asks if you want to continue.

---

## Feature workflow

```
empezar feature [nombre]
trabajar en [F-ID]
nueva feature: [descripción]
```

Creates a feature plan file and task checklist. Outputs the `git checkout -b` command to run before writing code.

---

## Output format

Every response starts with a status bar:

```
📋 LOG ✅ | 🗂 BACKLOG [+1] | 🌿 feature/auth | ✅ TASKS [3 left]
```

---

## File structure created in your project

```
docs/dev/
  LOGBOOK.md
  IDEAS_BACKLOG.md
  FEATURE_PLAN_[name].md
  TASKS_[name].md
```

---

## Language

Responds in the same language you write in. Switch mid-session and it follows.
