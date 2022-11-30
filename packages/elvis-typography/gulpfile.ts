import * as fs from 'fs';
import * as gulp from 'gulp';
import * as del from 'del';
import * as typescript from 'gulp-typescript';
import { ElviaTypography } from './src/elviaTypography';

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

const generateElvisTypographyClass = (name: string, properties: any) => {
  let classContent = `.e-${name} {\n`;

  for (const property in properties) {
    if (property === 'altLabels' || property === 'deprecated' || property.endsWith('Mobile')) {
      continue; // Do not include altLabels here
    } else {
      classContent += `\t${camelCaseToKebabCase(property)}: ${properties[property]};\n`;
    }
  }
  classContent += `}\n`;

  const mobileProperties = Object.fromEntries(
    Object.entries(properties).filter(([key]) => key.endsWith('Mobile')),
  );

  if (Object.keys(mobileProperties).length > 0) {
    classContent += `@media (max-width: 767px) {\n`;
    classContent += `\t.e-${name} {\n`;
    {
      for (const property in mobileProperties) {
        const value = mobileProperties[property];
        classContent += `\t\t${camelCaseToKebabCase(property.slice(0, -6))}: ${value};\n`;
      }
    }
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

  fs.writeFileSync('./dist/elviaTypography.scss', content);
  return true;
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
  fs.writeFileSync('./dist/typographyMap.scss', content);
  return true;
};

const generateElviaTypographyJson = async () => {
  const typographyJSON = JSON.stringify(ElviaTypography);
  fs.writeFileSync('./dist/elviaTypography.json', typographyJSON);
  return true;
};

const transpileElviaTypography = async () => {
  const tsProject = typescript.createProject('../components/tsconfig.json');
  return gulp.src('./src/elviaTypography.ts').pipe(tsProject()).pipe(gulp.dest('./dist/'));
};

function cleanup() {
  return del(['./dist/**/*'], { force: true });
}

const makeDistFolder = async () => {
  const dir = './dist';
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  return true;
};

gulp.task(
  'default',
  gulp.series(
    makeDistFolder,
    cleanup,
    generateElviaTypographyScss,
    generateElvisTypographyMapScss,
    generateElviaTypographyJson,
    transpileElviaTypography,
    function (done) {
      console.log('Elvis-typography - Successfully built Elvis-typography! ');
      done();
    },
  ),
);
