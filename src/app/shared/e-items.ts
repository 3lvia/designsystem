import { EItems } from './e-items.interface';
import { Pages } from './pages.enum';
import { ItemStatus } from './item-status.enum';

export const eHomes: EItems[] = [
    {
        title: 'New project',
        description: 'Guidance on how to use, and implementation of Elvia Designsystem.',
        docUrl: Pages.NewProject,
        absolutePath: '/utilities/new-project-doc',
        actionText: 'Get started',
    },
    {
        title: 'Components',
        description: 'Explore components that are available in Elvia Designsystem.',
        docUrl: Pages.OverviewComp,
        absolutePath: '/components/overview-comp-doc',
        actionText: 'View components',
    },
    {
        title: 'Contribute',
        description: 'Guidance on how to contribute to Elvia Designsystem.',
        docUrl: Pages.Contribute,
        absolutePath: '/utilities/contribute',
        actionText: 'Start contributing',
    },
    {
        title: 'Discussion',
        description: 'Report a bug? Request a new feauture?',
        externalUrl: 'https://github.com/hafslundnett/elvia-designsystem/issues/new/choose',
        actionText: 'Give feedback',
    },
    {
        title: 'Changelog',
        description: 'Overview og major and minor changes to Elvis',
        externalUrl: 'https://github.com/hafslundnett/elvia-designsystem/blob/master/CHANGELOG.md',
        actionText: 'View changelog',
    },
    // {
    //     title: 'Templates',
    //     description: 'Page template and starte templates for new projects?',
    //     docUrl: Pages.Template,
    //     absolutePath: '/utilities/template-doc',
    //     actionText: 'View templates',
    // },
];

export const eComponents: EItems[] = [
    {
        title: 'Autocomplete',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Autocomplete,
        status: ItemStatus.New,
        actionText: 'View component',
        externalUrl: 'https://www.figma.com/file/0hCktnFvRvSHVDntaaOSEu/Inputs?node-id=1332%3A231'
    },
    {
        title: 'Button',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Button,
        status: ItemStatus.Done,
        actionText: 'View component',
        externalUrl: 'https://www.figma.com/file/KtmjuJ1UVpS5pLFrcZK2uJ/Buttons'
    },
    {
        title: 'Card',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Card,
        status: ItemStatus.Done,
        actionText: 'View component',
        externalUrl: 'https://www.figma.com/file/BGZQp24T3is2F2YbN8mIYO/Card'
    },
    {
        title: 'Checkbox',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Checkbox,
        status: ItemStatus.Done,
        actionText: 'View component',
        externalUrl: 'https://www.figma.com/file/0hCktnFvRvSHVDntaaOSEu/Inputs'
    },
    {
        title: 'Dropdown',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Select, // Dette må endres
        status: ItemStatus.Coming,
        actionText: 'View component',
    },
    {
        title: 'Toggle',
        description: 'Some useful component with amazing features',
        docUrl: Pages.CheckboxToggle,
        status: ItemStatus.Coming,
        actionText: 'View component',
        externalUrl: 'https://www.figma.com/file/KtmjuJ1UVpS5pLFrcZK2uJ/Buttons'
    },
    {
        title: 'Date/Time Picker',
        description: 'Some useful component with amazing features',
        docUrl: Pages.DateTimePicker,
        status: ItemStatus.New,
        actionText: 'View component',
        externalUrl: 'https://www.figma.com/file/0hCktnFvRvSHVDntaaOSEu/Inputs?node-id=2193%3A468'
    },
    {
        title: 'Drag&Drop',
        description: 'Some useful component with amazing features',
        docUrl: Pages.DragAndDrop,
        status: ItemStatus.New,
        actionText: 'View component',
        externalUrl: 'https://www.figma.com/file/0hCktnFvRvSHVDntaaOSEu/Inputs'
    },
    {
        title: 'File Upload',
        description: 'Some useful component with amazing features',
        docUrl: Pages.FileUpload,
        status: ItemStatus.New,
        actionText: 'View component',
        externalUrl: 'https://www.figma.com/file/0hCktnFvRvSHVDntaaOSEu/Inputs?node-id=1404%3A132'
    },
    {
        title: 'Input',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Input,
        status: ItemStatus.Done,
        actionText: 'View component',
        externalUrl: 'https://www.figma.com/file/0hCktnFvRvSHVDntaaOSEu/Inputs'
    },
    {
        title: 'Label',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Label,
        status: ItemStatus.Done,
        actionText: 'View component',
        externalUrl: 'https://www.figma.com/file/B898GK3p5YqOj4cMBztM37/Labels-%26-chips?node-id=0%3A1'
    },
    {
        title: 'Link',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Link,
        status: ItemStatus.Done,
        actionText: 'View component',
        externalUrl: 'https://www.figma.com/file/sgrg5TId3ewAFznKBFh2Wb/Links',
    },
    {
        title: 'List',
        description: 'Some useful component with amazing features',
        docUrl: Pages.List,
        status: ItemStatus.Done,
        actionText: 'View component',
        externalUrl: 'https://www.figma.com/file/uT9r54Z9NP5JQXxRvZ4LBV/Modules%3A-article?node-id=353%3A0'
    },
    {
        title: 'Modal',
        description: 'An overlay that talks to the user',
        docUrl: Pages.Modal,
        status: ItemStatus.New,
        actionText: 'View modal',
        externalUrl: 'https://www.figma.com/file/unlDZ5F7svra9dPNKYdTK9/Modal?node-id=0%3A1'
    },
    {
        title: 'Progressbar',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Progressbar,
        status: ItemStatus.Done,
        actionText: 'View component',
        externalUrl: 'https://www.figma.com/file/0hCktnFvRvSHVDntaaOSEu/Inputs'
    },
    {
        title: 'Popover',
        description: 'An overlay that positions itself relative to an anchor element',
        docUrl: Pages.Popover,
        status: ItemStatus.New,
        actionText: 'View component',
        externalUrl: 'https://www.figma.com/file/9dvKKozGL4AEU0mSkN40Ul/Popover'
    },
    {
        title: 'Position Picker',
        description: 'Some useful component with amazing features',
        docUrl: Pages.PositionPicker,
        status: ItemStatus.New,
        actionText: 'View component',
        externalUrl: 'https://www.figma.com/file/0hCktnFvRvSHVDntaaOSEu/Inputs?node-id=1404%3A132'
    },
    {
        title: 'Radiobutton',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Radiobutton,
        status: ItemStatus.New,
        actionText: 'View component',
        externalUrl: 'https://www.figma.com/file/0hCktnFvRvSHVDntaaOSEu/Inputs?node-id=1283%3A70'
    },
    {
        title: 'Segmented Control',
        description: 'Some useful component with amazing features',
        docUrl: Pages.SegmentedControl,
        status: ItemStatus.Done,
        actionText: 'View component',
        externalUrl: 'https://www.figma.com/file/0hCktnFvRvSHVDntaaOSEu/Inputs'
    },
    {
        title: 'Table',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Table,
        status: ItemStatus.Done,
        actionText: 'View component',
        externalUrl: 'https://www.figma.com/file/gh5MaG2NWKVODTk1p3cO6s/Tables?node-id=0%3A1'
    },
    {
        title: 'Chips',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Tags, // Dette må endres
        status: ItemStatus.Coming,
        actionText: 'View component',
    },
    {
        title: 'Tooltip',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Tooltip,
        status: ItemStatus.Coming,
        actionText: 'View component',
    }
];

export const eUtilities: EItems[] = [
    {
        title: 'New project',
        description: 'Guidance on how to use, and implementation of Elvia Designsystem.',
        docUrl: Pages.NewProject,
        status: ItemStatus.Done,
        actionText: 'Get started',
    },
    {
        title: 'Contribute',
        description: 'Guidance on how to contribute to Elvia Designsystem.',
        docUrl: Pages.Contribute,
        status: ItemStatus.New,
        actionText: 'Start contributing',
    },
    // {
    //     title: 'Border',
    //     description: 'Some useful component with amazing features',
    //     docUrl: Pages.Border,
    //     actionText: 'View utility',
    // },
    // {
    //     title: 'Templates',
    //     description: 'Page template and starte templates for new projects?',
    //     docUrl: Pages.Template,
    //     actionText: 'View templates',
    // },
    {
        title: 'Colors',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Color,
        status: ItemStatus.Done,
        actionText: 'View colors',
        externalUrl: 'https://www.figma.com/file/Q4bR2dykeg5bSC2VGPZRAL/Colours?node-id=192%3A4'
    },
    {
        title: 'Shadow',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Shadow,
        status: ItemStatus.Done,
        actionText: 'View utility',
        externalUrl: 'https://www.figma.com/file/E2yRkpqSSuRnq8RDXO4Mly/Shadow'
    },
    {
        title: 'Spacing',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Spacing,
        status: ItemStatus.Done,
        actionText: 'View spacing',
        externalUrl: 'https://www.figma.com/file/FvsJlYXAIXS5IVKzZzMYgT/Spacing'
    },
    {
        title: 'Icons',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Icon,
        status: ItemStatus.Done,
        actionText: 'View icons',
        externalUrl: 'https://www.figma.com/file/0RM10vUNKdYVlW5BuXwqQK/Icons?node-id=82%3A2'
    },
    {
        title: 'Typography',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Typography,
        status: ItemStatus.Done,
        actionText: 'View typography',
        externalUrl: 'https://www.figma.com/file/hvQucRpSHYZtSiIKM7NgBo/Typography'
    },
    {
        title: 'Breakpoints',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Breakpoints,
        status: ItemStatus.Done,
        actionText: 'View breakpoints',
        externalUrl: 'https://www.figma.com/file/fMr1lhboPukTxmH9KruWB2/Grid'
    },
    {
        title: 'Grid',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Grid,
        status: ItemStatus.Done,
        actionText: 'View grid',
        externalUrl: 'https://www.figma.com/file/fMr1lhboPukTxmH9KruWB2/Grid'
    },
    {
        title: 'Logo',
        description: 'Our logo and how to use it correctly',
        docUrl: Pages.Logo,
        status: ItemStatus.Done,
        actionText: 'View logo',
        externalUrl: 'https://www.figma.com/file/SDUCEPhQu0q602oh2uhvKZ/Logo'
    },
    {
        title: 'Alignment',
        description: 'Alignment of text',
        docUrl: Pages.Alignment,
        status: ItemStatus.Done,
        actionText: 'View alignment'
    },
];

export const eAccessibility: EItems[] = [
    {
        title: 'Accessibility',
        description: 'Accessibility in Elvia Designsystem',
        docUrl: Pages.Accessibility,
        actionText: 'View requirements',
    },
    {
        title: 'Alt-texts',
        description: 'All meaningful images should have an alt-text (alternative text)',
        docUrl: Pages.AltText,
        actionText: 'View requirements',
    },
    {
        title: 'UU Tools',
        description: 'Useful UU tools',
        docUrl: Pages.UUTools,
        actionText: 'View tools',
    },
];

export function getComponent(docUrl: string): EItems {
    return eComponents.find(component => component.docUrl === docUrl);
}
export function getUtilities(docUrl: string): EItems {
    return eUtilities.find(component => component.docUrl === docUrl);
}
