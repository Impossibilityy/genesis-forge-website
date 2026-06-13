/**
 * Transformation showcase: input -> refined -> physical output.
 * Each stage is a short labelled phase; motion reveals progression but all
 * text is available without animation.
 */
export interface TransformStage {
  key: 'input' | 'geometry' | 'object';
  kicker: string;
  title: string;
  body: string;
}

export const transformStages: TransformStage[] = [
  {
    key: 'input',
    kicker: 'You bring',
    title: 'A rough idea',
    body: 'A photo of a broken clip, a sketch on a napkin, or just a description. The starting point is allowed to be messy.',
  },
  {
    key: 'geometry',
    kicker: 'We shape',
    title: 'Real geometry',
    body: 'It becomes a precise 3D model \u2014 measured, watertight, and tuned for how it\u2019ll actually be printed and used.',
  },
  {
    key: 'object',
    kicker: 'You receive',
    title: 'A finished object',
    body: 'Printed, tested, and refined until it fits your hand and your need. Something real, made from something half-formed.',
  },
];
