const typographyConfig = require('./../src/config/typography.config');
const fs = require('fs');


// Creating typography.scss
async function createTypographyScss() {
  let content = `$typography: (`;

  for (let i = 0; i < typographyConfig.length; i++) {
    const properties = typographyConfig[i].properties;
    content += `
  ${typographyConfig[i].name}: (`;
    for (let j = 0; j < properties.length; j++) {
      if (properties[j].key === 'family') {
        content += `
    ${properties[j].key}: #{${properties[j].value},\n    sans-serif},`;
      } else {
        content += `
    ${properties[j].key}: #{${properties[j].value}},`;
      }
    }
    if (i < typographyConfig.length) {
      content += '\n  ),';
    } else {
      content += ')\n';
    }
  }
  content += '\n);';

  const template =
    `// THIS FILE IS GENERATED BY GULP, DO NOT CHANGE THIS TYPOGRAPHY LIST MANUALLY.
// MAKE CHANGES TO TYPOGRAPHY VARIABLES IN TYPOGRAPHY.TEMPLATE.SCSS and TYPOGRAPHY.CONFIG.JS

` + fs.readFileSync('./src/templates/typography.template.scss').toString();
  const newContent = template.replace('//[[INJECT_TYPOGRAPHY_VARIABLES]]', content);
  fs.writeFileSync('src/variables/typography.scss', newContent);

  return true;
}


exports.createTypographyScss = createTypographyScss;