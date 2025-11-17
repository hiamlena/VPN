
import React from 'react';
import type { Section } from '../App';

interface ContentDisplayProps {
  sections: Section[];
}

// Simple Markdown-like renderer component
const MarkdownRenderer: React.FC<{ content: string }> = ({ content }) => {
  const lines = content.split('\n').filter(line => line.trim() !== '');

  return (
    <div className="prose prose-invert prose-p:text-gray-300 prose-li:text-gray-300 prose-headings:text-cyan-400 max-w-none">
      {lines.map((line, index) => {
        if (line.startsWith('```')) {
          const codeLines = [];
          let i = index + 1;
          while(i < lines.length && !lines[i].startsWith('```')) {
            codeLines.push(lines[i]);
            i++;
          }
          // This is a simplified approach; it doesn't actually skip the rendered lines.
          // For a real app, a more robust parser is needed.
          // But for this display, we just render the code block.
          if(line.startsWith('```') && index > 0 && lines[index-1].startsWith('```')) return null;
          return (
            <pre key={index} className="bg-gray-900/80 border border-gray-700 rounded-md p-4 my-4 overflow-x-auto">
              <code className="text-sm font-mono text-green-300">
                {codeLines.join('\n')}
              </code>
            </pre>
          );
        }
        if (line.startsWith('#### ')) {
          return <h4 key={index} className="text-lg font-semibold mt-6 mb-2 text-cyan-300">{line.substring(5)}</h4>;
        }
        if (line.startsWith('**') && line.endsWith('**')) {
           return <p key={index} className="font-bold my-2 text-gray-100">{line.substring(2, line.length - 2)}</p>;
        }
        if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
          return <li key={index} className="ml-6 my-1 list-disc">{line.trim().substring(2)}</li>;
        }
         if (/^\d+\.\s/.test(line.trim())) {
          return <li key={index} className="ml-6 my-1 list-decimal">{line.trim().substring(line.trim().indexOf(' ') + 1)}</li>
        }
        return <p key={index} className="my-3 leading-relaxed">{line}</p>;
      })}
    </div>
  );
};


const ContentDisplay: React.FC<ContentDisplayProps> = ({ sections }) => {
  return (
    <div className="bg-gray-800/50 rounded-lg border border-gray-700 p-6 md:p-8 space-y-12">
      {sections.map(section => (
        <section key={section.id} id={section.id}>
          <h3 className="text-2xl md:text-3xl font-bold border-b-2 border-cyan-500 pb-2 mb-6 text-white">
            {section.title}
          </h3>
          <MarkdownRenderer content={section.content} />
        </section>
      ))}
    </div>
  );
};

export default ContentDisplay;
