export const colors = {
  nouns: "#231f20",
  verbs: "#aa1f1c",
};

const nouns = `
cat
dog
`;
const verbs = `
run
`;

export const data = {
  nouns: nouns.trim(),
  verbs: verbs.trim(),
} satisfies Record<keyof typeof colors, string>;
