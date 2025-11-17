
import React, { useState, useCallback, useMemo } from 'react';
import { generateVpnPlan } from './services/geminiService';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ContentDisplay from './components/ContentDisplay';
import Spinner from './components/Spinner';
import ErrorDisplay from './components/ErrorDisplay';
import GenerateButton from './components/GenerateButton';

export interface Section {
  id: string;
  title: string;
  content: string;
}

const App: React.FC = () => {
  const [plan, setPlan] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [activeSectionId, setActiveSectionId] = useState<string>('');

  const handleGeneratePlan = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setPlan(null);
    try {
      const result = await generateVpnPlan();
      setPlan(result);
      // Automatically set the first section as active
      const firstSectionId = result.match(/###\s(.*?)\n/)?.[1].toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '') || '';
      setActiveSectionId(firstSectionId);
    } catch (err) {
      setError('Не удалось сгенерировать план. Пожалуйста, проверьте API-ключ и попробуйте снова.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const sections = useMemo((): Section[] => {
    if (!plan) return [];
    const rawSections = plan.split('### ').slice(1);
    return rawSections.map(s => {
      const lines = s.split('\n');
      const title = lines[0].trim();
      const content = lines.slice(1).join('\n');
      const id = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
      return { id, title, content };
    });
  }, [plan]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
      <Header />
      <div className="container mx-auto px-4 py-8">
        {!plan && !isLoading && !error && (
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-cyan-400">Готовы к развертыванию безопасной сети?</h2>
            <p className="max-w-2xl mx-auto mb-8 text-gray-400">
              Нажмите кнопку ниже, чтобы сгенерировать комплексный план развертывания корпоративного VPN на базе WireGuard, адаптированный для вашей транспортной компании.
            </p>
            <GenerateButton onClick={handleGeneratePlan} />
          </div>
        )}
        
        {isLoading && <Spinner />}
        {error && <ErrorDisplay message={error} />}

        {plan && sections.length > 0 && (
          <div className="flex flex-col md:flex-row gap-8">
            <aside className="md:w-1/4 lg:w-1/5 md:sticky md:top-8 self-start">
              <Sidebar 
                sections={sections} 
                activeSectionId={activeSectionId}
                setActiveSectionId={setActiveSectionId} 
              />
            </aside>
            <main className="flex-1 min-w-0">
              <ContentDisplay sections={sections} />
            </main>
          </div>
        )}
      </div>
       <footer className="text-center py-4 text-xs text-gray-600 border-t border-gray-800 mt-12">
        <p>Сгенерировано с помощью Gemini API. Этот план является рекомендацией и требует адаптации квалифицированным специалистом.</p>
      </footer>
    </div>
  );
};

export default App;
