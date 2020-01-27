import { theme as baseTheme } from "@chakra-ui/core";

// Let's say you want to add custom colors
export const theme = {
  ...baseTheme,
  colors: {
    ...baseTheme.colors,
    brand: {
      900: "#1a365d",
      800: "#153e75",
      700: "#2a69ac",
    },
  },
};
