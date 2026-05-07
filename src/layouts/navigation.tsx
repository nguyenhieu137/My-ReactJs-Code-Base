import { ReactNode } from 'react';
import { LayoutDashboard, Component, Box, TextCursorInput, Palette, Calendar } from 'lucide-react';

export type MenuItem = {
  title: string;
  path?: string;
  icon?: ReactNode;
  children?: MenuItem[];
};

export const MENU_ITEMS: MenuItem[] = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: <LayoutDashboard size={18} />,
  },
  {
    title: 'Components',
    icon: <Component size={18} />,
    children: [
      {
        title: 'Form Elements',
        children: [
          {
            title: 'Input Text Field',
            path: '/components/inputs',
            icon: <TextCursorInput size={16} />
          },
          {
            title: 'App Button',
            path: '/components/buttons',
            icon: <Box size={16} />
          },
          {
            title: 'Date Picker',
            path: '/components/date-picker',
            icon: <Calendar size={16} />
          },
        ]
      },
      {
        title: 'Feedback',
        path: '/components/feedback',
      }
    ],
  },
  {
    title: 'Theme & Colors',
    path: '/theme',
    icon: <Palette size={18} />,
  }
];
