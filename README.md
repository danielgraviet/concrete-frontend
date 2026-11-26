# Concrete — website

Website for [Concrete](https://github.com/danielgraviet/concrete), an app for practicing from your own course material (exam prep for CS and ACME). Public marketing pages are static. An optional student-access portal uses Next.js server routes with Neon Auth/Postgres and OpenRouter key management.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build, every route is prerendered
npm run lint
```

## Deploy to Vercel

1. Push this folder to its own GitHub repo.
2. In Vercel: **Add New → Project**, import the repo, and keep the detected Next.js defaults.
3. For the public marketing site only, deploy with the defaults. To enable student access, follow [`STUDENT_ACCESS_SETUP.md`](STUDENT_ACCESS_SETUP.md) and configure Neon and OpenRouter first.
4. Deploy. Every push to `main` redeploys, and pull requests get preview URLs.

Or from the CLI: `npx vercel` (preview) / `npx vercel --prod`.

## Sponsored student access

The optional `/student-access` page issues a one-time OpenRouter key to a verified `.edu` account. Each key has a $5 weekly limit, expires after 30 days, and receives the configured OpenRouter Guardrail. The instructor dashboard uses the same page and an allowlisted admin email to inspect usage and revoke keys.

Setup instructions, required Neon/Vercel environment variables, the OpenRouter Guardrail configuration, and the one-time database SQL are in [`STUDENT_ACCESS_SETUP.md`](STUDENT_ACCESS_SETUP.md). Do not expose `OPENROUTER_MANAGEMENT_KEY` to browser code or commit it.

## Structure

```
app/
  page.tsx              home: hero, feature index, learning loop, principles
  notes/ quizzes/ tutor/ review/ agents/ sandbox/ progress/
                        one route per feature, all rendered by <FeaturePage>
  download/             install steps with copy buttons, troubleshooting
  about/                the mark, construction, palette, project status
  globals.css           design tokens + 12-column grid + type scale
components/
  FeaturePage.tsx       shared feature template
  Specimen.tsx          illustrative HTML mock-ups of each feature
  Glyph.tsx             per-feature geometric glyph (square module)
  Composition.tsx       home hero Bauhaus composition
  SiteHeader / SiteFooter / CodeLine
lib/features.ts         all feature copy, specs, and steps (edit copy here)
public/brand/           logos from markdown-vault/docs/design (+ cropped *-crop.svg)
public/media/           demo GIFs from markdown-vault/docs/readme
```

## Design

- **Palette:** the app's *Concrete* theme pack (`markdown-vault/src/styles.css`): `#111` ink, `#6b6b6b` muted, `#e2e2e2` rules, `#f6f6f6` chrome, white paper. One Bauhaus signal colour (`#e2401c`) marks indices, the active page, and one shape per composition.
- **Type:** Inter (the app's UI font) set large and tight, with JetBrains Mono for labels and indices.
- **Grid:** 12 columns, hairline rules, numbered sections. This follows Swiss International Style, and the geometric shapes are cut from the logo's square module (halves, quarters, circles).

To add a feature page, add an entry to `FEATURES` in `lib/features.ts`, add a `Glyph`/`Specimen` case, and create `app/<slug>/page.tsx` (copy any existing one).
