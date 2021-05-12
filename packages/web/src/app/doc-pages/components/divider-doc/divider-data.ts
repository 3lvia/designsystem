export const dividerData = {
	name: 'elvis-divider',
	elementNameW: 'elvia-divider',
	elementNameR: 'Divider',
	package: 'npm install @elvia/elvis-divider',
	attributes: {
		type: {
			isRequired: false,
			type: '"simple" | "title" | "curved"',
			description: 'A curved version of the divider, which follow the Elvia curve formula.',
			default: '"simple"',
			displayName: 'Types',
			cegDefault: 'simple',
			cegType: 'string',
			cegFormType: 'radio',
			cegOptions: ['simple', 'title', 'curved'],
		},
		title: {
			isRequired: false,
			type: 'string',
			description: 'Title displayed together with a divider',
			default: '"Title"',
			displayName: 'Title',
		},
		titleType: {
			isRequired: false,
			type: '“medium” | “caps”',
			description: 'Type of title',
			default: '“medium”',
			displayName: 'Title type',
			cegDefault: 'medium',
			cegType: 'string',
			cegFormType: 'radio',
			cegOptions: ['medium', 'caps'],
		},
	},
	codeImportReact: `import { Divider } from '@elvia/elvis-divider/react';`,
	codeImportWebComponent: `import '@elvia/elvis-divider';`,
	codeReact: `<Divider
></Divider>`,
	codeWebComponent: `<elvia-divider
></elvia-divider>`,
};
