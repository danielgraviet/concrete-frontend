type ChoiceQuestion = {
  kind: "choice";
  options: [string, string, string, string];
  correct: number | null;
};

type ClozeQuestion = { kind: "cloze"; solution: string };
type OpenQuestion = { kind: "open"; response: string };

export type PreviewQuestion = (ChoiceQuestion | ClozeQuestion | OpenQuestion) & {
  subject: string;
  prompt: string;
  sticker: string;
};

export const PREVIEW_QUESTIONS: PreviewQuestion[] = [
  {
    kind: "choice",
    subject: "Academic writing",
    prompt: "What is the main purpose of a thesis statement?",
    options: ["List your sources", "State the main argument", "Number the pages", "Give the essay a title"],
    correct: 1,
    sticker: "Always B?",
  },
  {
    kind: "choice",
    subject: "Academic writing",
    prompt: "Absences fell after later starts. Which thesis fits the data?",
    options: [
      "Later starts improve grades.",
      "Start times explain all absences.",
      "Later starts may improve attendance.",
      "Later starts improve sleep quality.",
    ],
    correct: 2,
    sticker: "Tests reasoning",
  },
  {
    kind: "choice",
    subject: "Business",
    prompt: "What is profit?",
    options: [
      "Sales",
      "The amount left after subtracting total costs from total revenue",
      "Inventory",
      "Rent",
    ],
    correct: 1,
    sticker: "Longest answer?",
  },
  {
    kind: "cloze",
    subject: "Business",
    prompt: "A shop earns $800 in sales and incurs $550 in costs. Its profit is $____.",
    solution: "250",
    sticker: "Recall it yourself",
  },
  {
    kind: "choice",
    subject: "Psychology",
    prompt: "Which variable was manipulated in the study above?",
    options: ["Sleep duration", "Caffeine dose", "Reaction time", "Age"],
    correct: null,
    sticker: "Missing context?",
  },
  {
    kind: "open",
    subject: "Psychology",
    prompt: "A researcher assigns different caffeine doses and measures reaction time. Which variable is independent, and why?",
    response: "The caffeine dose, because the researcher changes it.",
    sticker: "Grades your reasoning",
  },
  {
    kind: "choice",
    subject: "Biology",
    prompt: "Which organelle makes most of a cell’s ATP during aerobic respiration?",
    options: ["Nucleus", "Mitochondrion", "Lysosome", "Golgi apparatus"],
    correct: 1,
    sticker: "B again?",
  },
  {
    kind: "choice",
    subject: "Biology",
    prompt: "ATP synthase stops working. Which process is directly disrupted?",
    options: ["Breaking down glucose", "Copying DNA", "Moving electrons", "Making ATP from ADP"],
    correct: 3,
    sticker: "Applies the concept",
  },
];
