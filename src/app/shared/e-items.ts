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
    {
        title: 'Contribute',
        description: 'Guidance to how to contribute to Elvia Designsystem.',
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
        title: 'Templates',
        description: 'Page template and starte templates for new projects?',
        docUrl: Pages.Template,
        absolutePath: '/utilities/template-doc',
        actionText: 'View templates',
    },
];

export const eComponents: EItems[] = [
    {
        title: 'Alerts',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Feedback,
        status: ItemStatus.Ignore,
        actionText: 'View component',
    },
    {
        title: 'Badge',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Badge,
        status: ItemStatus.New,
        actionText: 'View component',
    },
    {
        title: 'Button',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Button,
        status: ItemStatus.Ignore,
        actionText: 'View component',
    },
    {
        title: 'Card',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Card,
        status: ItemStatus.Ignore,
        actionText: 'View component',
    },
    {
        title: 'Checkbox',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Checkbox,
        status: ItemStatus.Ignore,
        actionText: 'View component',
    },
    {
        title: 'Checkbox-Toggle',
        description: 'Some useful component with amazing features',
        docUrl: Pages.CheckboxToggle,
        status: ItemStatus.Coming,
        actionText: 'View component',
    },
    {
        title: 'Divider',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Divider,
        status: ItemStatus.Ignore,
        actionText: 'View component',
    },
    {
        title: 'Dropdown',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Dropdown,
        status: ItemStatus.Ignore,
        actionText: 'View component',
    },
    {
        title: 'Header',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Header,
        status: ItemStatus.Ignore,
        actionText: 'View component',
    },
    {
        title: 'Input',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Input,
        status: ItemStatus.Ignore,
        actionText: 'View component',
    },
    {
        title: 'Link',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Link,
        status: ItemStatus.Ignore,
        actionText: 'View component',
    },
    {
        title: 'Notification-Dot',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Notification,
        status: ItemStatus.New,
        actionText: 'View component',
    },
    {
        title: 'Radiobutton',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Radiobutton,
        status: ItemStatus.Ignore,
        actionText: 'View component',
    },
    {
        title: 'Select',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Select,
        status: ItemStatus.Ignore,
        actionText: 'View component',
    },
    {
        title: 'Table',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Table,
        status: ItemStatus.Ignore,
        actionText: 'View component',
    },
    {
        title: 'Tags',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Tags,
        status: ItemStatus.Ignore,
        actionText: 'View component',
    },
    {
        title: 'Tooltip',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Tooltip,
        status: ItemStatus.Ignore,
        actionText: 'View component',
    }
];

export const eUtilities: EItems[] = [
    {
        title: 'New project',
        description: 'Guidance how to use, and implementation of Elvia Designsystem.',
        docUrl: Pages.NewProject,
        actionText: 'Get started',
    },
    {
        title: 'Templates',
        description: 'Page template and starte templates for new projects?',
        docUrl: Pages.Template,
        actionText: 'View templates',
    },
    {
        title: 'Contribute',
        description: 'Guidance to how to contribute to Elvia Designsystem.',
        docUrl: Pages.Contribute,
        actionText: 'Start contributing',
    },
    {
        title: 'Border',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Border,
        actionText: 'View utility',
    },
    {
        title: 'Colors',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Color,
        actionText: 'View utility',
    },
    {
        title: 'Icons',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Icon,
        actionText: 'View utility',
    },
    {
        title: 'Typography',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Typography,
        actionText: 'View utility',
    },
    {
        title: 'Spacing',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Spacing,
        actionText: 'View utility',
    },
    {
        title: 'Shadow',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Shadow,
        actionText: 'View utility',
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
