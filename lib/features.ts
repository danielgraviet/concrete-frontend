export type FeatureSlug =
  | "quizzes"
  | "flashcards"
  | "progress"
  | "tutor"
  | "material"
  | "agents"
  | "sandbox";

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
  /** "core" features are the learning tools in the main nav; "extra" ones live in the footer. */
  group: "core" | "extra";
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
    slug: "quizzes",
    group: "core",
    index: "01",
    name: "Quizzes",
    glyph: "triangle",
    summary: "Exam-style questions from your own course material.",
    headline: "Practice like it counts.",
    lede: "Pick one or more notes, or a PDF and a page range, and generate a quiz from it. Answer multiple-choice, cloze, open-response, and code-reading questions, then see what held up.",
    media: { src: "/media/quiz.gif", alt: "Generating a quiz from a note and choosing an answer" },
    specs: [
      { label: "Question types", value: "MCQ · Cloze · Open · Code reading" },
      { label: "Sources", value: "Notes + PDFs, by page range" },
      { label: "Code questions", value: "Output · Bug · Complexity · Scale" },
      { label: "Saved as", value: "Files in your vault" },
    ],
    steps: [
      { title: "Select", body: "Choose the notes and PDFs to practice from. Narrow a PDF to the pages your exam covers." },
      { title: "Generate", body: "Concrete drafts questions grounded in that material: recall, explanation, and code reading." },
      { title: "Answer", body: "Take the quiz in the app. Open answers are scored against the key points a strong answer covers." },
    ],
    details: [
      { title: "Code reading, not just recall", body: "Predict the output, find the bug, state the complexity, or explain what happens as the input grows. When a code runner is set up, predicted outputs are checked by running the code." },
      { title: "Grounded in your material", body: "Questions come from your notes and PDFs, so they use your course's notation and stay inside its scope." },
      { title: "Yours to keep", body: "Quizzes are saved as files in your vault, so you can review, edit, and retake them as the exam gets closer." },
    ],
  },
  {
    slug: "flashcards",
    group: "core",
    index: "02",
    name: "Flashcards",
    glyph: "half",
    summary: "Recall cards in your notes, on a spaced schedule.",
    headline: "Make it stick.",
    lede: "Write recall cards right in your notes and review them in a spaced queue. Concrete schedules every card with FSRS, the algorithm Anki now uses by default.",
    specs: [
      { label: "Scheduler", value: "FSRS" },
      { label: "Cards", value: "Live in your notes" },
      { label: "Ratings", value: "Again · Hard · Good · Easy" },
      { label: "Decks", value: "By folder, tag, or note" },
    ],
    steps: [
      { title: "Write", body: "Add cards to a note as you study, or generate them from it." },
      { title: "Review", body: "Each day, review only the cards that are due." },
      { title: "Rate", body: "Rate your recall. FSRS updates the card and picks its next interval." },
    ],
    details: [
      { title: "Modern scheduling", body: "FSRS models how stable each memory is and how hard each card is, so you spend less time on what you already know." },
      { title: "Cards live with notes", body: "A card sits in the note it came from, so its context is always one click away." },
      { title: "Quiz or review", body: "Switch between quiz practice and flashcard review from the same panel." },
    ],
  },
  {
    slug: "progress",
    group: "core",
    index: "03",
    name: "Progress",
    glyph: "bars",
    summary: "Find weak spots while there's still time.",
    headline: "Find the gaps early.",
    lede: "After each quiz, see your score and a breakdown by skill. Over time, quiz history and trends show which topics are solid and which need another pass.",
    media: { src: "/media/progress.gif", alt: "Learning progress after finishing a quiz" },
    specs: [
      { label: "Per quiz", value: "Score + skill breakdown" },
      { label: "Over time", value: "History + trends" },
      { label: "Habit", value: "Streaks + daily activity" },
      { label: "Saved", value: "Every quiz result" },
    ],
    steps: [
      { title: "Finish", body: "Complete a quiz." },
      { title: "Inspect", body: "See which skills held up and which didn't." },
      { title: "Return", body: "Go back to the material behind your weakest skills, then quiz again." },
    ],
    details: [
      { title: "Skill-level", body: "A 70% score is more useful when you can see exactly what the missing 30% was." },
      { title: "Trends", body: "Quiz history shows whether a topic is actually improving, not just whether you studied it." },
      { title: "Evolving", body: "Learning analytics are under active development. Expect this view to grow." },
    ],
  },
  {
    slug: "tutor",
    group: "core",
    index: "04",
    name: "Tutor",
    glyph: "circle",
    summary: "Ask about the note you're studying.",
    headline: "Get unstuck.",
    lede: "Ask the tutor about the note in front of you. Explanations stay grounded in your material, so the answer matches your course's notation and scope.",
    media: { src: "/media/tutor.gif", alt: "Asking the study tutor about the open note" },
    specs: [
      { label: "Context", value: "The open note" },
      { label: "Runs on", value: "Your Claude or ChatGPT plan" },
      { label: "Or", value: "OpenRouter, pay per use" },
      { label: "Keys", value: "Kept in the main process" },
    ],
    steps: [
      { title: "Open", body: "Open a note. The tutor reads it as context." },
      { title: "Ask", body: "Ask for a derivation, an analogy, or a check of your reasoning." },
      { title: "Keep", body: "Copy the parts worth keeping into your note, in your own words." },
    ],
    details: [
      { title: "No new AI bill", body: "The tutor runs on the Claude or ChatGPT subscription you already pay for, through the Claude Code or Codex CLI. Or use OpenRouter and pay a few cents for a fast model." },
      { title: "Scoped", body: "Answers are anchored to the note, which keeps explanations from drifting off-syllabus." },
      { title: "Private by default", body: "API keys never reach the renderer. They stay in Electron's main process." },
    ],
  },
  {
    slug: "material",
    group: "core",
    index: "05",
    name: "Material",
    glyph: "square",
    summary: "Notes, math, code, and PDFs: the source for every quiz.",
    headline: "Bring what you have.",
    lede: "Concrete works from the course material you already have. Keep lecture notes, math, code, and PDFs together, organized by course. Everything you practice is generated from it.",
    media: { src: "/media/notes.gif", alt: "Browsing folders and editing a note in Concrete" },
    specs: [
      { label: "Formats", value: "Markdown · LaTeX · Code · PDF" },
      { label: "Organized", value: "One folder per course" },
      { label: "Links", value: "[[Wikilinks]] + backlinks" },
      { label: "Files", value: "Plain Markdown, no lock-in" },
    ],
    steps: [
      { title: "Collect", body: "Add lecture PDFs and write notes, with math, code, and checklists in place." },
      { title: "Organize", body: "One folder per course. Link related ideas with [[wikilinks]]." },
      { title: "Practice", body: "Select any of it as the source for a quiz or a set of flashcards." },
    ],
    details: [
      { title: "No lock-in", body: "Notes are ordinary Markdown files, so you can back them up, version them with git, or open them in another editor." },
      { title: "Connected", body: "Link related ideas with [[wikilinks]] and follow backlinks, so a course reads as one body of knowledge." },
      { title: "Built for technical material", body: "Math, code, and PDFs sit beside your prose, so one course lives in one place." },
    ],
  },
  {
    slug: "agents",
    group: "extra",
    index: "06",
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
      { title: "Every run logged", body: "Agent runs are saved as JSONL trajectories, outside the vault view, so you can see exactly what happened." },
      { title: "Research-ready", body: "Trajectories are kept for later analysis and possible fine-tuning." },
    ],
  },
  {
    slug: "sandbox",
    group: "extra",
    index: "07",
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
      { title: "Checks quiz answers", body: "The same runner executes predict-output quiz questions, so their answers come from real output." },
      { title: "Pluggable runners", body: "Runners are pluggable. Docker and Daytona ship today, and more backends can be added." },
    ],
  },
];

export const CORE = FEATURES.filter((f) => f.group === "core");
export const EXTRAS = FEATURES.filter((f) => f.group === "extra");

export function getFeature(slug: FeatureSlug): Feature {
  const feature = FEATURES.find((f) => f.slug === slug);
  if (!feature) throw new Error(`Unknown feature: ${slug}`);
  return feature;
}

/** Next page in reading order: core features loop, extras lead back to the first core one. */
export function nextFeature(slug: FeatureSlug): Feature {
  const i = CORE.findIndex((f) => f.slug === slug);
  return i === -1 ? CORE[0] : CORE[(i + 1) % CORE.length];
}

export const SITE = {
  name: "Concrete",
  tagline: "Practice from your own course material.",
  github: "https://github.com/danielgraviet/concrete",
  issues: "https://github.com/danielgraviet/concrete/issues/new",
  openIssues: "https://github.com/danielgraviet/concrete/issues",
  goodFirstIssues: "https://github.com/danielgraviet/concrete/labels/good%20first%20issue",
  contributing: "https://github.com/danielgraviet/concrete#contributing",
  learningVision: "https://github.com/danielgraviet/concrete/blob/main/docs/LEARNING_POLICY_VISION.md",
  version: "0.1.2",
  /** Update by hand as the project grows. */
  stats: { contributors: 6, stars: 4, forks: 5 },
};
