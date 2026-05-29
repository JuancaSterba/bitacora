const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const TEMPLATE_PATH = path.join(ROOT_DIR, 'docs', 'dev', 'rules_template.md');

const SKILL_FRONTMATTER = `---
name: bitacora
description: Use when starting or resuming a dev session. Maintains logbook, feature plans, task checklists, and idea backlog in docs/dev/. Triggers on session start, feature kickoff, task request, or resume phrases like donde quedamos or catch me up.
---

`;

const CURSOR_FRONTMATTER = `---
description: Bitácora living documentation agent — logbook, feature plans, task checklists, idea backlog across sessions
alwaysApply: true
---

`;

function sync() {
  console.log('🔄 Sincronizando reglas de bitácora...');

  if (!fs.existsSync(TEMPLATE_PATH)) {
    console.error(`❌ Error: No se encontró la plantilla en ${TEMPLATE_PATH}`);
    process.exit(1);
  }

  const templateContent = fs.readFileSync(TEMPLATE_PATH, 'utf8');

  const targets = [
    { path: path.join(ROOT_DIR, 'AGENTS.md'), content: templateContent },
    { path: path.join(ROOT_DIR, 'CLAUDE.md'), content: templateContent },
    { path: path.join(ROOT_DIR, 'GEMINI.md'), content: templateContent },
    { path: path.join(ROOT_DIR, '.windsurfrules'), content: templateContent },
    { path: path.join(ROOT_DIR, 'SKILL.md'), content: SKILL_FRONTMATTER + templateContent },
    { path: path.join(ROOT_DIR, '.cursor', 'rules', 'bitacora.mdc'), content: CURSOR_FRONTMATTER + templateContent }
  ];

  targets.forEach(target => {
    const dir = path.dirname(target.path);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(target.path, target.content, 'utf8');
    console.log(`✅ Sincronizado: ${path.relative(ROOT_DIR, target.path)}`);
  });

  console.log('🎉 ¡Todas las reglas han sido sincronizadas con éxito!');
}

sync();
