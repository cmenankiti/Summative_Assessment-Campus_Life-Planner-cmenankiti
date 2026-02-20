export const patterns = {
  title: /^\S(?:.*\S)?$/,
  duration: /^(0|[1-9]\d*)$/,
  tag: /^[A-Za-z]+(?:[ -][A-Za-z]+)*$/,
  date: /^\d{4}-\d{2}-\d{2}$/,
  // Advanced: Back-reference to detect repeated words
  repeatWords: /\b(\w+)\s+\1\b/
};

export function validate(name, value) {
  if (name === "repeatWords") return !patterns.repeatWords.test(value);
  return patterns[name].test(value);
}