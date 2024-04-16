import saveAs from 'file-saver';
import JSZip from 'jszip';

export const generateRandomHexColors = () => {
  const colors: string[] = [];
  for (let i = 0; i < 5; i++) {
    const randomColor =
      '#' +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, '0');
    colors.push(randomColor);
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
  const viewBoxRegex = /<svg[^>]*\sviewBox="([^"]*)"/;
  const match = svgString.match(viewBoxRegex);
  if (match) {
    const viewBoxValues = match[1].split(/\s+/);
    if (viewBoxValues.length >= 2) {
      return viewBoxValues.slice(-2).map((value) => parseInt(value, 10));
    }
  }
  return null;
};

export const generateAndSaveZip = (svg1: string, svg2: string) => {
  const zip = new JSZip();

  zip.file('team-symbol.svg', svg1);
  zip.file('team-symbol-with-name.svg', svg2);

  zip.generateAsync({ type: 'blob' }).then((content) => {
    saveAs(content, 'team-symbol.zip');
  });
};
