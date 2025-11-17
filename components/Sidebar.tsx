
import React from 'react';
import type { Section } from '../App';

interface SidebarProps {
  sections: Section[];
  activeSectionId: string;
  setActiveSectionId: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ sections, activeSectionId, setActiveSectionId }) => {
  
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setActiveSectionId(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
      <h2 className="text-lg font-semibold mb-4 text-white">Содержание плана</h2>
      <ul>
        {sections.map((section, index) => (
          <li key={section.id} className="mb-2">
            <a
              href={`#${section.id}`}
              onClick={(e) => handleLinkClick(e, section.id)}
              className={`block px-3 py-2 rounded-md text-sm transition-colors duration-200 ${
                activeSectionId === section.id
                  ? 'bg-cyan-500 text-white font-semibold'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              {index + 1}. {section.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;
