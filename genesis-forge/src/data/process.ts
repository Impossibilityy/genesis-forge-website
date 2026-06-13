import type { LucideIcon } from 'lucide-react';
import { MessageSquare, Compass, PenTool, Layers, RefreshCw, Package } from 'lucide-react';

export interface ProcessStep {
  number: string;
  title: string;
  icon: LucideIcon;
  youBring: string;   // what the customer provides
  weHandle: string;   // what Genesis Forge does
}

/** A real, ordered sequence — the numbering encodes true order, not decoration. */
export const processSteps: ProcessStep[] = [
  {
    number: '1',
    title: 'Share the idea',
    icon: MessageSquare,
    youBring: 'A sketch, photo, broken part, or a few sentences.',
    weHandle: 'We ask the right questions and tell you what\u2019s possible.',
  },
  {
    number: '2',
    title: 'Explore the direction',
    icon: Compass,
    youBring: 'Your taste, references, and how it\u2019ll be used.',
    weHandle: 'We propose approaches, materials, and a rough scope.',
  },
  {
    number: '3',
    title: 'Prepare the design',
    icon: PenTool,
    youBring: 'Feedback on the direction you like best.',
    weHandle: 'We build or refine the 3D model and prep it for printing.',
  },
  {
    number: '4',
    title: 'Print & test',
    icon: Layers,
    youBring: 'A little patience for the first physical version.',
    weHandle: 'We print, check the fit, finish, and tolerances.',
  },
  {
    number: '5',
    title: 'Refine',
    icon: RefreshCw,
    youBring: 'Notes on what to adjust \u2014 nothing is final yet.',
    weHandle: 'We iterate until it\u2019s right, not just done.',
  },
  {
    number: '6',
    title: 'Deliver',
    icon: Package,
    youBring: 'Where to send it.',
    weHandle: 'We finish, pack, and hand over the real thing.',
  },
];
