import iconStyleTokens from '@elvia/elvis-colors/dist/elvisIconVariables.css';
import illustrationStyleTokens from '@elvia/elvis-colors/dist/elvisIllustrationVariables.css';

import { IllustrationColor } from './illustrations-doc/illustrations-data';

interface Opts {
  colorValue?: IllustrationColor;
  theme?: 'light' | 'dark';
  styleElement?: HTMLStyleElement | null;
  tokens: 'icon' | 'illustration';
}

export const createSvgBlobFromElement = (incomingSvgElement: SVGElement, opts?: Opts) => {
  const svgElement = incomingSvgElement.cloneNode(true) as SVGElement;
  const styleElement = opts?.styleElement?.cloneNode(true) ?? document.createElement('style');

  if (opts?.theme === 'dark') {
    svgElement.classList.add('e-theme-dark');
    styleElement.textContent =
      styleElement.textContent + (opts.tokens === 'icon' ? iconStyleTokens : illustrationStyleTokens);
  }
  svgElement.insertBefore(styleElement, svgElement.firstChild);
  if (opts?.colorValue) {
    svgElement.classList.add(opts?.colorValue);
  }

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

export const createPngBlob = (svgElement: SVGElement, opts?: Opts): Promise<string> => {
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
