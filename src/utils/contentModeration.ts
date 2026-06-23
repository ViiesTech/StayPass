const OBJECTIONABLE_TERMS = [
  'abuse',
  'harass',
  'harassment',
  'hate',
  'hateful',
  'kill',
  'porn',
  'nude',
  'nudity',
  'scam',
  'spam',
  'terror',
  'threat',
  'violence',
  'violent',
];

const normalizeText = (value = '') =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

export const containsObjectionableContent = (value = '') => {
  const normalized = normalizeText(value);

  if (!normalized) {
    return false;
  }

  return OBJECTIONABLE_TERMS.some(term =>
    new RegExp(`\\b${term}\\b`, 'i').test(normalized),
  );
};

export const objectionableContentMessage =
  'This content appears to violate StayPass community guidelines. Please remove abusive, sexual, violent, spam, or hateful language before posting.';
