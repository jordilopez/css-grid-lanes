export interface ExampleConfig {
  /** Matches the radio input id (`ex-${id}`) the picker CSS relies on. */
  id: string;
  /** Short label for the picker pill. */
  label: string;
  /** Section heading shown when selected. */
  title: string;
  /** Explanation shown when selected. */
  description: string;
  /** CSS snippet shown when selected. */
  code: string;
}

export const EXAMPLES: ExampleConfig[] = [
  {
    id: 'waterfall',
    label: 'Waterfall',
    title: 'Basic waterfall gallery',
    description:
      'The classic masonry layout in three lines of CSS. Each card flows into whichever lane gets it closest to the top — like cars in bumper-to-bumper traffic, always changing lanes to stay furthest ahead. No media queries, no JavaScript, works at every screen size.',
    code: `.lanes {
  display: grid-lanes;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1rem;
}`,
  },
  {
    id: 'varied',
    label: 'Varied lanes',
    title: 'Varying lane sizes',
    description:
      'Because lanes are defined with the full power of grid-template-columns, you can mix narrow and wide lanes — and keep the first and last lanes narrow no matter how many lanes the viewport creates.',
    code: `.lanes {
  display: grid-lanes;
  grid-template-columns:
    repeat(auto-fill, minmax(8rem, 1fr) minmax(16rem, 2fr))
    minmax(8rem, 1fr);
  gap: 1rem;
}`,
  },
  {
    id: 'spanning',
    label: 'Spanning',
    title: 'Spanning items',
    description:
      'Items can span multiple lanes with grid-column: span N — enabling asymmetric editorial designs. Here the lead story spans four lanes and the next seven teasers span two; everything else takes a single lane.',
    code: `.lanes {
  display: grid-lanes;
  grid-template-columns: repeat(auto-fill, minmax(20ch, 1fr));
}
.card--hero { grid-column: span 4; }
.card--wide { grid-column: span 2; }`,
  },
  {
    id: 'placement',
    label: 'Placement',
    title: 'Explicit placement',
    description:
      'You can still place items explicitly. The first card is pinned to the last two lanes — whatever their total number is — using a negative line number.',
    code: `.lanes {
  display: grid-lanes;
  grid-template-columns: repeat(auto-fill, minmax(24ch, 1fr));
}
.card--hero { grid-column: -3 / -1; }`,
  },
  {
    id: 'brick',
    label: 'Brick',
    title: 'Brick layout — lanes in the other direction',
    description:
      'Define lanes with grid-template-rows instead of grid-template-columns, and items flow left-to-right in a “brick” layout rather than top-to-bottom.',
    code: `.lanes {
  display: grid-lanes;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 1rem;
}`,
  },
  {
    id: 'tolerance',
    label: 'Tolerance',
    title: 'Flow tolerance',
    description:
      'flow-tolerance controls how picky the placement algorithm is. This view sets it to 15em — switch back to “Waterfall” (default 1em) and compare how the cards distribute: with a high tolerance, items keep their reading order and only change lanes for a real height difference.',
    code: `.lanes {
  display: grid-lanes;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  flow-tolerance: 15em;
}`,
  },
];
