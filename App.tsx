import React, { useState, useEffect, useMemo } from 'react';
import { Project, ViewState, AwardType } from './types';
import { COLORS, MOCK_PROJECTS, PARTNERS } from './constants';
import AttractMode from './components/AttractMode';
import ProjectCard from './components/ProjectCard';
import ProjectDetail from './components/ProjectDetail';

const App: React.FC = () => {
  const [viewState, setViewState] = useState<ViewState>('IDLE');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedPartner, setSelectedPartner] = useState<string>('All');
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [selectedYear, setSelectedYear] = useState<string>('All');
  const [awardFilter, setAwardFilter] = useState<'All' | 'Awarded'>('All');
  const [showPartnerDirectory, setShowPartnerDirectory] = useState(false);
  const [partnerSearch, setPartnerSearch] = useState('');

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    MOCK_PROJECTS.forEach(p => p.tags.forEach(t => tags.add(t)));
    return Array.from(tags).sort();
  }, []);

  const years = useMemo(() => 
    Array.from(new Set(MOCK_PROJECTS.map(p => p.year.toString()))).sort((a,b) => b.localeCompare(a)), 
  []);

  const filteredProjects = useMemo(() => {
    return MOCK_PROJECTS.filter(p => {
      const matchesPartner = selectedPartner === 'All' || p.partner === selectedPartner;
      const matchesYear = selectedYear === 'All' || p.year.toString() === selectedYear;
      const matchesTag = selectedTag === 'All' || p.tags.includes(selectedTag);
      const matchesAward = awardFilter === 'All' || p.awardType !== AwardType.NONE;
      return matchesPartner && matchesYear && matchesTag && matchesAward;
    });
  }, [selectedPartner, selectedYear, selectedTag, awardFilter]);

  const awardedOnlyProjects = useMemo(() => 
    MOCK_PROJECTS.filter(p => p.awardType !== AwardType.NONE), 
  []);

  const filteredPartners = useMemo(() => {
    return PARTNERS.filter(p => p.toLowerCase().includes(partnerSearch.toLowerCase()));
  }, [partnerSearch]);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setViewState('PROJECT_DETAIL');
  };

  if (viewState === 'IDLE') {
    return (
      <AttractMode 
        projects={MOCK_PROJECTS} 
        onInteract={() => setViewState('DASHBOARD')} 
      />
    );
  }

  return (
    <div className="flex flex-col h-screen w-full bg-white animate-in fade-in duration-500 overflow-hidden relative">
      {/* Header - Controles Simplificados sem IA */}
      <header className="px-8 pt-12 pb-6 shrink-0 bg-white z-20 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-black text-lg shadow-sm" style={{ backgroundColor: COLORS.PRIMARY }}>C</div>
              <h1 className="text-[10px] font-black tracking-widest uppercase opacity-40">Knowledge Base</h1>
            </div>
            <h2 className="text-4xl font-black tracking-tighter" style={{ color: COLORS.BLACK }}>
              CAPSTONE HUB
            </h2>
          </div>
          
          <div className="flex gap-3">
            <button 
              onClick={() => setShowPartnerDirectory(true)}
              className="flex flex-col items-center justify-center w-16 h-16 rounded-2xl bg-gray-100 active:scale-95 transition-all"
            >
              <i className="fas fa-building text-xl mb-1" style={{ color: COLORS.TEAL }}></i>
              <p className="text-[8px] font-black uppercase text-gray-500">Parceiros</p>
            </button>
          </div>
        </div>

        {/* Discovery Browser */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            <span className="text-[9px] font-black uppercase text-gray-300 min-w-max mr-2 italic">Ano:</span>
            {['All', ...years].map(y => (
              <button 
                key={y}
                onClick={() => setSelectedYear(y)}
                className={`px-5 py-2.5 rounded-full text-[11px] font-black transition-all ${
                  selectedYear === y ? 'shadow-md scale-105' : 'bg-gray-100 text-gray-400'
                }`}
                style={{ 
                  backgroundColor: selectedYear === y ? COLORS.TEAL : undefined,
                  color: selectedYear === y ? COLORS.WHITE : undefined
                }}
              >
                {y}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-1">
            <span className="text-[9px] font-black uppercase text-gray-300 min-w-max italic">Temas:</span>
            {['All', ...allTags].map(tag => (
              <button 
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 rounded-lg text-[10px] font-bold border transition-all ${
                  selectedTag === tag ? 'border-transparent shadow-sm' : 'border-gray-100 bg-white text-gray-400'
                }`}
                style={{ 
                  backgroundColor: selectedTag === tag ? COLORS.PURPLE : undefined,
                  color: selectedTag === tag ? COLORS.WHITE : undefined
                }}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Grid de Projetos */}
      <main className="flex-1 overflow-y-auto px-8 pt-4 pb-60 no-scrollbar bg-gray-50/50">
        {selectedPartner !== 'All' && (
          <div className="mb-6 p-4 bg-white rounded-2xl flex items-center justify-between border border-teal-100 shadow-sm">
            <div className="flex items-center gap-3">
               <i className="fas fa-building text-teal-500"></i>
               <span className="text-sm font-black uppercase tracking-tight">Projetos {selectedPartner}</span>
            </div>
            <button onClick={() => setSelectedPartner('All')} className="text-xs font-black text-red-500 uppercase px-4 py-2 bg-red-50 rounded-xl">Remover</button>
          </div>
        )}

        <div className="grid grid-cols-2 gap-6">
          {filteredProjects.map(project => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              onClick={handleProjectClick}
            />
          ))}
        </div>
        
        {filteredProjects.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-gray-300">
            <i className="fas fa-search-minus text-6xl mb-6 opacity-20"></i>
            <p className="font-black uppercase tracking-widest text-sm opacity-50">Nenhum projeto encontrado</p>
            <button 
              onClick={() => {setSelectedPartner('All'); setSelectedYear('All'); setSelectedTag('All'); setAwardFilter('All');}}
              className="mt-8 px-10 py-4 rounded-full bg-black text-white text-[11px] font-black uppercase tracking-widest"
            >
              Resetar Filtros
            </button>
          </div>
        )}
      </main>

{/* Award Filter Shortcuts - Floating Bottom */}
<div className="fixed bottom-0 left-0 right-0 p-8 flex justify-center pointer-events-none z-[100]">
  <div className="flex items-center gap-3 p-2 bg-black rounded-[28px] pointer-events-auto shadow-2xl border border-white/10">
    <button 
      onClick={() => setAwardFilter('All')}
      className={`px-8 py-4 rounded-full text-[11px] font-black uppercase tracking-widest transition-all ${
        awardFilter === 'All' ? 'bg-white text-black shadow-lg' : 'text-gray-400'
      }`}
    >
      Todos os Projetos
    </button>
    <button 
      onClick={() => {
        setViewState('AWARDS_WALL');
        setAwardFilter('Awarded');
      }}
      className={`px-8 py-4 rounded-full text-[11px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${
        awardFilter === 'Awarded' ? 'bg-red-500 text-white shadow-lg' : 'text-gray-400'
      }`}
    >
      <i className="fas fa-award text-yellow-400"></i>
      Wall of Fame
    </button>
  </div>
</div>

      {/* Modal de Parceiros */}
      {showPartnerDirectory && (
        <div className="fixed inset-0 z-[100] bg-white flex flex-col animate-in slide-in-from-bottom duration-500">
           <header className="p-8 pb-4 shrink-0 shadow-sm">
             <div className="flex justify-between items-center mb-6">
               <h2 className="text-3xl font-black">Nossos Parceiros</h2>
               <button onClick={() => setShowPartnerDirectory(false)} className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center">
                 <i className="fas fa-times text-xl"></i>
               </button>
             </div>
             <div className="relative">
               <input 
                 type="text"
                 placeholder="Buscar parceiros..."
                 className="w-full bg-gray-100 border-none p-6 rounded-2xl text-lg font-bold"
                 value={partnerSearch}
                 onChange={(e) => setPartnerSearch(e.target.value)}
               />
               <i className="fas fa-search absolute right-6 top-1/2 -translate-y-1/2 text-gray-300 text-xl"></i>
             </div>
           </header>
           <main className="flex-1 overflow-y-auto px-8 py-6 no-scrollbar">
             <div className="grid grid-cols-1 gap-3">
               {filteredPartners.map(partner => (
                 <button 
                  key={partner}
                  onClick={() => {
                    setSelectedPartner(partner);
                    setShowPartnerDirectory(false);
                    setSelectedTag('All');
                    setAwardFilter('All');
                  }}
                  className="flex items-center justify-between p-6 bg-gray-50 rounded-2xl active:bg-teal-500 active:text-white transition-colors text-left"
                 >
                   <span className="text-lg font-black">{partner}</span>
                   <span className="text-[10px] font-black uppercase opacity-40 flex items-center">
                     {MOCK_PROJECTS.filter(p => p.partner === partner).length} Projetos <i className="fas fa-chevron-right ml-2"></i>
                   </span>
                 </button>
               ))}
             </div>
           </main>
        </div>
      )}

      {/* Wall of Fame Modal */}
{viewState === 'AWARDS_WALL' && (
  <div className="fixed inset-0 z-[110] bg-white flex flex-col animate-in slide-in-from-right duration-500 overflow-hidden">
    <header className="px-10 pt-16 pb-8 bg-red-600 text-white shrink-0">
       {/* ... seu header do hall of fame ... */}
    </header>
    
    {/* Garanta que este main tenha touch-pan-y e pb-80 */}
    <main className="flex-1 overflow-y-auto p-10 bg-gray-50 no-scrollbar pb-80 touch-pan-y">
       <div className="grid grid-cols-2 gap-8">
         {awardedOnlyProjects.map(p => (
           <ProjectCard key={p.id} project={p} onClick={handleProjectClick} />
         ))}
       </div>
    </main>
    
    {/* Botão de fechar - Garantindo que fique SEMPRE no topo */}
    <div className="fixed bottom-12 left-0 right-0 flex justify-center px-10 z-[200] pointer-events-none">
      <button 
        onClick={() => {setViewState('DASHBOARD'); setAwardFilter('All');}}
        className="pointer-events-auto flex items-center justify-center gap-3 bg-black text-white px-12 py-6 rounded-full font-black uppercase tracking-[0.2em] text-sm shadow-[0_20px_60px_rgba(0,0,0,0.6)] active:scale-95 transition-all border border-white/10"
    >
      <i className="fas fa-times text-lg"></i>
      <span>Fechar</span>
   </button>
  </div>
</div>
)}


      {/* Visualização de Detalhe do Projeto */}
      {viewState === 'PROJECT_DETAIL' && selectedProject && (
        <ProjectDetail 
          project={selectedProject} 
          onBack={() => {
            if (awardFilter === 'Awarded') setViewState('AWARDS_WALL');
            else setViewState('DASHBOARD');
            setSelectedProject(null);
          }} 
        />
      )}
    </div>
  );
};

export default App;