// =============================================================================
// ABOVE ATLAS — Brand Constants
// =============================================================================
// Track names are exported as single constants. Do not hardcode these strings
// anywhere else in the codebase.

export const DOCTOR_TRACK_NAME = "Above Atlas for Doctors";
export const STUDENT_TRACK_NAME = "Above Atlas for Students";

export const DOCTOR_SUBTITLE = "Your Practice Will Never Outgrow Your Identity";
export const STUDENT_SUBTITLE = "From Student Mode to Doctor Mode";

// Internal phase names — these appear inside the member area ONLY.
// They MUST NOT appear on sales pages, ads, or any public marketing copy.
// Marketing components must not import these constants.
export const PHASES = [
  { number: 1, name: "You're the Problem", weeks: "1–3" },
  { number: 2, name: "Pick a Side", weeks: "4–6" },
  { number: 3, name: "Open Your Mouth", weeks: "7–9" },
  { number: 4, name: "Don't Go Back", weeks: "10–12" },
] as const;

// Brand colors — NO orange (#E8561A) anywhere in Above Atlas
export const AA_INK = "#101010";
export const AA_NAVY = "#12213A";
export const AA_CREAM = "#F2EDE4";

// Event naming
export const DOCTOR_EVENT_NAME = "Above Atlas Intensive";
export const STUDENT_EVENT_NAME = "Above Atlas Workshop";
// "seminar" is banned. Use Intensive (doctors) or Workshop (students).
