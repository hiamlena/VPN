import type { GeminiResponseSection } from '@types/gemini';

export const formatSections = (response: string): GeminiResponseSection[] => {
  const blocks = response.split(/\n(?=### )/).filter(Boolean);

  return blocks.map(block => {
    const [headingLine, ...rest] = block.replace(/^###\s*/, '').split('\n');
    const title = headingLine?.trim() ?? 'Раздел';
    const id = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');

    return {
      id,
      title,
      content: rest.join('\n').trim(),
    };
  });
};
