import { IllustrationColor } from '../../illustrations-data';

export const createSvgBlobFromElement = (
  illustrationElement: Element,
  colorValue: IllustrationColor | undefined,
) => {
  const svgElement = illustrationElement?.shadowRoot?.querySelector('svg');
  const styleElement = illustrationElement?.shadowRoot?.querySelector('style');
  if (!styleElement || !svgElement) {
    console.error('No SVG or style element found');
    return '';
  }

  const newSvgElement = svgElement.cloneNode(true) as SVGElement;
  newSvgElement.insertBefore(styleElement.cloneNode(true), newSvgElement.firstChild);
  newSvgElement.classList.add(colorValue || '');

  const svgString = new XMLSerializer().serializeToString(newSvgElement);
  const blob = new Blob([svgString], { type: 'image/svg+xml' });
  return URL.createObjectURL(blob);
};

export const createPngBlob = (
  illustrationElement: Element,
  colorValue: IllustrationColor | undefined,
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const svgBlobUrl = createSvgBlobFromElement(illustrationElement, colorValue);

    if (!svgBlobUrl) {
      console.error('No SVG blob url found');
      reject(new Error('No SVG blob url found'));
    }

    const img = new Image();
    img.src = svgBlobUrl;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        console.error('Could not get 2d context');
        reject(new Error('Could not get 2d context'));
        return;
      }
      canvas.width = 8 * img.width;
      canvas.height = 8 * img.height;
      ctx.drawImage(img, 0, 0);

      canvas.toBlob((blob) => {
        if (!blob) {
          console.error('Could not create blob');
          reject(new Error('Could not create blob'));
          return;
        }

        resolve(URL.createObjectURL(blob));
      });
    };
  });
};
