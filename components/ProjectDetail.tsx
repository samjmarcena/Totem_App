import React from 'react';
import { Project, AwardType } from '../types';
import { COLORS } from '../constants';

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onBack }) => {
  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col animate-in slide-in-from-bottom duration-500 overflow-y-auto pb-32 no-scrollbar">
      {/* Header Image - Simplificado sem Blur */}
      <div className="relative h-[40vh] w-full shrink-0 bg-gray-900">
        <img src={project.thumbnailUrl} className="w-full h-full object-cover opacity-80" />
        {/* Gradiente de performance: apenas 2 cores */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"></div>
        
        <button 
          onClick={onBack}
          className="absolute top-10 left-6 w-14 h-14 bg-black/40 border border-white/30 rounded-full flex items-center justify-center text-white active:scale-90 transition-transform"
        >
          <i className="fas fa-arrow-left text-xl"></i>
        </button>
        
        <div className="absolute bottom-8 left-8 right-8 text-white">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span 
              className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-md"
              style={{ backgroundColor: COLORS.PRIMARY }}
            >
              {project.category}
            </span>
            
            {project.awardType === AwardType.EXCELLENCE && (
              <span 
                className="flex items-center gap-2 text-white text-[10px] font-black px-4 py-2 rounded-full shadow-lg border border-white/20"
                style={{ backgroundColor: COLORS.PRIMARY }}
              >
                <i className="fas fa-star text-yellow-400"></i>
                FALCONI EXCELLENCE
              </span>
            )}

            {project.awardType === AwardType.FEATURED && (
              <span 
                className="flex items-center gap-2 text-white text-[10px] font-black px-4 py-2 rounded-full shadow-lg border border-white/20"
                style={{ backgroundColor: COLORS.PRIMARY }}
              >
                <i className="fas fa-star text-white"></i> FALCONI FEATURED
              </span>
            )}

            {project.partner && (
              <span className="bg-white px-3 py-1.5 rounded-full text-black text-[10px] font-black uppercase tracking-tight shadow-md">
                <i className="fas fa-building mr-1.5"></i> {project.partner}
              </span>
            )}
          </div>
          <h2 className="text-4xl font-black leading-tight max-w-2xl drop-shadow-lg">{project.title}</h2>
          <p className="text-white/70 text-xs font-black tracking-widest mt-2 uppercase italic">{project.year}.{project.semester}</p>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-10 space-y-12 bg-white">
        {/* Project Video Section */}
        {project.videoUrl && (
          <section>
            <h3 className="text-xl font-black mb-6 flex items-center gap-2 text-gray-900">
              <i className="fas fa-play-circle" style={{ color: COLORS.PRIMARY }}></i>
              Apresentação do Projeto
            </h3>
            <div className="relative w-full aspect-video rounded-[32px] overflow-hidden bg-black shadow-lg">
              <video 
                src={project.videoUrl} 
                controls 
                className="w-full h-full object-contain"
                poster={project.thumbnailUrl}
              />
            </div>
          </section>
        )}

        {/* Description & Tags */}
        <section>
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map(tag => (
              <span key={tag} className="px-3 py-1.5 bg-gray-100 text-[10px] font-bold text-gray-500 rounded-lg uppercase">
                #{tag}
              </span>
            ))}
          </div>
          <h3 className="text-2xl font-black mb-4" style={{ color: COLORS.BLACK }}>Resumo Executivo</h3>
          <p className="text-gray-600 leading-relaxed text-xl font-medium">
            {project.longDescription}
          </p>
        </section>

        {/* Media Gallery - Otimizado para Scroll Lateral Suave */}
        <section>
          <h3 className="text-xl font-black mb-6 flex items-center gap-2">
            <i className="fas fa-images" style={{ color: COLORS.PRIMARY }}></i>
            Galeria de Fotos
          </h3>
          <div className="flex gap-6 overflow-x-auto pb-6 -mx-10 px-10 no-scrollbar">
            {project.galleryUrls.map((url, i) => (
              <div key={i} className="relative w-80 aspect-[16/10] shrink-0 rounded-3xl overflow-hidden shadow-md border border-gray-100 bg-gray-50">
                <img src={url} className="w-full h-full object-cover" loading="lazy" />
              </div>
            ))}
            
            <div 
              className="w-80 aspect-[16/10] shrink-0 rounded-3xl flex flex-col items-center justify-center p-8 text-center border-2 border-dashed border-gray-200 bg-gray-50"
            >
               <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center mb-4 shadow-sm text-gray-300">
                 <i className="fas fa-file-pdf text-3xl"></i>
               </div>
               <p className="font-black text-gray-900 mb-1">Painel Técnico</p>
               <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-4">Poster Oficial</p>
               <button 
                className="px-8 py-3 rounded-xl text-[10px] font-black uppercase text-white shadow-md active:scale-95 bg-black"
               >
                 Ver Documento
               </button>
            </div>
          </div>
        </section>

        {/* Team & Advisor */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <section className="bg-gray-50 p-8 rounded-[32px] border border-gray-100">
            <h3 className="text-[10px] font-black uppercase text-gray-400 mb-6 tracking-widest">Criadores</h3>
            <div className="grid gap-6">
              {project.students.map(student => (
                <div key={student.id} className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-white border border-gray-200 flex items-center justify-center text-gray-300 text-xl shadow-sm">
                    <i className="fas fa-user-graduate"></i>
                  </div>
                  <div>
                    <p className="font-black text-base text-gray-900">{student.name}</p>
                    <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest">{student.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-gray-50 p-8 rounded-[32px] border border-gray-100">
            <h3 className="text-[10px] font-black uppercase text-gray-400 mb-6 tracking-widest">Orientação</h3>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-white border border-gray-200 flex items-center justify-center text-red-500 text-xl shadow-sm">
                <i className="fas fa-user-tie"></i>
              </div>
              <div>
                <p className="font-black text-base text-gray-900">{project.advisor}</p>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Supervisor de Pesquisa</p>
              </div>
            </div>
            
            {project.partner && (
              <div className="pt-8 border-t border-gray-200">
                <p className="text-[9px] font-black uppercase text-gray-400 mb-3 tracking-widest">Apoio Institucional</p>
                <div className="px-5 py-3 bg-white rounded-xl shadow-sm border border-gray-100 inline-block">
                  <p className="font-black text-sm" style={{ color: COLORS.BLACK }}>{project.partner}</p>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>

      {/* Persistent Bottom CTA - Sólido para performance */}
      <div className="fixed bottom-0 left-0 right-0 p-8 bg-white border-t border-gray-100 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
        <button 
          onClick={onBack}
          className="w-full py-6 rounded-2xl font-black text-white bg-black tracking-widest uppercase text-xs shadow-xl active:scale-95 transition-all"
        >
          VOLTAR PARA A GALERIA
        </button>
      </div>
    </div>
  );
};

export default ProjectDetail;