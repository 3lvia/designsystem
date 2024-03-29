import { mkdir, rm, writeFile } from 'fs/promises';
import { series, task } from 'gulp';

import { ElviaTypography } from './src/elviaTypography';

const distFolder = './dist';
const WARNING = `// THIS FILE IS AUTOMATICALLY GENERATED AND WILL BE OVERWRITTEN.
// DO NOT MAKE CHANGES TO THIS FILE DIRECTLY.\n\n`;

const ScssPropertyEnum = {
  fontFamily: 'family',
  fontSize: 'size',
  fontSizeMobile: 'size-m',
  fontWeight: 'weight',
  lineHeight: 'height',
  lineHeightMobile: 'height-m',
  letterSpacing: 'letter-spacing',
  fontStyle: 'style',
  textTransform: 'transform',
  color: 'color',
  textAlign: 'align',
};

const camelCaseToKebabCase = (camel: string) => {
  return camel.replace(/([A-Z])/g, (match) => `-${match.toLowerCase()}`);
};

const generateElvisTypographyClass = (name: string, properties: Record<string, string | string[]>) => {
  let classContent = `.e-${name} {\n`;

  Object.entries(properties)
    .filter(
      ([property]) => !property.endsWith('Mobile') && property !== 'altLabels' && property !== 'deprecated',
    )
    .forEach(([property, value]) => {
      classContent += `\t${camelCaseToKebabCase(property)}: ${value};\n`;
    });

  classContent += `}\n`;

  const mobileProperties = Object.fromEntries(
    Object.entries(properties).filter(([key]) => key.endsWith('Mobile')),
  );

  if (Object.keys(mobileProperties).length > 0) {
    classContent += `@media (max-width: 767px) {\n`;
    classContent += `\t.e-${name} {\n`;

    Object.entries(mobileProperties).forEach(([property, value]) => {
      classContent += `\t\t${camelCaseToKebabCase(property.slice(0, -6))}: ${value};\n`;
    });

    classContent += `\t}\n`;
    classContent += `}\n`;
  }

  return classContent;
};

/**
 * Generates the typography SCSS that is exposed by this package.
 */
const generateElviaTypographyScss = async () => {
  let content = WARNING;
  Object.entries(ElviaTypography).forEach(([name, properties]) => {
    content += generateElvisTypographyClass(name, properties);
  });

  return writeFile(`${distFolder}/elviaTypography.scss`, content);
};

/**
 * Generates the typography SCSS used in Elvis.
 */
const generateElvisTypographyMapScss = async () => {
  let content = WARNING + `$typography: (\n`;
  const labels: { [name: string]: string } = {};

  // Typographies can have altLabels. First collect all typography labels including altLabels.
  // The alt label points to its parent typography.
  Object.entries(ElviaTypography).forEach(([name, properties]) => {
    labels[name] = name;
    if ('altLabels' in properties) {
      properties.altLabels.forEach((altLabel) => {
        labels[altLabel] = name;
      });
    }
  });

  Object.entries(labels).forEach(([label, typographyName]) => {
    const typography = ElviaTypography[typographyName as keyof typeof ElviaTypography];
    content += `\t${label}: (\n`;
    Object.entries(typography).forEach(([property, value]) => {
      if (property === 'altLabels' || property === 'deprecated') {
        return; // Do not include
      }
      content += `\t\t${ScssPropertyEnum[property as keyof typeof ScssPropertyEnum]}: #{${value}},\n`;
    });
    content += `),\n`;
  });
  content += `);`;
  return writeFile(`${distFolder}/typographyMap.scss`, content);
};

const generateElviaTypographyJson = async () => {
  return writeFile(`${distFolder}/elviaTypography.json`, JSON.stringify(ElviaTypography));
};

const cleanup = async () => rm(distFolder, { recursive: true, force: true });

const makeDistFolder = async () => mkdir(distFolder, { recursive: true });

task(
  'default',
  series(
    cleanup,
    makeDistFolder,
    generateElviaTypographyScss,
    generateElvisTypographyMapScss,
    generateElviaTypographyJson,
  ),
);
