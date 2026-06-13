import type { LucideIcon } from 'lucide-react';
import { Lightbulb, Hand, Repeat, ScanSearch, Boxes, Users } from 'lucide-react';

export interface Strength {
  icon: LucideIcon;
  title: string;
  body: string;
}

/** Trust built on real working principles — no invented stats, awards, or logos. */
export const strengths: Strength[] = [
  {
    icon: Lightbulb,
    title: 'Ideas don\u2019t need to start perfect',
    body: 'You don\u2019t need a model, the right words, or a finished concept. A rough start is a normal start.',
  },
  {
    icon: Hand,
    title: 'Individual attention',
    body: 'Every project is handled directly. We\u2019d rather understand one idea well than rush through ten.',
  },
  {
    icon: Repeat,
    title: 'Made to be refined',
    body: 'The first print is a conversation, not a verdict. We expect to adjust, and we build time for it in.',
  },
  {
    icon: ScanSearch,
    title: 'Details get inspected',
    body: 'Fit, finish, tolerance, and feel. The things you notice when you finally hold the object.',
  },
  {
    icon: Boxes,
    title: 'Small projects welcome',
    body: 'One-offs and short runs are the point, not an exception we tolerate. Bring the small stuff.',
  },
  {
    icon: Users,
    title: 'You\u2019re part of it',
    body: 'You see the direction, the prints, and the changes. Nothing important happens out of sight.',
  },
];
