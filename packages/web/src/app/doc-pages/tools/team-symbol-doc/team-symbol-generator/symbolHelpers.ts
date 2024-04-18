import saveAs from 'file-saver';
import JSZip from 'jszip';

export const generateRandomColors = () => {
  const colors: string[] = [];
  for (let i = 0; i < 5; i++) {
    const hue = Math.floor(Math.random() * 360);
    const saturation = Math.floor(Math.random() * 21) + 70; // Saturation between 70 and 90
    const lightness = Math.floor(Math.random() * 18) + 72; // Lightness between 70 and 80

    const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    colors.push(color);
  }
  return colors;
};

export const getTextElementWidth = (textElementString: string): number => {
  // Create a temporary SVG element
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

  document.body.appendChild(svg);
  svg.innerHTML = textElementString;

  const textElement = svg.querySelector('text');

  if (textElement) {
    const bbox = textElement.getBBox();

    // Remove the temporary SVG element from the DOM
    svg.remove();

    return bbox.width;
  } else {
    svg.remove();
    return 0;
  }
};

export const findLastTwoViewBoxValues = (svgString: string): number[] | null => {
  const regex = /<svg[^>]*\sviewBox="([^"]*)"/;
  const match = regex.exec(svgString);
  if (match) {
    const viewBoxValues = match[1].split(/\s+/);
    if (viewBoxValues.length >= 2) {
      return viewBoxValues.slice(-2).map((value) => parseInt(value, 10));
    }
  }
  return null;
};

export const findHeightAndWidth = (svgString: string): number[] | null => {
  const regex = /width="([^"]+)"[\s\S]*?height="([^"]+)"/;
  const match = regex.exec(svgString);
  if (match) {
    const width = match[1];
    const height = match[2];
    if (!width.includes('%') && !height.includes('%')) {
      return [parseInt(width, 10), parseInt(height, 10)];
    }
  }
  return null;
};

export const generateAndSaveZip = (svg1: string, svg2: string) => {
  const zip = new JSZip();

  zip.file('team-symbol.svg', svg1);
  zip.file('team-symbol-with-name.svg', svg2);

  zip.generateAsync({ type: 'blob' }).then((content) => {
    saveAs(content, 'team-symbols.zip');
  });
};
