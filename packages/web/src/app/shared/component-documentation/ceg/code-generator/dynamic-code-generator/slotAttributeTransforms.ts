interface AttributeTransform {
  from: string;
  to: string;
}

const attributesToTransformAfterDomParser: AttributeTransform[] = [
  { from: 'elvisfocusinitial=""', to: 'elvisFocusInitial' },
];

export const transformAttributesBackToOriginalSyntaxAfterDomParser = (dom: string): string => {
  let transformedDom = dom;
  attributesToTransformAfterDomParser.forEach((attribute) => {
    const regex = new RegExp(`${attribute.from}`, 'g');
    transformedDom = transformedDom.replace(regex, attribute.to);
  });

  return transformedDom;
};
