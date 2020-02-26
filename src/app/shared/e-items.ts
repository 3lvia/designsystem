import { EItems } from './e-items.interface';
import { Pages } from './pages.enum';

export const eComponents: EItems[] = [
    {
        title: 'Overview',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Overview
    },
    {
        title: 'Badge',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Badge,
        status: 'New'
    },
    {
        title: 'Button',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Button,
        status: 'Coming'
    },
    {
        title: 'Card',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Card,
        status: 'Coming'
    },
    {
        title: 'Checkbox',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Checkbox,
        status: 'Coming'
    },
    {
        title: 'Checkbox-Toggle',
        description: 'Some useful component with amazing features',
        docUrl: Pages.CheckboxToggle,
        status: 'Coming'
    },
    {
        title: 'Divider',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Divider,
        status: 'Coming'
    },
    {
        title: 'Dropdown',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Dropdown,
        status: 'Coming'
    },
    {
        title: 'Feedback-Message',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Feedback,
        status: 'Coming'
    },
    {
        title: 'Header',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Header,
        status: 'Coming'
    },
    {
        title: 'Input',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Input,
        status: 'Coming'
    },
    {
        title: 'Link',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Link,
        status: 'Coming'
    },
    {
        title: 'Notification-Dot',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Notification,
        status: 'Coming'
    },
    {
        title: 'Radiobutton',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Radiobutton,
        status: 'Coming'
    },
    {
        title: 'Select',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Select,
        status: 'Coming'
    },
    {
        title: 'Table',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Table,
        status: 'Coming'
    },
    {
        title: 'Tags',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Tags,
        status: 'Coming'
    },
    {
        title: 'Tooltip',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Tooltip,
        status: 'Coming'
    }
];

export const eUtilities: EItems[] = [
    {
        title: 'Overview',
        description: 'Some useful component with amazing features',
        docUrl: Pages.OverviewUtil
    },
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
        title: 'Shadows',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Shadow
    },
    {
        title: 'Typography',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Typography
    }
];

export function getComponent(docUrl: string): EItems {
    return eComponents.find(component => component.docUrl === docUrl);
}
