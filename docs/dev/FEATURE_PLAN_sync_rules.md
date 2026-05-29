# Feature Plan: Sincronización automatizada de reglas (sync-rules)

- **Feature:** Sincronización automatizada de reglas
- **Branch:** feature/sync-rules
- **Status:** Done
- **Goal:** Centralizar las reglas de la bitácora en una sola plantilla origen y generar automáticamente todos los archivos de destino (CLAUDE.md, GEMINI.md, AGENTS.md, SKILL.md, .windsurfrules, .cursor/rules/bitacora.mdc).
- **Approach:**
  1. Crear una plantilla base `docs/dev/rules_template.md` que contenga el core de las instrucciones de la bitácora.
  2. Desarrollar un script Node.js `scripts/sync-rules.js` que lea esta plantilla y compile/actualice los archivos finales inyectando las cabeceras frontmatter y formatos requeridos por cada plataforma.
  3. Configurar scripts en `package.json` para facilitar la ejecución.
- **Architecture:**
  - `docs/dev/rules_template.md` -> Source of Truth
  - `scripts/sync-rules.js` -> Sincronizador en Node.js
  - Target files -> Distribuciones autogeneradas.
- **Acceptance criteria:**
  - Ejecutar `node scripts/sync-rules.js` (o `npm run sync`) regenera todos los archivos de distribución con el contenido idéntico al de la plantilla.
  - Los archivos finales de Cursor y de Claude Code contienen sus respectivos frontmatters intactos.
  - El código de la bitácora sigue funcionando correctamente en todas las herramientas.
- **Test plan:**
  - Manual: Modificar la plantilla, correr el script, verificar que los cambios se propaguen correctamente a todos los archivos.
- **Risks:**
  - Perder los frontmatters específicos durante la generación. Se mitigará usando delimitadores claros o plantillas específicas por archivo.
- **Sessions:**
  - 2026-05-29: Planificación e implementación inicial.
