
import React, { useState, useEffect, useMemo } from 'react';
import { Project, ViewState, AwardType } from './types';
import { COLORS, MOCK_PROJECTS, PARTNERS } from './constants';
import AttractMode from './components/AttractMode';
import ProjectCard from './components/ProjectCard';
import ProjectDetail from './components/ProjectDetail';
import { askProjectAssistant } from './services/gemini';

const IDLE_TIMEOUT = 60000;

const App: React.FC = () => {
  const [viewState, setViewState] = useState<ViewState>('IDLE');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedPartner, setSelectedPartner] = useState<string>('All');
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [selectedYear, setSelectedYear] = useState<string>('All');
  const [awardFilter, setAwardFilter] = useState<'All' | 'Awarded'>('All');
  
  const [showAiConsole, setShowAiConsole] = useState(false);
  const [showPartnerDirectory, setShowPartnerDirectory] = useState(false);
  const [partnerSearch, setPartnerSearch] = useState('');
  
  const [aiQuery, setAiQuery] = useState('');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  // Inactivity tracking
  useEffect(() => {
    let timeoutId: number;
    const resetTimeout = () => {
      window.clearTimeout(timeoutId);
      if (viewState === 'IDLE') setViewState('DASHBOARD');
      timeoutId = window.setTimeout(() => setViewState('IDLE'), IDLE_TIMEOUT);
    };
    const events = ['mousedown', 'touchstart', 'mousemove', 'keypress'];
    events.forEach(e => window.addEventListener(e, resetTimeout));
    resetTimeout();
    return () => {
      events.forEach(e => window.removeEventListener(e, resetTimeout));
      window.clearTimeout(timeoutId);
    };
  }, [viewState]);

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

  const handleAskAi = async () => {
    if (!aiQuery) return;
    setIsAiLoading(true);
    const answer = await askProjectAssistant(aiQuery, MOCK_PROJECTS);
    setAiResponse(answer);
    setIsAiLoading(false);
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
    <div className="flex flex-col h-full w-full bg-white animate-in fade-in duration-500 overflow-hidden">
      {/* Header - Consolidated Controls */}
      <header className="px-8 pt-12 pb-6 shrink-0 bg-white z-20">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-black text-lg shadow-md" style={{ backgroundColor: COLORS.PRIMARY }}>C</div>
              <h1 className="text-[10px] font-black tracking-widest uppercase opacity-40">Knowledge Base</h1>
            </div>
            <h2 className="text-4xl font-black tracking-tighter" style={{ color: COLORS.BLACK }}>
              CAPSTONE HUB
            </h2>
          </div>
          
          <div className="flex gap-3">
            <button 
              onClick={() => setShowAiConsole(true)}
              className="w-14 h-14 rounded-2xl bg-black text-white flex items-center justify-center active:scale-95 transition-all shadow-sm"
              title="Ask AI Assistant"
            >
              <i className="fas fa-magic text-lg"></i>
            </button>
            <button 
              onClick={() => setShowPartnerDirectory(true)}
              className="flex flex-col items-center justify-center w-14 h-14 rounded-2xl bg-gray-50 border border-gray-100 active:scale-95 transition-all shadow-sm"
            >
              <i className="fas fa-building text-base mb-0.5" style={{ color: COLORS.TEAL }}></i>
              <p className="text-[7px] font-black uppercase text-gray-500">Partners</p>
            </button>
          </div>
        </div>

        {/* Discovery Browser */}
        <div className="space-y-4">
          {/* Years Row (Now at top of filters) */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            <span className="text-[9px] font-black uppercase text-gray-300 min-w-max mr-2 italic">Filter Year:</span>
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

          {/* Popular Themes Row */}
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-1">
            <span className="text-[9px] font-black uppercase text-gray-300 min-w-max italic">Popular Themes:</span>
            {['All', ...allTags].map(tag => (
              <button 
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-1.5 rounded-lg text-[10px] font-bold border transition-all ${
                  selectedTag === tag ? 'border-transparent shadow-md' : 'border-gray-100 bg-white text-gray-400'
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

      {/* Main Grid Area */}
      <main className="flex-1 overflow-y-auto px-8 pt-4 pb-32 no-scrollbar bg-gray-50/50">
        {selectedPartner !== 'All' && (
          <div className="mb-6 p-4 bg-white rounded-2xl flex items-center justify-between border border-teal-100 shadow-sm animate-in slide-in-from-left duration-300">
            <div className="flex items-center gap-3">
               <i className="fas fa-building text-teal-500"></i>
               <span className="text-sm font-black uppercase tracking-tight">Viewing {selectedPartner} Projects</span>
            </div>
            <button onClick={() => setSelectedPartner('All')} className="text-xs font-black text-red-500 uppercase">Clear</button>
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
            <i className="fas fa-search-minus text-6xl mb-6 opacity-10"></i>
            <p className="font-black uppercase tracking-widest text-sm opacity-50 text-center px-12">No projects match these filters</p>
            <button 
              onClick={() => {setSelectedPartner('All'); setSelectedYear('All'); setSelectedTag('All'); setAwardFilter('All');}}
              className="mt-8 px-8 py-3 rounded-full bg-black text-white text-[11px] font-black uppercase tracking-widest shadow-xl"
            >
              Reset Discovery
            </button>
          </div>
        )}
      </main>

      {/* Award Filter Shortcuts - Floating Bottom */}
      <div className="fixed bottom-0 left-0 right-0 p-8 flex flex-col items-center gap-4 bg-gradient-to-t from-white via-white to-transparent pointer-events-none">
        <div className="flex items-center gap-3 p-2 bg-black/5 backdrop-blur-3xl rounded-[28px] pointer-events-auto border border-white shadow-2xl">
          <button 
            onClick={() => setAwardFilter('All')}
            className={`px-8 py-4 rounded-full text-[11px] font-black uppercase tracking-widest transition-all ${awardFilter === 'All' ? 'bg-white text-black shadow-lg' : 'text-gray-400'}`}
          >
            All Projects
          </button>
          <button 
            onClick={() => {
              setViewState('AWARDS_WALL');
              setAwardFilter('Awarded');
            }}
            className={`px-8 py-4 rounded-full text-[11px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${awardFilter === 'Awarded' ? 'bg-red-500 text-white shadow-lg' : 'text-gray-400'}`}
          >
            <i className="fas fa-award text-yellow-400"></i>
            Wall of Fame
          </button>
        </div>
      </div>

      {/* Partner Directory Modal */}
      {showPartnerDirectory && (
        <div className="fixed inset-0 z-[70] bg-white flex flex-col animate-in slide-in-from-bottom duration-500">
           <header className="p-8 pb-4 shrink-0">
             <div className="flex justify-between items-center mb-6">
               <h2 className="text-3xl font-black">Our Partners</h2>
               <button onClick={() => setShowPartnerDirectory(false)} className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                 <i className="fas fa-times text-xl"></i>
               </button>
             </div>
             <div className="relative">
               <input 
                 type="text"
                 placeholder="Search 100+ partners..."
                 className="w-full bg-gray-50 border-none p-5 rounded-2xl text-lg font-bold"
                 value={partnerSearch}
                 onChange={(e) => setPartnerSearch(e.target.value)}
               />
               <i className="fas fa-search absolute right-6 top-1/2 -translate-y-1/2 text-gray-300"></i>
             </div>
           </header>
           <main className="flex-1 overflow-y-auto px-8 pb-10 no-scrollbar">
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
                  className="flex items-center justify-between p-6 bg-gray-50 rounded-2xl active:bg-teal-500 active:text-white transition-colors group text-left"
                 >
                   <span className="text-lg font-black">{partner}</span>
                   <span className="text-[10px] font-black uppercase opacity-40 group-active:opacity-100 flex items-center">
                     {MOCK_PROJECTS.filter(p => p.partner === partner).length} Works <i className="fas fa-chevron-right ml-2 text-[8px]"></i>
                   </span>
                 </button>
               ))}
             </div>
           </main>
        </div>
      )}

      {/* AI Console Modal */}
      {showAiConsole && (
        <div className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm flex items-end p-6 animate-in slide-in-from-bottom duration-300">
           <div className="w-full bg-white rounded-[40px] p-10 shadow-3xl">
              <div className="flex justify-between items-center mb-8 text-left">
                 <div>
                   <h3 className="text-2xl font-black">Intelligent Search</h3>
                   <p className="text-xs text-gray-400 font-bold uppercase tracking-tighter">Ask about students or Falconi awards</p>
                 </div>
                 <button onClick={() => {setShowAiConsole(false); setAiResponse(null);}} className="text-gray-300 hover:text-black">
                   <i className="fas fa-times text-2xl"></i>
                 </button>
              </div>

              <div className="relative mb-6">
                <input 
                  type="text"
                  placeholder="e.g. 'Show me Excellence projects'"
                  className="w-full bg-gray-100 p-6 rounded-3xl text-lg font-medium focus:outline-none"
                  value={aiQuery}
                  onChange={(e) => setAiQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAskAi()}
                />
                <button 
                  onClick={handleAskAi}
                  disabled={isAiLoading || !aiQuery}
                  className="absolute right-3 top-3 bottom-3 px-8 bg-black text-white rounded-2xl font-black text-xs uppercase"
                >
                  {isAiLoading ? <i className="fas fa-spinner animate-spin"></i> : 'Ask'}
                </button>
              </div>

              {aiResponse && (
                <div className="p-6 bg-red-50 rounded-3xl animate-in fade-in slide-in-from-top duration-500 max-h-[40vh] overflow-y-auto no-scrollbar text-left">
                   <p className="text-gray-800 text-lg leading-relaxed italic">"{aiResponse}"</p>
                </div>
              )}
           </div>
        </div>
      )}

      {/* Awards Wall Page */}
      {viewState === 'AWARDS_WALL' && (
        <div className="fixed inset-0 z-[80] bg-white flex flex-col animate-in slide-in-from-right duration-500">
          <header className="px-10 pt-16 pb-8 bg-red-500 text-white shrink-0">
             <div className="flex justify-between items-center mb-4">
               <button onClick={() => {setViewState('DASHBOARD'); setAwardFilter('All');}} className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center">
                 <i className="fas fa-arrow-left"></i>
               </button>
               <div className="text-center">
                 <h2 className="text-4xl font-black tracking-tighter italic">WALL OF FAME</h2>
                 <p className="text-[10px] font-black uppercase tracking-widest opacity-70">Falconi Excellence & Featured Projects</p>
               </div>
               <div className="w-14"></div>
             </div>
          </header>
          <main className="flex-1 overflow-y-auto p-10 bg-gray-50 no-scrollbar pb-24">
             <div className="grid grid-cols-2 gap-8">
               {awardedOnlyProjects.map(p => (
                 <div key={p.id} className="animate-in zoom-in duration-500 delay-150">
                   <ProjectCard project={p} onClick={handleProjectClick} />
                 </div>
               ))}
             </div>
             {awardedOnlyProjects.length === 0 && (
                <div className="flex flex-col items-center justify-center py-40 opacity-20">
                  <i className="fas fa-medal text-9xl mb-6"></i>
                  <p className="font-black uppercase tracking-widest">No awards registered yet</p>
                </div>
             )}
          </main>
          <div className="absolute bottom-8 left-0 right-0 flex justify-center px-10">
            <button 
              onClick={() => {setViewState('DASHBOARD'); setAwardFilter('All');}}
              className="w-full max-w-sm py-5 bg-black text-white rounded-3xl font-black uppercase tracking-widest text-[11px] shadow-2xl"
            >
              CLOSE WALL OF FAME
            </button>
          </div>
        </div>
      )}

      {/* Project Detail View */}
      {viewState === 'PROJECT_DETAIL' && selectedProject && (
        <ProjectDetail 
          project={selectedProject} 
          onBack={() => {
            // Keep the previous context (Dashboard or Awards Wall)
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
