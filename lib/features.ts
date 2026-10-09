export type FeatureSlug =
  | "notes"
  | "quizzes"
  | "tutor"
  | "review"
  | "agents"
  | "sandbox"
  | "progress";

/** Geometric glyph drawn for each feature, built from the square module of the mark. */
export type Glyph =
  | "square"
  | "circle"
  | "half"
  | "quarter"
  | "triangle"
  | "bars"
  | "cc";

export type Feature = {
  slug: FeatureSlug;
  index: string;
  name: string;
  glyph: Glyph;
  /** One line for the index and nav. */
  summary: string;
  headline: string;
  lede: string;
  media?: { src: string; alt: string };
  specs: { label: string; value: string }[];
  steps: { title: string; body: string }[];
  details: { title: string; body: string }[];
};

export const FEATURES: Feature[] = [
  {
    slug: "notes",
    index: "01",
    name: "Notes",
    glyph: "square",
    summary: "Plain Markdown, kept on your Mac.",
    headline: "Notes stay yours.",
    lede: "Write in ordinary Markdown files that live in a folder on your Mac. Organize topics into folders, link related ideas, and edit checklists, math and code in place. The files open in any other editor.",
    media: { src: "/media/notes.gif", alt: "Browsing folders and editing a note in Concrete" },
    specs: [
      { label: "Format", value: "Plain .md files" },
      { label: "Location", value: "~/Documents/Concrete" },
      { label: "Links", value: "[[Wikilinks]] + backlinks" },
      { label: "Export", value: "PDF" },
    ],
    steps: [
      { title: "Write", body: "A fast editor for prose, LaTeX math, fenced code, and checklists that you can tick in place." },
      { title: "Link", body: "Connect concepts with [[wikilinks]]. Backlinks and a note graph show how ideas relate." },
      { title: "Find", body: "A search palette indexes the whole vault, with in-file find for long notes." },
    ],
    details: [
      { title: "Local-first", body: "Concrete has no account and no cloud sync. Your vault is a folder on disk, so you can back it up, version it with git, or sync it however you like." },
      { title: "Portable", body: "Concrete has no proprietary format. Quizzes and flashcards are stored next to your notes as files you can read." },
      { title: "Built for STEM", body: "Math, code, and PDFs sit beside your prose, so one course can live in one place." },
    ],
  },
  {
    slug: "quizzes",
    index: "02",
    name: "Quizzes",
    glyph: "triangle",
    summary: "Practice generated from the note you are reading.",
    headline: "Practice what you learn.",
    lede: "Generate a quiz from the note you have open. Answer multiple-choice, cloze, open, and code questions without leaving the app, then get graded with feedback that points back to the source.",
    media: { src: "/media/quiz.gif", alt: "Generating a quiz from a note and choosing an answer" },
    specs: [
      { label: "Question types", value: "MCQ · Cloze · Open · Code" },
      { label: "Source", value: "Your current notes" },
      { label: "Grading", value: "In-app, with feedback" },
      { label: "Storage", value: "Saved in your vault" },
    ],
    steps: [
      { title: "Select", body: "Choose a note, or several, as the source material." },
      { title: "Generate", body: "The model drafts questions grounded in that text, and multiple-choice options are shuffled and rebalanced." },
      { title: "Answer", body: "Take the quiz in place. Open and code answers are graded with written feedback." },
    ],
    details: [
      { title: "Grounded", body: "Questions come from your material, not from whatever a model happens to remember about the topic." },
      { title: "Mixed formats", body: "Retrieval works best with variety: recognition, recall, explanation, and application." },
      { title: "Repeatable", body: "Quizzes are saved, so you can retake them and watch your score change." },
    ],
  },
  {
    slug: "tutor",
    index: "03",
    name: "Tutor",
    glyph: "circle",
    summary: "Ask about the note that's open.",
    headline: "Ask better questions.",
    lede: "Ask the tutor about the note in front of you. Explanations stay grounded in the material you are studying, so the answer matches your course's notation and scope.",
    media: { src: "/media/tutor.gif", alt: "Asking the study tutor about the open note" },
    specs: [
      { label: "Context", value: "The open note" },
      { label: "Providers", value: "Claude Code · Codex · OpenRouter" },
      { label: "Auth", value: "CLI login or API key" },
      { label: "Keys", value: "Kept in the main process" },
    ],
    steps: [
      { title: "Open", body: "Open a note. The tutor reads it as context." },
      { title: "Ask", body: "Ask for a derivation, an analogy, or a check of your reasoning." },
      { title: "Keep", body: "Copy the parts worth keeping into your note, in your own words." },
    ],
    details: [
      { title: "Bring your own model", body: "Use the Claude Code or Codex CLI you are already logged in to, or an OpenRouter key." },
      { title: "Scoped", body: "Answers are anchored to the note, which keeps explanations from drifting off-syllabus." },
      { title: "Private by default", body: "API keys never reach the renderer. They stay in Electron's main process." },
    ],
  },
  {
    slug: "review",
    index: "04",
    name: "Review",
    glyph: "half",
    summary: "Flashcards with spaced repetition.",
    headline: "Make it stick.",
    lede: "Turn notes into flashcards and review them on a schedule. Concrete uses the FSRS algorithm to space each card based on how well you remembered it last time.",
    specs: [
      { label: "Scheduler", value: "FSRS" },
      { label: "Ratings", value: "Again · Hard · Good · Easy" },
      { label: "Cards", value: "Created from notes" },
      { label: "Decks", value: "By folder, tag, or note" },
    ],
    steps: [
      { title: "Create", body: "Generate cards from a note, or write them yourself in the card editor." },
      { title: "Review", body: "Each day, review only the cards that are due." },
      { title: "Rate", body: "Rate your recall. FSRS updates the card's stability and picks the next interval." },
    ],
    details: [
      { title: "Modern scheduling", body: "FSRS models memory stability and difficulty per card, so you do fewer reviews to reach the same retention." },
      { title: "Cards live with notes", body: "Each card stays linked to its source note, so the context is always one click away." },
      { title: "Quiz or review", body: "Switch between quiz mode and flashcard review from the same panel." },
    ],
  },
  {
    slug: "agents",
    index: "05",
    name: "Agents",
    glyph: "cc",
    summary: "Codex or Claude agents that work in your vault.",
    headline: "Delegate the busywork.",
    lede: "Connect a Codex or Claude agent that can inspect and edit vault files, generate learning materials, change themes, and report progress live while it works.",
    specs: [
      { label: "Agents", value: "Claude Code · Codex" },
      { label: "Scope", value: "Your vault" },
      { label: "Progress", value: "Streamed live" },
      { label: "Logs", value: "JSONL trajectories" },
    ],
    steps: [
      { title: "Ask", body: "Describe the task, e.g. restructure a chapter or draft cards for a lecture." },
      { title: "Watch", body: "The agent reads and edits files while reporting each step live." },
      { title: "Review", body: "Your vault is plain files, so every change is easy to inspect or revert." },
    ],
    details: [
      { title: "Works on files", body: "Agents operate on the same Markdown you edit, with no hidden database to fall out of sync." },
      { title: "Local trajectories", body: "Agent runs are saved as JSONL in ~/Documents/Concrete/agent-trajectories/, outside the vault view." },
      { title: "Research-ready", body: "Trajectories are kept for later analysis and possible fine-tuning. They stay on your machine." },
    ],
  },
  {
    slug: "sandbox",
    index: "06",
    name: "Sandbox",
    glyph: "quarter",
    summary: "Run code snippets right inside a note.",
    headline: "Run the example.",
    lede: "Run supported Python and JavaScript snippets in an isolated sandbox while you study. Output appears in the editor, under the code, and is not saved unless you want it.",
    specs: [
      { label: "Languages", value: "Python · JavaScript · TypeScript" },
      { label: "Runners", value: "Docker or Daytona" },
      { label: "Output", value: "Inline, not persisted" },
      { label: "Setup", value: "Pick a runner in Settings" },
    ],
    steps: [
      { title: "Write", body: "Put a fenced code block in any note." },
      { title: "Run", body: "Run it. The code executes in an isolated container, locally with Docker or remotely on Daytona." },
      { title: "Iterate", body: "Change a parameter, run it again, and compare." },
    ],
    details: [
      { title: "Safe by design", body: "Snippets run in a container, away from your files and system, so a bad loop can't hurt anything." },
      { title: "Clean notes", body: "Outputs aren't written to disk automatically, so your Markdown stays readable." },
      { title: "Pluggable runners", body: "Runners are pluggable. Docker and Daytona ship today, and more backends can be added." },
    ],
  },
  {
    slug: "progress",
    index: "07",
    name: "Progress",
    glyph: "bars",
    summary: "Scores, skills, and streaks over time.",
    headline: "See it build.",
    lede: "After a quiz, see your score, a breakdown by skill, and recent activity. Over weeks, the history shows which topics are solid and which need another pass.",
    media: { src: "/media/progress.gif", alt: "Learning progress after finishing a quiz" },
    specs: [
      { label: "Per quiz", value: "Score + skill breakdown" },
      { label: "Over time", value: "Trends + streaks" },
      { label: "Activity", value: "Daily history" },
      { label: "Data", value: "Local to your Mac" },
    ],
    steps: [
      { title: "Finish", body: "Complete a quiz or a review session." },
      { title: "Inspect", body: "See which skills held up and which didn't." },
      { title: "Return", body: "Go back to the notes behind your weakest skills." },
    ],
    details: [
      { title: "Skill-level", body: "Questions are tagged by skill, so a 70% score tells you exactly what the missing 30% was." },
      { title: "Streaks", body: "A small daily habit adds up. The streak counter keeps it visible." },
      { title: "Evolving", body: "Learning analytics are under active development. Expect this view to grow." },
    ],
  },
];

export function getFeature(slug: FeatureSlug): Feature {
  const feature = FEATURES.find((f) => f.slug === slug);
  if (!feature) throw new Error(`Unknown feature: ${slug}`);
  return feature;
}

export function nextFeature(slug: FeatureSlug): Feature {
  const i = FEATURES.findIndex((f) => f.slug === slug);
  return FEATURES[(i + 1) % FEATURES.length];
}

export const SITE = {
  name: "Concrete",
  tagline: "A local-first Markdown workspace for learning STEM.",
  github: "https://github.com/danielgraviet/concrete",
  issues: "https://github.com/danielgraviet/concrete/issues/new",
  version: "0.1.2",
};
