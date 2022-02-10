// import original module declarations
import 'styled-components';
// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    borderRadius: number;
    color: {
      white: string;
    };
    siteWidth: number;
    spacing: Record<number, number>;
    breakpoints: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
    };
    topBarSize: number;
    font: {
      monospace: string;
    };
  }
}
