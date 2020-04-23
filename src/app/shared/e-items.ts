import { EItems } from './e-items.interface';
import { Pages } from './pages.enum';
import { ItemStatus } from './item-status.enum';

export const eHomes: EItems[] = [
    {
        title: 'New project',
        description: 'Guidance how to use, and implementation of Elvia Designsystem.',
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
    // {
    //     title: 'Contribute',
    //     description: 'Guidance to how to contribute to Elvia Designsystem.',
    //     docUrl: Pages.Contribute,
    //     absolutePath: '/utilities/contribute',
    //     actionText: 'Start contributing',
    // },
    {
        title: 'Discussion',
        description: 'Report a bug? Request a new feauture?',
        externalUrl: 'https://github.com/hafslundnett/elvia-designsystem/issues/new/choose',
        actionText: 'Give feedback',
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
        title: 'Alerts',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Feedback,
        status: ItemStatus.Coming,
        actionText: 'View component',
        externalUrl: 'https://www.figma.com/file/rxDEfFvqhgtlUWoEbJnGQW/Alert-message?node-id=0%3A1'
    },
    {
        title: 'Button',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Button,
        status: ItemStatus.New,
        actionText: 'View component',
        externalUrl: 'https://www.figma.com/file/KtmjuJ1UVpS5pLFrcZK2uJ/Buttons'
    },
    {
        title: 'Card',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Card,
        status: ItemStatus.Coming,
        actionText: 'View component',
    },
    {
        title: 'Checkbox',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Checkbox,
        status: ItemStatus.New,
        actionText: 'View component',
        externalUrl: 'https://www.figma.com/file/0hCktnFvRvSHVDntaaOSEu/Inputs'
    },
    {
        title: 'Toggle',
        description: 'Some useful component with amazing features',
        docUrl: Pages.CheckboxToggle,
        status: ItemStatus.New,
        actionText: 'View component',
        externalUrl: 'https://www.figma.com/file/KtmjuJ1UVpS5pLFrcZK2uJ/Buttons'
    },
    {
        title: 'Divider',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Divider,
        status: ItemStatus.Coming,
        actionText: 'View component',
    },
    {
        title: 'Dropdown',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Dropdown,
        status: ItemStatus.Coming,
        actionText: 'View component',
    },
    {
        title: 'File Upload',
        description: 'Some useful component with amazing features',
        docUrl: Pages.FileUpload,
        status: ItemStatus.Coming,
        actionText: 'View component',
    },
    {
        title: 'Header',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Header,
        status: ItemStatus.Coming,
        actionText: 'View component',
    },
    {
        title: 'Input',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Input,
        status: ItemStatus.New,
        actionText: 'View component',
        externalUrl: 'https://www.figma.com/file/0hCktnFvRvSHVDntaaOSEu/Inputs'
    },
    {
        title: 'Label',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Label,
        status: ItemStatus.New,
        actionText: 'View component',
    },
    {
        title: 'Link',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Link,
        status: ItemStatus.New,
        actionText: 'View component',
        externalUrl: 'https://www.figma.com/file/KtmjuJ1UVpS5pLFrcZK2uJ/Buttons',
    },
    {
        title: 'List',
        description: 'Some useful component with amazing features',
        docUrl: Pages.List,
        status: ItemStatus.New,
        actionText: 'View component',
        externalUrl: 'https://www.figma.com/file/uT9r54Z9NP5JQXxRvZ4LBV/Modules%3A-article?node-id=353%3A0'
    },
    {
        title: 'Progressbar',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Progressbar,
        status: ItemStatus.New,
        actionText: 'View component',
        externalUrl: 'https://www.figma.com/file/0hCktnFvRvSHVDntaaOSEu/Inputs'
    },
    // {
    //     title: 'Notification-Dot',
    //     description: 'Some useful component with amazing features',
    //     docUrl: Pages.Notification,
    //     status: ItemStatus.Coming,
    //     actionText: 'View component',
    // },
    {
        title: 'Radiobutton',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Radiobutton,
        status: ItemStatus.Coming,
        actionText: 'View component',
        externalUrl: 'https://www.figma.com/file/0hCktnFvRvSHVDntaaOSEu/Inputs'
    },
    {
        title: 'Segmented Control',
        description: 'Some useful component with amazing features',
        docUrl: Pages.SegmentedControl,
        status: ItemStatus.New,
        actionText: 'View component',
        externalUrl: 'https://www.figma.com/file/0hCktnFvRvSHVDntaaOSEu/Inputs'
    },
    {
        title: 'Select',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Select,
        status: ItemStatus.Coming,
        actionText: 'View component',
    },
    {
        title: 'Table',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Table,
        status: ItemStatus.New,
        actionText: 'View component',
        externalUrl: 'https://www.figma.com/file/gh5MaG2NWKVODTk1p3cO6s/Tables?node-id=0%3A1'
    },
    {
        title: 'Tags',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Tags,
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
        description: 'Guidance how to use, and implementation of Elvia Designsystem.',
        docUrl: Pages.NewProject,
        status: ItemStatus.Done,
        actionText: 'Get started',
    },
    // {
    //     title: 'Templates',
    //     description: 'Page template and starte templates for new projects?',
    //     docUrl: Pages.Template,
    //     actionText: 'View templates',
    // },
    // {
    //     title: 'Contribute',
    //     description: 'Guidance to how to contribute to Elvia Designsystem.',
    //     docUrl: Pages.Contribute,
    //     actionText: 'Start contributing',
    // },
    // {
    //     title: 'Border',
    //     description: 'Some useful component with amazing features',
    //     docUrl: Pages.Border,
    //     actionText: 'View utility',
    // },
    {
        title: 'Colors',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Color,
        status: ItemStatus.New,
        actionText: 'View colors',
        externalUrl: 'https://www.figma.com/file/Q4bR2dykeg5bSC2VGPZRAL/Colours?node-id=192%3A4'
    },
    {
        title: 'Shadow',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Shadow,
        status: ItemStatus.New,
        actionText: 'View utility',
        externalUrl: 'https://www.figma.com/file/E2yRkpqSSuRnq8RDXO4Mly/Shadow'
    },
    {
        title: 'Spacing',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Spacing,
        status: ItemStatus.New,
        actionText: 'View spacing',
        externalUrl: 'https://www.figma.com/file/FvsJlYXAIXS5IVKzZzMYgT/Spacing'
    },
    {
        title: 'Icons',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Icon,
        status: ItemStatus.Coming,
        actionText: 'View icons',
        externalUrl: 'https://www.figma.com/file/0RM10vUNKdYVlW5BuXwqQK/Icons?node-id=82%3A2'
    },
    {
        title: 'Typography',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Typography,
        status: ItemStatus.New,
        actionText: 'View typography',
        externalUrl: 'https://www.figma.com/file/hvQucRpSHYZtSiIKM7NgBo/Typography'
    },
    {
        title: 'Breakpoints',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Breakpoints,
        status: ItemStatus.New,
        actionText: 'View breakpoints',
        externalUrl: 'https://www.figma.com/file/fMr1lhboPukTxmH9KruWB2/Grid'
    },
    {
        title: 'Grid',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Grid,
        status: ItemStatus.New,
        actionText: 'View grid',
        externalUrl: 'https://www.figma.com/file/fMr1lhboPukTxmH9KruWB2/Grid'
    },
    {
        title: 'Logo',
        description: 'Our logo and how to use it correctly',
        docUrl: Pages.Logo,
        status: ItemStatus.New,
        actionText: 'View logo',
        externalUrl: 'https://www.figma.com/file/SDUCEPhQu0q602oh2uhvKZ/Logo'
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
