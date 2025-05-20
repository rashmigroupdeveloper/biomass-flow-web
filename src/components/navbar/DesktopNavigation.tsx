import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import NavItem from './NavItem';

interface DesktopNavigationProps {
  currentPath: string;
}

const DesktopNavigation: React.FC<DesktopNavigationProps> = ({ currentPath }) => {
  return (
    <nav className="hidden md:flex space-x-1">
      <NavItem to="/" label="Home" isActive={currentPath === '/'} />
      <NavItem to="/about" label="About" isActive={currentPath === '/about'} />
      
      <NavItem 
        to="/products/bio-pellets" 
        label="Products" 
        isActive={currentPath.includes('/products')}
      >
        <div className="py-1">
          <NavLink
            to="/products/bio-pellets"
            className={({ isActive }) =>
              cn(
                "block px-4 py-2 text-sm",
                isActive
                  ? "text-green-700 bg-gray-100"
                  : "text-gray-700 hover:bg-gray-50 hover:text-green-600"
              )
            }
          >
            Bio Pellets
          </NavLink>
          <NavLink
            to="/products/activated-carbon"
            className={({ isActive }) =>
              cn(
                "block px-4 py-2 text-sm",
                isActive
                  ? "text-green-700 bg-gray-100"
                  : "text-gray-700 hover:bg-gray-50 hover:text-green-600"
              )
            }
          >
            Activated Carbon
          </NavLink>
          <NavLink
            to="/products/charcoal-briquettes"
            className={({ isActive }) =>
              cn(
                "block px-4 py-2 text-sm",
                isActive
                  ? "text-green-700 bg-gray-100"
                  : "text-gray-700 hover:bg-gray-50 hover:text-green-600"
              )
            }
          >
            Charcoal Briquettes
          </NavLink>
        </div>
      </NavItem>
      
      <NavItem to="/process" label="Process" isActive={currentPath === '/process'} />
      <NavItem to="/impact" label="Impact" isActive={currentPath === '/impact'} />
      <NavItem to="/sustainability" label="Sustainability" isActive={currentPath === '/sustainability'} />
      <NavItem to="/csr" label="CSR" isActive={currentPath === '/csr'} />
      <NavItem to="/certificates" label="Certificates" isActive={currentPath === '/certificates'} />
      <NavItem to="/media" label="Media" isActive={currentPath === '/media'} />
      <NavItem to="/contact" label="Contact" isActive={currentPath === '/contact'} />
    </nav>
  );
};

export default DesktopNavigation;
