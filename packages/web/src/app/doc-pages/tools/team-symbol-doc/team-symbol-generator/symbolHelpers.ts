import { ThemeName } from '@elvia/elvis-colors';
import saveAs from 'file-saver';
import JSZip from 'jszip';
import opentype from 'opentype.js';

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

export const createTeamSymbol = async (
  svgContent: string,
  theme: ThemeName,
  color?: string,
  teamName?: string,
) => {
  let circleRadius = 100;
  let svgTransform = '';

  const viewBoxValues = findLastTwoViewBoxValues(svgContent);
  const heightAndWidth = findHeightAndWidth(svgContent);

  if (heightAndWidth) {
    const [width, height] = heightAndWidth;
    circleRadius = Math.max(width, height);
    svgTransform = `translate(${circleRadius / 2}, ${circleRadius / 2})`;
  } else if (viewBoxValues) {
    const [width, height] = viewBoxValues;
    circleRadius = Math.max(width, height);
    svgTransform = `scale(0.5) translate(${circleRadius}, ${circleRadius})`;
  }

  const circleBackground = `
      <circle cx="${circleRadius}" cy="${circleRadius}" r="${circleRadius}" fill="${color ?? 'transparent'}" />
    `;

  if (teamName) {
    const fontSize = 44;
    const circleDiameter = 100;
    const margin = 16;

    const fallbackFontColor = theme === 'light' ? '#000000' : '#ededed';
    const textWidth = getTextElementWidth(`
        <text font-family="Red Hat Display" font-weight="900" font-size="${fontSize}">${teamName}</text>
      `);

    const totalWidth = circleDiameter + textWidth + 16;
    const symbolX = -(totalWidth / 2 - circleDiameter / 2);
    const textX = circleDiameter + margin;
    const textY = circleDiameter / 2 + fontSize / 2;

    const textPath = await textToPath(teamName, textX, textY, fontSize, fallbackFontColor);

    return `
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 ${totalWidth} ${circleDiameter}">
            <svg xmlns="http://www.w3.org/2000/svg" x="${symbolX}" viewBox="0 0 ${circleRadius * 2} ${circleRadius * 2}">
              ${circleBackground}
              <g transform="${svgTransform}">${svgContent}</g>
            </svg>
            ${textPath}
          </svg>
        `;
  }
  return `
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 ${circleRadius * 2} ${circleRadius * 2}">
        ${circleBackground}
        <g transform="${svgTransform}">${svgContent}</g>
      </svg>
    `;
};

const textToPath = async (
  text: string,
  x: number,
  y: number,
  fontSize: number,
  fallbackFontColor: string,
) => {
  const font = await opentype.load('assets/fonts/RedHatDisplay-Black.ttf');
  const path = font.getPath(text, x, y, fontSize);
  path.fill = `var(--e-color-text-1, ${fallbackFontColor})`;
  return path.toSVG(2);
};
