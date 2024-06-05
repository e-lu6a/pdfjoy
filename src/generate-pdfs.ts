export function makePDF(
  doc: PDFKit.PDFDocument,
  pages: number,
  colors?: string[]
) {
  if (colors === undefined || colors.length === 0) {
    while (pages > 0) {
      doc.addPage();
      pages--;
    }
  } else {
    // if there is only 1 color, we create a "gradient" using the single color
    if (colors.length === 1) {
      colors = colors.concat(colors[0]);
    }

    const numInputColors = colors.length;
    const numSegments = numInputColors - 1;

    // we create a large gradient that conceptually spans all colors
    // across all pages, then "move" it so that only the relevant portion
    // fills any given page
    for (let i = 0; i < pages; i++) {
      doc.addPage();
      const x = doc.page.width / 2;
      const yOffset = i * doc.page.height;

      const gradient = doc.linearGradient(
        x,
        0 - yOffset,
        x,
        doc.page.height * pages - yOffset
      );

      for (let i = 0; i < numInputColors; i++) {
        const stop = (1 / numSegments) * i;
        gradient.stop(stop, "#" + colors[i]);
      }

      doc.rect(0, 0, doc.page.width, doc.page.height);
      doc.fill(gradient);
    }
  }
}

// originally thought i'd manually interpolate the in-between colors
// function getInterpolatedColor(
//   startColor: string,
//   endColor: string,
//   distance: number
// ): string {
//   if (distance > 1 || startColor.length !== 6 || endColor.length !== 6) {
//     throw new Error(
//       "problem interpolating color; please check your input values"
//     );
//   }

//   const start = getRGBvalues(startColor);
//   const end = getRGBvalues(endColor);

//   const r = [start.r, end.r];
//   const g = [start.g, end.g];
//   const b = [start.b, end.b];

//   r[2] = (r[1] - r[0]) * distance + r[0];
//   g[2] = (g[1] - g[0]) * distance + g[0];
//   b[2] = (b[1] - b[0]) * distance + b[0];

//   return r[2].toString(16) + g[2].toString(16) + b[2].toString(16);
// }

// function getRGBvalues(hexColor: string): {
//   r: number;
//   g: number;
//   b: number;
// } {
//   if (hexColor.length !== 6) {
//     throw new Error("please check your hex color code");
//   }

//   return {
//     r: parseInt(hexColor.slice(0, 2), 16),
//     g: parseInt(hexColor.slice(2, 4), 16),
//     b: parseInt(hexColor.slice(4), 16),
//   };
// }
