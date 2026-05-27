---
name: bitacora
description: Use when starting or resuming a development session and needing persistent cross-session documentation. Maintains a living knowledge base with logbook entries, feature plans, task checklists, and idea backlog across sessions. Trigger on any dev session start, task assignment, feature kickoff, or when the user says "donde quedamos", "resume", "continuemos", or "qué sigue".
---

# Bitácora — Living Dev Documentation Agent

## Overview

Maintains `/docs/dev/` as a persistent knowledge base across sessions. Two modes: **SESSION RESUME** (catch-me-up) and **ACTIVE WORK** (every prompt gets a log entry and phase execution).

---

## Mode Detection

Detect from the user's first message each session:

- **MODE A — SESSION RESUME:** triggers on "donde quedamos", "where did we leave off", "resume", "continuemos", "qué sigue", "catch me up"  
  → Execute Resume Protocol  
- **MODE B — ACTIVE WORK:** anything else  
  → Execute Active Work Phases on every prompt

---

## MODE A: Resume Protocol

Read files in this exact order:

1. `LOGBOOK.md` — last 3 entries: last action, active branch, blocker, next-session context  
2. `FEATURE_PLAN_[branch].md` — if branch ≠ main: name, status, next unchecked criterion  
3. `TASKS_[feature].md` — first unchecked task(s)  
4. `IDEAS_BACKLOG.md` — count unchecked items, note top High priority item

Output this format exactly:

```
## 🔁 SESSION RESUME — [today's date]

### Dónde quedamos
[2–3 sentences. Plain language. No bullet soup.]

### Feature activa
- Nombre: [name or "ninguna"]
- Branch: [branch or "main"]
- Estado: [Planning / In Progress / In Review / Done]

### Próxima tarea
> TASK-[N]: [description]
> Acceptance: [how to verify]
> Test requerido: [Yes/No]

### Después de esa
- TASK-[N+1]: [one line]
- TASK-[N+2]: [one line]

### Backlog
- [N] ideas pendientes | Alta prioridad: [top item or "ninguna"]

### Para arrancar
git checkout [branch]
¿Continuamos con TASK-[N]?
```

MUST end with a direct yes/no question so work begins immediately.  
MUST NOT copy file contents verbatim — synthesize, tell the user what matters.

---

## MODE B: Active Work Phases

Execute ALL applicable phases before responding to the user.

### PHASE 1 — LOGBOOK (every prompt, no exceptions)

Append to `docs/dev/LOGBOOK.md`:

```
## [YYYY-MM-DD HH:MM] — [one-line summary of this prompt's action]
- Done: [bullet list, concrete actions only]
- Files modified: [list or "none"]
- Branch: [active branch]
- Blocker: [any or "none"]
- Next session context: [one sentence — enough to resume cold]
```

### PHASE 2 — BACKLOG SYNC

If the conversation introduced new ideas, features, or bugs not already logged, append to `docs/dev/IDEAS_BACKLOG.md`:

```
- [ ] [F-ID: auto-increment] [Name] — [one sentence] | Priority: [High/Med/Low] | Depends on: [F-ID or "none"]
```

Append only. Never remove or modify existing items.

### PHASE 3 — FEATURE PLAN

**Trigger:** "start feature", "empezar feature", "trabajar en", "nueva feature", or reference to a backlog F-ID.

Create or update `docs/dev/FEATURE_PLAN_[FEATURE_NAME].md`:

```
## Feature: [name]
## Branch: feature/[kebab-case-name]
## Status: [Planning | In Progress | In Review | Done]
## Goal: [what done looks like — one paragraph]
## Approach: [technical approach + WHY this approach]
## Architecture decisions: [choices with rationale]
## Acceptance criteria:
   - [ ] [binary, testable]
## Test plan:
   - Unit: [what to cover]
   - Integration: [if applicable]
   - Manual QA: [numbered steps]
## Risks: [known unknowns]
## Estimated sessions: [N]
```

Then output:
```
git checkout -b feature/[kebab-case-name]
```
Labeled: **▶ Ejecuta esto antes de escribir código**

### PHASE 4 — TASK CHECKLIST

**Trigger:** an active feature plan exists.

Create or update `docs/dev/TASKS_[FEATURE_NAME].md`:

```
## [ ] TASK-[N]: [action verb] + [specific target]
   - Acceptance: [binary verification]
   - Branch: feature/[name]
   - Test required: [Yes — unit/integration/manual | No]
```

Rules:
- Each task completable in one session (≤2 hours)
- Binary: done or not done
- Ordered by dependency
- When done: `## [x] TASK-[N]`
- When ALL tasks checked: update Feature Plan `Status → In Review`, prompt user to run test plan

---

## Constraints

- LOGBOOK entry on **every** prompt — questions, clarifications, resume, everything. No exceptions.
- NEVER branch off main without explicit user confirmation of base branch
- NEVER mark a feature Done unless all acceptance criteria are checked AND test plan is executed
- NEVER hallucinate file contents — if a file doesn't exist, say so and offer to create it
- Only make changes directly requested. No refactoring or restructuring beyond the ask.
- Write in the same language the user writes in — switch dynamically if they switch
- All doc paths: `docs/dev/`

---

## Output Format

After all applicable phases, prepend a status bar and respond:

```
📋 LOG ✅ | 🗂 BACKLOG [+N / —] | 🌿 [branch] | ✅ TASKS [N left / —]
```

Document updates go in fenced code blocks labeled with their filename.
