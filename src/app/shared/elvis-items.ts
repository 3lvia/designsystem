import { ElvisItems } from './elvis-items.interface';
import { Pages } from './pages.enum';

export const elvisComponents: ElvisItems[] = [
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
        status: 'In progress'
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
        docUrl: Pages.CheckboxToggle
    },
    {
        title: 'Divider',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Divider
    },
    {
        title: 'Dropdown',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Dropdown
    },
    {
        title: 'Feedback-Message',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Feedback
    },
    {
        title: 'Header',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Header
    },
    {
        title: 'Input',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Input
    },
    {
        title: 'Link',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Link
    },
    {
        title: 'Notification-Dot',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Notification
    },
    {
        title: 'Radiobutton',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Radiobutton
    },
    {
        title: 'Select',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Select
    },
    {
        title: 'Table',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Table
    },
    {
        title: 'Tags',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Tags
    },
    {
        title: 'Tooltip',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Tooltip
    }
];

export const elvisUtilities: ElvisItems[] = [
    {
        title: 'Colors',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Color
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

export function getComponent(docUrl: string): ElvisItems {
    return elvisComponents.find(component => component.docUrl === docUrl);
}
