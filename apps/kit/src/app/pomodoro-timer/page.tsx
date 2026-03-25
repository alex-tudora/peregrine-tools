import { generateToolMetadata, generateToolPageStructuredData } from "@peregrine/seo";
import { ToolLayout } from "@peregrine/ui";
import { PomodoroTimerTool } from "./PomodoroTimerTool";

const toolName = "Pomodoro Timer — Focus Timer Online Free";
const description =
  "Free online Pomodoro timer to boost focus and productivity. 25-minute work sessions with short and long breaks. Browser notifications, audio alerts, and session tracking. No sign-up required.";
const keyword = "pomodoro timer";
const siteName = "Peregrine Kit";
const siteUrl = "https://peregrinekit.com";
const path = "/pomodoro-timer";

export const metadata = generateToolMetadata({
  toolName,
  description,
  keyword,
  siteName,
  siteUrl,
  path,
});

const howTo = [
  "Press Start to begin a 25-minute focus session",
  "Work on your task until the timer rings and a notification appears",
  "Take the short break (5 minutes) when prompted, then start the next session",
  "After four focus sessions, enjoy a longer 15-minute break to recharge",
];

const faqs = [
  {
    question: "What is the Pomodoro Technique?",
    answer:
      "The Pomodoro Technique is a time-management method developed by Francesco Cirillo in the late 1980s. It breaks work into focused intervals — traditionally 25 minutes — separated by short breaks. Each interval is called a 'pomodoro' (Italian for tomato), named after the tomato-shaped kitchen timer Cirillo used as a university student.",
  },
  {
    question: "Why are work sessions 25 minutes long?",
    answer:
      "Twenty-five minutes is long enough to make meaningful progress on a task but short enough to maintain intense focus without fatigue. Research on attention spans supports this range. However, the durations are customizable — some people prefer 50-minute sessions with 10-minute breaks once they build the habit.",
  },
  {
    question: "How do the breaks work?",
    answer:
      "After each 25-minute work session you take a 5-minute short break. After completing four work sessions (a full cycle), you earn a longer 15-minute break. Breaks are essential — they let your brain rest, consolidate information, and return to the next session refreshed.",
  },
  {
    question: "Will I get a notification when the timer ends?",
    answer:
      "Yes. When you first press Start, your browser will ask for notification permission. If you allow it, you will receive a desktop notification and an audio beep when each phase completes. Everything runs locally in your browser — no server or account needed.",
  },
  {
    question: "Does the timer track my sessions?",
    answer:
      "The timer counts how many focus sessions (pomodoros) you complete and displays them on screen. The count is stored in your browser's session storage, so it persists while the tab is open and resets when you close it. No data is sent to any server.",
  },
];

const schemas = generateToolPageStructuredData({
  toolName,
  description,
  keyword,
  url: `${siteUrl}${path}`,
  siteName,
  siteUrl,
  path,
  faqs,
  howTo,
});

export default function PomodoroTimerPage() {
  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <ToolLayout
        title={toolName}
        subtitle="Stay focused with timed work sessions and breaks. Start the timer and get things done."
        keyword={keyword}
        howTo={howTo}
        about={`
          <p>
            The <strong>Pomodoro Technique</strong> is one of the most popular and effective
            time-management methods in the world. Developed by Francesco Cirillo in the late 1980s,
            it uses a simple cycle of focused work intervals and short breaks to help you maintain
            concentration, avoid burnout, and accomplish more in less time.
          </p>
          <p>
            This free <strong>pomodoro timer</strong> runs entirely in your browser. It guides you
            through the classic cycle: 25 minutes of focused work, a 5-minute short break, and after
            four completed sessions, a 15-minute long break. A visual countdown ring, audio alert,
            and browser notification tell you exactly when each phase ends — so you can stay in the
            zone without watching the clock.
          </p>
          <p>
            All durations are fully customizable. Whether you prefer shorter sprints or longer deep-work
            blocks, you can adjust the focus, short break, and long break lengths to fit your workflow.
            Session counts are tracked on screen so you can see your daily progress at a glance. Because
            everything runs locally, your data stays private and there are no accounts, ads, or usage limits.
          </p>
        `}
        faqs={faqs}
        relatedTools={[
          { name: "Word Counter", href: "/word-counter" },
          { name: "Age Calculator", href: "/age-calculator" },
          { name: "Tip Calculator", href: "/tip-calculator" },
        ]}
        nextStep={{ label: "Count your words?", description: "Track word count and reading time for your writing", href: "/word-counter" }}
      >
        <PomodoroTimerTool />
      </ToolLayout>
    </>
  );
}
