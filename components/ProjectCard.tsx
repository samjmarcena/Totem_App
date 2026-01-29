import React from 'react';
import { Project, AwardType } from '../types';

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  return (
    <div 
      className="relative aspect-[3/4.5] rounded-[32px] overflow-hidden shadow-xl active:scale-95 transition-all duration-300 border border-gray-100 bg-gray-200 flex flex-col group cursor-pointer"
      onClick={() => onClick(project)}
    >
      <img src={project.thumbnailUrl} alt={project.title} className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
      
      {/* Container Superior (Badges) */}
      <div className="relative z-10 p-6 flex justify-between items-start shrink-0">
        
        {/* SELO EXCELLENCE - 3 Estrelas */}
        {project.awardType === AwardType.EXCELLENCE && (
          <div className="flex flex-col items-center">
            <div className="bg-red-600 p-2.5 rounded-2xl shadow-2xl border border-white/30 flex gap-1 items-center">
              <i className="fas fa-star text-white text-[10px] opacity-70"></i>
              <i className="fas fa-star text-white text-[16px]"></i>
              <i className="fas fa-star text-white text-[10px] opacity-70"></i>
            </div>
            <span className="text-[8px] font-black text-white uppercase mt-1 tracking-tighter drop-shadow-md">Excellence</span>
          </div>
        )}
        
        {project.partner && (
          <div className="bg-white px-4 py-2 rounded-xl shadow-md border border-gray-100 ml-auto">
            <p className="text-[10px] font-black uppercase text-black truncate max-w-[100px]">
              {project.partner}
            </p>
          </div>
        )}
      </div>

      <div className="flex-1"></div>

      {/* Container de Informações */}
      <div className="relative z-10 p-8 flex flex-col gap-3 mt-auto">
        <div className="flex flex-wrap gap-2">
          {project.tags.slice(0, 2).map(tag => (
            <span key={tag} className="text-[9px] font-black uppercase bg-black/60 px-3 py-1 rounded-lg border border-white/10 text-white shadow-sm">
              #{tag}
            </span>
          ))}
        </div>
        
        <h3 className="font-black text-2xl leading-[1.1] text-white line-clamp-3 drop-shadow-xl">
          {project.title}
        </h3>
        
        <div className="flex items-center gap-2 pt-2 border-t border-white/20">
           <div className="w-2 h-2 rounded-full bg-red-500 shadow-pulse"></div>
           <p className="text-[11px] uppercase font-black text-white/90 tracking-[0.2em]">
             {project.year}.{project.semester}
           </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;