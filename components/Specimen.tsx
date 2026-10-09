import type { FeatureSlug } from "@/lib/features";
import s from "./Specimen.module.css";

/** Illustrative mock-ups of each feature, drawn in the app's Concrete theme. */
export function Specimen({ slug }: { slug: FeatureSlug }) {
  switch (slug) {
    case "notes":
      return <NotesSpecimen />;
    case "quizzes":
      return <QuizSpecimen />;
    case "tutor":
      return <TutorSpecimen />;
    case "review":
      return <ReviewSpecimen />;
    case "agents":
      return <AgentSpecimen />;
    case "sandbox":
      return <SandboxSpecimen />;
    case "progress":
      return <ProgressSpecimen />;
  }
}

export function Frame({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <figure className={s.frame}>
      <div className={s.chrome}>
        <span className={s.dots} aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className={s.title}>{title}</span>
      </div>
      <div className={s.body}>{children}</div>
    </figure>
  );
}

function NotesSpecimen() {
  return (
    <Frame title="Physics / kinematics.md">
      <div className={s.split}>
        <ul className={s.tree}>
          <li className={s.folder}>Physics</li>
          <li className={s.file}>forces.md</li>
          <li className={`${s.file} ${s.selected}`}>kinematics.md</li>
          <li className={s.file}>energy.md</li>
          <li className={s.folder}>Linear Algebra</li>
          <li className={s.file}>eigenvectors.md</li>
          <li className={s.file}>span.md</li>
        </ul>
        <div className={s.doc}>
          <p className={s.h}># Kinematics</p>
          <p>
            Motion under constant acceleration. See <span className={s.wiki}>[[forces]]</span> for why
            acceleration is constant.
          </p>
          <p className={s.math}>$$ x(t) = x_0 + v_0 t + \tfrac12 a t^2 $$</p>
          <p className={s.h2}>## Checklist</p>
          <p>
            <span className={s.check}>✓</span> Derive from <span className={s.code}>a = dv/dt</span>
          </p>
          <p>
            <span className={s.box} /> Solve projectile problems 3–6
          </p>
        </div>
      </div>
    </Frame>
  );
}

function QuizSpecimen() {
  return (
    <div className={s.quad}>
      <div className={s.card}>
        <p className={s.kicker}>Multiple choice</p>
        <p className={s.q}>A ball is thrown straight up. At the top of its path, its acceleration is</p>
        <ul className={s.options}>
          <li>zero</li>
          <li className={s.chosen}>g, downward</li>
          <li>g, upward</li>
        </ul>
      </div>
      <div className={s.card}>
        <p className={s.kicker}>Cloze</p>
        <p className={s.q}>
          An eigenvector of A satisfies A<b>v</b> = <span className={s.blank}>λv</span>, for some scalar λ.
        </p>
      </div>
      <div className={s.card}>
        <p className={s.kicker}>Open</p>
        <p className={s.q}>Explain why the area under a velocity-time graph equals displacement.</p>
        <div className={s.lines} aria-hidden="true">
          <i />
          <i />
        </div>
      </div>
      <div className={s.card}>
        <p className={s.kicker}>Code</p>
        <p className={s.q}>Return the dot product of two lists.</p>
        <pre className={s.pre}>{`def dot(a, b):
    return sum(x*y for x, y in zip(a, b))`}</pre>
      </div>
    </div>
  );
}

function TutorSpecimen() {
  return (
    <Frame title="Tutor · kinematics.md">
      <div className={s.chat}>
        <p className={s.you}>Why does the ½ appear in x = v₀t + ½at²?</p>
        <div className={s.bot}>
          <p className={s.kicker}>Grounded in kinematics.md</p>
          <p>
            Your note defines velocity as v(t) = v₀ + at. Displacement is the area under that line: a rectangle
            v₀t plus a triangle with base t and height at. A triangle&apos;s area is ½ · base · height, which gives
            ½at².
          </p>
        </div>
        <p className={s.you}>So with zero acceleration it&apos;s just the rectangle?</p>
      </div>
    </Frame>
  );
}

function ReviewSpecimen() {
  const ratings = [
    { k: "Again", t: "<10m" },
    { k: "Hard", t: "1d" },
    { k: "Good", t: "3d" },
    { k: "Easy", t: "8d" },
  ];
  return (
    <Frame title="Review · Linear Algebra · 12 due">
      <div className={s.flash}>
        <p className={s.kicker}>Front</p>
        <p className={s.flashQ}>What does it mean for vectors to be linearly independent?</p>
        <hr className={s.dash} />
        <p className={s.kicker}>Back</p>
        <p className={s.flashA}>No vector in the set is a linear combination of the others.</p>
        <div className={s.ratings}>
          {ratings.map((r, i) => (
            <span key={r.k} className={`${s.rating} ${i === 2 ? s.ratingOn : ""}`}>
              <b>{r.k}</b>
              <small>{r.t}</small>
            </span>
          ))}
        </div>
      </div>
    </Frame>
  );
}

function AgentSpecimen() {
  const steps = [
    { ok: true, text: "read  Linear Algebra/eigenvectors.md" },
    { ok: true, text: "read  Linear Algebra/span.md" },
    { ok: true, text: "edit  Linear Algebra/eigenvectors.md  +14 −3" },
    { ok: true, text: "write Linear Algebra/eigenvectors.cards.md  (18 cards)" },
    { ok: false, text: "linking related notes…" },
  ];
  return (
    <Frame title="Agent · Claude Code">
      <div className={s.term}>
        <p className={s.prompt}>
          <span>›</span> Tidy my eigenvectors note and make flashcards for it
        </p>
        <ul>
          {steps.map((st) => (
            <li key={st.text} className={st.ok ? "" : s.running}>
              <span className={s.tick}>{st.ok ? "✓" : "◐"}</span>
              {st.text}
            </li>
          ))}
        </ul>
        <p className={s.trace}>trajectory → agent-trajectories/2026-10-09T14-02.jsonl</p>
      </div>
    </Frame>
  );
}

function SandboxSpecimen() {
  return (
    <Frame title="Physics / free-fall.md">
      <div className={s.sandbox}>
        <div className={s.runbar}>
          <span>python</span>
          <span className={s.run}>▶ Run</span>
        </div>
        <pre className={s.pre}>{`def falls(t, g=9.81):
    return 0.5 * g * t**2

for t in (1, 2, 3):
    print(t, round(falls(t), 2))`}</pre>
        <div className={s.output}>
          <span className={s.kicker}>Output · 0.41s</span>
          <pre>{`1 4.91
2 19.62
3 44.15`}</pre>
        </div>
      </div>
    </Frame>
  );
}

function ProgressSpecimen() {
  const skills = [
    { k: "Kinematics", v: 92 },
    { k: "Forces", v: 78 },
    { k: "Energy", v: 64 },
    { k: "Momentum", v: 41 },
  ];
  const days = [2, 0, 1, 3, 2, 2, 0, 1, 3, 3, 2, 1, 3, 2];
  return (
    <Frame title="Progress · Physics">
      <div className={s.progress}>
        <div className={s.score}>
          <span className={s.kicker}>Last quiz</span>
          <b>80%</b>
          <small>8 of 10 correct</small>
        </div>
        <ul className={s.skills}>
          {skills.map((sk) => (
            <li key={sk.k}>
              <span>{sk.k}</span>
              <span className={s.track}>
                <i style={{ width: `${sk.v}%` }} className={sk.v < 50 ? s.low : ""} />
              </span>
              <span className={s.pct}>{sk.v}</span>
            </li>
          ))}
        </ul>
        <div>
          <span className={s.kicker}>Last 14 days</span>
          <div className={s.days}>
            {days.map((d, i) => (
              <i key={i} data-level={d} />
            ))}
          </div>
        </div>
      </div>
    </Frame>
  );
}
