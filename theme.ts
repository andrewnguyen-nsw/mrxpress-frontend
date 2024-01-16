import { createTheme } from "@mantine/core";

export const theme = createTheme({
  colors: {
    'dark-gray': [
      '#7F97B7', // 50
      '#728CB0', // 100
      '#5A779F', // 200
      '#4B6385', // 300
      '#3C506B', // 400
      '#2E3C51', // 500
      '#1F2937', // 600
      '#0B0E13', // 700
      '#000000', // 800
      '#000000'  // 900
    ],
    'brown': [
      '#C6C3BF', // 50
      '#BCB9B5', // 100
      '#A9A59F', // 200
      '#96908A', // 300
      '#827C75', // 400
      '#6D6861', // 500
      '#57534E', // 600
      '#393733', // 700
      '#1C1B19', // 800
      '#000000'  // 900
    ],
  },

  primaryColor: "gray",
  primaryShade: 8,
  
  defaultRadius: "xs",

  fontFamily: "Roboto, sans-serif",

  components: {
    Button: {
      styles: {
        inner: {
          fontWeight: 500,
          color: "gray-9",
        }
      }
    }
  }
});
