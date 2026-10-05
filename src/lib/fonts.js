import localFont from "next/font/local";

/** WWF signature display font — headlines in uppercase per brand guidelines */
export const wwfFont = localFont({
  src: "../fonts/WWF_Font/WWF_Font/WWF.otf",
  variable: "--font-wwf",
  display: "swap",
  weight: "400",
  fallback: ["Arial Narrow", "Arial Black", "Arial", "sans-serif"],
});

/** Open Sans — subheads, UI, captions, charts; body copy on-screen */
export const openSans = localFont({
  src: [
    {
      path: "../fonts/Open_Sans/OpenSans-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/Open_Sans/OpenSans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Open_Sans/OpenSans-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../fonts/Open_Sans/OpenSans-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/Open_Sans/OpenSans-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/Open_Sans/OpenSans-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-opensans",
  display: "swap",
  fallback: ["Arial", "Helvetica", "sans-serif"],
});
