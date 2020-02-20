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
        status: 'In progress'
    },
    {
        title: 'Checkbox',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Checkbox,
        status: 'In progress'
    },
    {
        title: 'Checkbox-Toggle',
        description: 'Some useful component with amazing features',
        docUrl: Pages.CheckboxToggle,
        status: 'In progress'
    },
    {
        title: 'Divider',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Divider,
        status: 'In progress'
    },
    {
        title: 'Dropdown',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Dropdown,
        status: 'In progress'
    },
    {
        title: 'Feedback-Message',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Feedback,
        status: 'In progress'
    },
    {
        title: 'Header',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Header,
        status: 'In progress'
    },
    {
        title: 'Input',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Input,
        status: 'In progress'
    },
    {
        title: 'Link',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Link,
        status: 'In progress'
    },
    {
        title: 'Notification-Dot',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Notification,
        status: 'In progress'
    },
    {
        title: 'Radiobutton',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Radiobutton,
        status: 'In progress'
    },
    {
        title: 'Select',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Select,
        status: 'In progress'
    },
    {
        title: 'Table',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Table,
        status: 'In progress'
    },
    {
        title: 'Tags',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Tags,
        status: 'In progress'
    },
    {
        title: 'Tooltip',
        description: 'Some useful component with amazing features',
        docUrl: Pages.Tooltip,
        status: 'In progress'
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
