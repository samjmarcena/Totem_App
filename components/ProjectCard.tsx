
import React from 'react';
import { Project, AwardType } from '../types';
import { COLORS } from '../constants';

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  return (
    <div 
      className="relative aspect-[3/4.2] rounded-[32px] overflow-hidden shadow-2xl active:scale-95 transition-all duration-300 border border-gray-100 group cursor-pointer"
      onClick={() => onClick(project)}
    >
      <img 
        src={project.thumbnailUrl} 
        alt={project.title}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-90 group-hover:opacity-100 transition-opacity"></div>
      
      {/* Badges Container */}
      <div className="absolute top-5 left-5 flex flex-col gap-2 z-10">
        {project.awardType === AwardType.EXCELLENCE && (
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center shadow-2xl border-2 border-white/40 relative overflow-hidden backdrop-blur-sm"
            style={{ backgroundColor: COLORS.PRIMARY }}
            title="Falconi Excellence Project"
          >
            <i className="fas fa-star absolute text-[16px] -translate-x-1 -translate-y-1" style={{ color: COLORS.BLACK }}></i>
            <i className="fas fa-star absolute text-[16px] translate-x-1 translate-y-1" style={{ color: COLORS.YELLOW }}></i>
            <i className="fas fa-star absolute text-[16px]" style={{ color: COLORS.WHITE }}></i>
          </div>
        )}
        {project.awardType === AwardType.FEATURED && (
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center shadow-2xl border-2 border-white/40 backdrop-blur-sm"
            style={{ backgroundColor: COLORS.PRIMARY }}
            title="Falconi Featured Project"
          >
            <i className="fas fa-star text-white text-sm"></i>
          </div>
        )}
        {project.partner && (
          <div className="bg-white/95 backdrop-blur-xl px-4 py-1.5 rounded-2xl shadow-lg border border-gray-100">
            <p className="text-[10px] font-black tracking-tight uppercase" style={{ color: COLORS.BLACK }}>
              {project.partner}
            </p>
          </div>
        )}
      </div>

      {/* Info Overlay */}
      <div className="absolute bottom-8 left-8 right-8 text-white z-10">
        <div className="flex flex-wrap gap-2 mb-3">
          {project.tags.slice(0, 2).map(tag => (
            <span key={tag} className="text-[9px] font-black uppercase tracking-widest bg-white/10 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10">
              #{tag}
            </span>
          ))}
        </div>
        <h3 className="font-black text-2xl leading-[1.1] mb-2 group-hover:text-red-400 transition-colors drop-shadow-lg">
          {project.title}
        </h3>
        <div className="flex items-center gap-2">
           <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: COLORS.PRIMARY }}></div>
           <p className="text-[11px] uppercase font-black tracking-[0.2em] opacity-80">
             {project.year}.{project.semester}
           </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
