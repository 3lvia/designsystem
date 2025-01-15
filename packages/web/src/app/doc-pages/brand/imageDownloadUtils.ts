interface Opts {
  styleElement?: HTMLStyleElement | null;
}

export const createSvgBlobFromElement = (incomingSvgElement: SVGElement, opts?: Opts) => {
  let svgElement = incomingSvgElement.cloneNode(true) as SVGElement;

  const styleElement = opts?.styleElement?.cloneNode(true);
  if (styleElement) {
    svgElement.insertBefore(styleElement, svgElement.firstChild);
  }

  svgElement = replacePathFillCssVariablesWithHex(svgElement, incomingSvgElement);

  // Scale up height and width for better image quality in PNG, does not affect SVG
  const viewBox = svgElement.getAttribute('viewBox');
  const width = 4 * Number(viewBox?.split(' ')[2]);
  const height = 4 * Number(viewBox?.split(' ')[3]);
  svgElement.setAttribute('width', width.toString());
  svgElement.setAttribute('height', height.toString());

  const svgString = new XMLSerializer().serializeToString(svgElement);
  const blob = new Blob([svgString], { type: 'image/svg+xml' });
  return URL.createObjectURL(blob);
};

export const createPngBlobFromElement = (svgElement: SVGElement, opts?: Opts): Promise<string> => {
  return new Promise((resolve, reject) => {
    const svgBlobUrl = createSvgBlobFromElement(svgElement, opts);

    if (!svgBlobUrl) {
      reject(new Error('No SVG blob url found'));
    }

    const img = new Image();
    img.src = svgBlobUrl;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Could not get 2d context'));
        return;
      }
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.fillStyle = 'transparent';
      ctx.drawImage(img, 0, 0);

      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error('Could not create blob'));
          return;
        }

        resolve(URL.createObjectURL(blob));
      });
    };
  });
};

const replacePathFillCssVariablesWithHex = (svgElement: SVGElement, incomingSvgElement: SVGElement) => {
  const paths = svgElement.querySelectorAll('path, rect, circle');
  paths.forEach((path) => {
    const fill = path.getAttribute('fill');

    // Get the variable name from: var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))
    // @ts-expect-error TS2532 (LEGO-3683)
    const variableName = fill?.split(',')[0].split('(')[1];

    if (fill && variableName && fill.startsWith('var(--')) {
      // Need to use the original SVG element since the computed style is not available on the cloned (non-mounted) element
      // This ensures the color that is shown in the UI is the same as the downloaded image (e.g. dark mode, colored illustrations)
      const color = getComputedStyle(incomingSvgElement).getPropertyValue(variableName);
      if (color) {
        path.setAttribute('fill', color);
      }
    }
  });
  return svgElement;
};
