import React from 'react';

// Admin Imports

// Icon Imports
import { MdHome, MdOutlineShoppingCart, MdBarChart } from 'react-icons/md';

const routes = [
  {
    name: 'Home',
    layout: '/admin',
    path: 'home',
    icon: <MdHome className="h-6 w-6" />,
  },
  {
    name: 'Manage Rooms',
    layout: '/admin',
    path: 'manage-rooms',
    icon: <MdOutlineShoppingCart className="h-6 w-6" />,

    secondary: true,
  },
  {
    name: 'Bilan',
    layout: '/admin',
    icon: <MdBarChart className="h-6 w-6" />,
    path: 'bilan',
  },
];
export default routes;
