const theme = {
  borderRadius: 12,
  color: {
    white: '#ffffff',
  },
  siteWidth: 1200,
  spacing: {
    1: 4,
    2: 8,
    3: 16,
    4: 24,
    5: 32,
    6: 48,
    7: 64,
  },
  breakpoints: {
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
    xxl: '1400px',
  },
  topBarSize: 72,
  font: {
    monospace: `'Courier New', Courier, monospace`,
  },
};

export default theme;

export type BreakPoints = keyof typeof theme.breakpoints;

export const AllBreakpoints = Object.keys(theme.breakpoints) as BreakPoints[];

export const mediaQueries = (key: BreakPoints) => {
  return (style: TemplateStringsArray | string) =>
    `@media screen and (min-width: ${theme.breakpoints[key]}) { ${style} }`;
};
