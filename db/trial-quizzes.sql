-- Apply once to the production Neon database.
-- One free sample quiz per Concrete (Firebase) account, made on the marketing site.
CREATE TABLE IF NOT EXISTS trial_quizzes (
  firebase_uid text PRIMARY KEY,
  email text NOT NULL,
  status text NOT NULL DEFAULT 'generating' CHECK (status IN ('generating', 'done')),
  title text,
  quiz_markdown text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
