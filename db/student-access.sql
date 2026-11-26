-- Apply once to the production Neon database.
CREATE TABLE IF NOT EXISTS student_access_seats (
  seat smallint PRIMARY KEY CHECK (seat BETWEEN 1 AND 10),
  auth_user_id text UNIQUE,
  email text,
  status text NOT NULL DEFAULT 'available'
    CHECK (status IN ('available', 'provisioning', 'active', 'revoked', 'expired')),
  openrouter_key_hash text UNIQUE,
  openrouter_key_name text,
  created_at timestamptz,
  expires_at timestamptz,
  revoked_at timestamptz,
  updated_at timestamptz NOT NULL DEFAULT now()
);

INSERT INTO student_access_seats (seat)
SELECT n::smallint FROM generate_series(1, 10) AS n
ON CONFLICT (seat) DO NOTHING;

CREATE INDEX IF NOT EXISTS student_access_status_idx ON student_access_seats (status, seat);
