# Student access setup

The student portal is at `/student-access`. It uses Neon Auth for verified sign-in, Neon Postgres for a fixed pool of ten student seats, and Vercel Route Handlers to issue and revoke OpenRouter keys.

## 1. Connect Neon to Vercel

Create a Neon project and connect it to the existing Vercel project. Enable Neon Auth on the production branch, require email verification, and configure email delivery so students can receive verification links. Add the production site URL as a trusted origin. The portal accepts verified addresses whose domain ends in `.edu`; it does not require a particular school domain.

Apply [`db/student-access.sql`](db/student-access.sql) once to the production Neon database. It creates ten non-reusable seat rows. A revoked or expired seat remains assigned to the same student, so the portal can issue access to at most ten unique student accounts for this course.

## 2. Create the OpenRouter Guardrail

Create a Guardrail in OpenRouter with:

- Allowed model: `deepseek/deepseek-v4-flash-0731`
- Allowed provider: `deepseek`
- Weekly budget: `$5`

Assigning the guardrail to each student key is required; an unassigned guardrail enforces nothing. The app also sets each key's own `$5` weekly cap. Copy the Guardrail ID for the Vercel environment variable below.

## 3. Configure Vercel environment variables

Set these for Production (and Preview only if you intentionally want preview deployments to issue real student keys):

| Variable | Value |
| --- | --- |
| `DATABASE_URL` | Neon pooled Postgres connection string |
| `NEON_AUTH_BASE_URL` | Production Neon Auth endpoint URL |
| `NEON_AUTH_COOKIE_SECRET` | Random secret of at least 32 characters |
| `OPENROUTER_MANAGEMENT_KEY` | OpenRouter management key; server-side only |
| `OPENROUTER_GUARDRAIL_ID` | ID of the Guardrail created above |
| `STUDENT_ACCESS_ADMIN_EMAIL` | Instructor's verified sign-in email, lowercased |

After adding variables, redeploy the Vercel project. Set Neon Auth email verification to required before inviting students. Keep the OpenRouter management key out of browser-visible variables: do not prefix it with `NEXT_PUBLIC_`.

## 4. Instructor and student use

1. Sign in at `/student-access` using the email in `STUDENT_ACCESS_ADMIN_EMAIL`. The account must be verified by Neon Auth; it does not need a `.edu` address.
2. Students create accounts with a `.edu` email, verify it, then return and sign in.
3. A student claims access once. Their OpenRouter key is shown only in that response; they copy it and add it in Concrete under **Settings → Tutor AI**. The server stores only the OpenRouter key hash, never the plaintext key.
4. The instructor dashboard shows each claimed seat, status, weekly usage, remaining key limit, and expiry. **Revoke** disables the OpenRouter key immediately.

The 30-day expiry starts when the key is issued. The allowance resets weekly on OpenRouter's UTC schedule. Ten students can use up to $50 in a week. Do not configure automatic OpenRouter credit top-ups unless that amount is acceptable.

## Notes

- A student who closes the page before saving the one-time key must contact the instructor; the plaintext key cannot be retrieved from the portal.
- The Guardrail is the enforcement point for model/provider access. Concrete's UI has other model options and some non-DeepSeek helper calls, so those calls may return a blocked response with a sponsored key. The core quiz/tutor default is already the allowlisted DeepSeek V4 Flash model.
- Neon/Vercel Preview environments should not use the production OpenRouter management key or production Guardrail ID unless you deliberately want preview claims to consume the class allowance.
