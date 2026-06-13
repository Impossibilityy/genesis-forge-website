import type { LucideIcon } from 'lucide-react';
import { Sparkles, Wrench, FlaskConical, Building2 } from 'lucide-react';

export interface ServiceItem {
  label: string;
}

export interface ServiceCategory {
  id: string;
  stage: string;          // forge-stage marker (real sequence cue)
  title: string;
  icon: LucideIcon;
  summary: string;
  temperature: 'hot' | 'cool';
  items: ServiceItem[];
}

/**
 * Services framed as four intents a visitor arrives with — not a flat icon grid.
 * Each is understandable without hover.
 */
export const serviceCategories: ServiceCategory[] = [
  {
    id: 'create',
    stage: '01',
    title: 'Create something new',
    icon: Sparkles,
    temperature: 'hot',
    summary:
      'Something that doesn\u2019t exist yet \u2014 a personalized gift, a decorative piece, an object you\u2019ve only seen in your head.',
    items: [
      { label: 'Personalized products' },
      { label: 'Custom gifts' },
      { label: 'Decorative & display pieces' },
      { label: 'Original concepts' },
    ],
  },
  {
    id: 'solve',
    stage: '02',
    title: 'Solve a problem',
    icon: Wrench,
    temperature: 'cool',
    summary:
      'A part that broke, a thing that should exist but doesn\u2019t, a gap that needs filling. Bring the problem; we\u2019ll shape the fix.',
    items: [
      { label: 'Replacement parts' },
      { label: 'Holders & organizers' },
      { label: 'Brackets & fixtures' },
      { label: 'Functional objects' },
    ],
  },
  {
    id: 'develop',
    stage: '03',
    title: 'Develop an idea',
    icon: FlaskConical,
    temperature: 'cool',
    summary:
      'Turn a concept into something you can hold, test, and improve \u2014 then make a few, or a few hundred.',
    items: [
      { label: 'Prototypes' },
      { label: 'Product concepts' },
      { label: 'Test & fit pieces' },
      { label: 'Small production runs' },
    ],
  },
  {
    id: 'business',
    stage: '04',
    title: 'Build for business',
    icon: Building2,
    temperature: 'hot',
    summary:
      'Physical things your business needs \u2014 displays, branded objects, custom tools, and short-run products.',
    items: [
      { label: 'Retail & event displays' },
      { label: 'Branded items' },
      { label: 'Custom tools & jigs' },
      { label: 'Short-run products' },
    ],
  },
];
