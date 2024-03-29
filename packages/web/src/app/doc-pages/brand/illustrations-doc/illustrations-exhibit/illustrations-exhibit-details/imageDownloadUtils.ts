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
  newSvgElement.classList.add(colorValue ?? '');

  // Scale up height and width for better image quality in PNG, does not affect SVG
  const viewBox = newSvgElement.getAttribute('viewBox');
  const width = 4 * Number(viewBox?.split(' ')[2]);
  const height = 4 * Number(viewBox?.split(' ')[3]);
  newSvgElement.setAttribute('width', width.toString());
  newSvgElement.setAttribute('height', height.toString());

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
