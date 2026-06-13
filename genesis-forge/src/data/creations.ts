/**
 * Featured creations — capability gallery, not a web-design portfolio.
 *
 * MEDIA: each item references an image by key. Real photography/renders are not
 * shipped with this repo — see `image` + `alt`. Until real assets are added, the
 * UI renders a labelled "spec plate" placeholder (see Creations.tsx) so the layout
 * is complete and obvious where to drop in photos. Replace by adding files to
 * /public/creations/ and setting `image` to e.g. "/creations/lattice-vessel.webp".
 */
export interface Creation {
  id: string;
  name: string;
  type: string;
  purpose: string;
  material: string;
  customization: string;
  story: string;
  image: string | null;   // null => render placeholder spec plate
  alt: string;
  accent: 'hot' | 'cool' | 'violet';
}

export const creations: Creation[] = [
  {
    id: 'lattice-vessel',
    name: 'Lattice Vessel',
    type: 'Decorative piece',
    purpose: 'Centerpiece / planter',
    material: 'Matte PLA, charcoal',
    customization: 'Lattice density & height to order',
    story:
      'A customer wanted a planter that looked like it had grown rather than been made. We tuned the lattice until the light moved through it the way they described.',
    image: null,
    alt: 'Charcoal 3D-printed vessel with an open lattice wall.',
    accent: 'hot',
  },
  {
    id: 'gearbox-bracket',
    name: 'Replacement Bracket',
    type: 'Functional part',
    purpose: 'Out-of-production mount',
    material: 'PETG, reinforced',
    customization: 'Reverse-modeled from a broken original',
    story:
      'The original snapped and the manufacturer was long gone. We rebuilt it from a photo and a few caliper measurements, then printed a stronger version.',
    image: null,
    alt: 'Reinforced 3D-printed mounting bracket with bolt holes.',
    accent: 'cool',
  },
  {
    id: 'topo-map',
    name: 'Topographic Relief',
    type: 'Custom keepsake',
    purpose: 'Personalized gift',
    material: 'Dual-tone PLA',
    customization: 'Any location, any coordinates',
    story:
      'Built from the coordinates of where two people met. The contour lines are pulled from real elevation data, then printed in two tones.',
    image: null,
    alt: 'Two-tone topographic relief map printed in layered contours.',
    accent: 'violet',
  },
  {
    id: 'display-stand',
    name: 'Retail Display Stand',
    type: 'Business product',
    purpose: 'In-store product display',
    material: 'PLA + brushed insert',
    customization: 'Branded, sized to the product',
    story:
      'A small shop needed a stand that fit one specific product perfectly. We made three iterations in a week until the fit and the angle were right.',
    image: null,
    alt: 'Branded retail display stand holding a product at an angle.',
    accent: 'hot',
  },
];
