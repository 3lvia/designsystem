import { EItems } from './e-items.interface';
import { Pages } from './pages.enum';
import { ItemStatus } from './item-status.enum';

export const eHomes: EItems[] = [
    {
        title: 'New project',
        description: 'Guidance how to use, and implementation of Elvia Designsystem.',
        docUrl: Pages.Home
    },
    {
        title: 'Components',
        description: 'Explore components that are available in Elvia Designsystem.',
        docUrl: Pages.OverviewComp
    },
    {
        title: 'Contribute',
        description: 'Guidance to how to contribute to Elvia Designsystem.',
        docUrl: Pages.Home
    },
    {
        title: 'Discussion',
        description: 'Report a bug? Request a new feauture?',
        docUrl: '//github.com/hafslundnett/elvia-designsystem/issues/new/choose'
    },
];

export const eComponents: EItems[] = [
    {
        title: 'Badge',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Badge,
        status: ItemStatus.New,
    },
    {
        title: 'Button',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Button,
        status: ItemStatus.Coming,
    },
    {
        title: 'Card',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Card,
        status: ItemStatus.Coming,
    },
    {
        title: 'Checkbox',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Checkbox,
        status: ItemStatus.Coming,
    },
    {
        title: 'Checkbox-Toggle',
        description: 'Some useful component with amazing features',
        docUrl: Pages.CheckboxToggle,
        status: ItemStatus.Coming,
    },
    {
        title: 'Divider',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Divider,
        status: ItemStatus.Coming,
    },
    {
        title: 'Dropdown',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Dropdown,
        status: ItemStatus.Coming,
    },
    {
        title: 'Feedback-Message',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Feedback,
        status: ItemStatus.Coming,
    },
    {
        title: 'Header',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Header,
        status: ItemStatus.Coming,
    },
    {
        title: 'Input',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Input,
        status: ItemStatus.Coming,
    },
    {
        title: 'Link',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Link,
        status: ItemStatus.Coming,
    },
    {
        title: 'Notification-Dot',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Notification,
        status: ItemStatus.Coming,
    },
    {
        title: 'Radiobutton',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Radiobutton,
        status: ItemStatus.Coming,
    },
    {
        title: 'Select',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Select,
        status: ItemStatus.Coming,
    },
    {
        title: 'Table',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Table,
        status: ItemStatus.Coming,
    },
    {
        title: 'Tags',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Tags,
        status: ItemStatus.Coming,
    },
    {
        title: 'Tooltip',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Tooltip,
        status: ItemStatus.Coming,
    }
];

export const eUtilities: EItems[] = [
    {
        title: 'Colors',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Color
    },
    {
        title: 'Icons',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Icon
    },
    {
        title: 'Typography',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Typography
    },
    {
        title: 'Spacing',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Spacing
    },
    {
        title: 'Shadows',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Shadow
    },
    {
        title: 'Border',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Border
    }
];

export const eAccessibility: EItems[] = [
    {
        title: 'Accessibility',
        description: 'Accessibility in Elvia Designsystem',
        docUrl: Pages.Accessibility
    },
    {
        title: 'AltText',
        description: 'Meaningfull text',
        docUrl: Pages.AltText
    },
    {
        title: 'UU-Tools',
        description: 'Usefull UU tools',
        docUrl: Pages.UUTools
    },
];

export function getComponent(docUrl: string): EItems {
    return eComponents.find(component => component.docUrl === docUrl);
}
