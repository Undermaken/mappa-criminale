export const isStringNotNullishOrEmpty = (
  text: string | null | undefined
): text is string => (text?.trim().length ?? 0) > 0;
