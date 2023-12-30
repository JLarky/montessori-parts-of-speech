export const colors = {
  nouns: "#231f20",
  verbs: "#aa1f1c",
  adjectives: "#593a18",
  adverbs: "#f26223",
  prepositions: "#3fae49",
  conjunctions: "#f2838b",
  pronouns: "#771d5e",
  articles: "#bd7c42",
};

const nouns = `
cat
dog
bird
fish
`;
const verbs = `
run
jump
swim
fly
`;
const adjectives = `
red
blue
green
yellow
`;
const adverbs = `
quickly
slowly
`;
const prepositions = `
in
on
under
above
`;
const conjunctions = `
and
but
or
`;
const pronouns = `
I
you
he
she
`;
const articles = `
a
an
the
`;

export const data = {
  nouns: nouns.trim(),
  verbs: verbs.trim(),
  adjectives: adjectives.trim(),
  adverbs: adverbs.trim(),
  prepositions: prepositions.trim(),
  conjunctions: conjunctions.trim(),
  pronouns: pronouns.trim(),
  articles: articles.trim(),
} satisfies Record<keyof typeof colors, string>;
