
import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronDownIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import DropdownMenu from './DropdownMenu';

interface NavItemProps {
  to: string;
  label: string;
  children?: React.ReactNode;
  isActive: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ to, label, children, isActive }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const hasDropdown = !!children;

  return (
    <div ref={ref} className="relative">
      <div 
        className="group flex items-center"
        onMouseEnter={() => hasDropdown && setIsOpen(true)}
        onMouseLeave={() => hasDropdown && setIsOpen(false)}
      >
        {hasDropdown ? (
          <button
            className={cn(
              "flex items-center px-4 py-2 text-sm font-medium",
              isActive ? "text-green-700" : "text-gray-700 hover:text-green-600"
            )}
            onClick={() => setIsOpen(!isOpen)}
          >
            {label}
            <ChevronDownIcon 
              className={cn(
                "ml-1 h-4 w-4 transition-transform duration-200", 
                isOpen ? "rotate-180" : ""
              )} 
            />
          </button>
        ) : (
          <NavLink
            to={to}
            className={({ isActive }) =>
              cn(
                "px-4 py-2 text-sm font-medium transition-colors duration-200",
                isActive
                  ? "text-green-700 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-green-500"
                  : "text-gray-700 hover:text-green-600"
              )
            }
          >
            {label}
          </NavLink>
        )}
      </div>

      {hasDropdown && (
        <DropdownMenu isOpen={isOpen}>
          {children}
        </DropdownMenu>
      )}
    </div>
  );
};

export default NavItem;
