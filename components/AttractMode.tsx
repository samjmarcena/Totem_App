
import React, { useState, useEffect } from 'react';
import { Project, AwardType } from '../types';
import { COLORS } from '../constants';

interface AttractModeProps {
  projects: Project[];
  onInteract: () => void;
}

const AttractMode: React.FC<AttractModeProps> = ({ projects, onInteract }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [projects.length]);

  const currentProject = projects[currentIndex];

  return (
    <div 
      className="relative w-full h-full cursor-pointer overflow-hidden animate-in fade-in duration-1000"
      onClick={onInteract}
    >
      <img 
        src={currentProject.thumbnailUrl} 
        alt={currentProject.title}
        className="absolute inset-0 w-full h-full object-cover scale-110 animate-pulse"
        style={{ animationDuration: '8s' }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

      {/* Content */}
      <div className="absolute bottom-20 left-10 right-10 text-white text-left">
        {currentProject.awardType !== AwardType.NONE && (
          <div 
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full mb-6 font-black text-[11px] uppercase tracking-widest border border-white/20 shadow-2xl backdrop-blur-md"
            style={{ 
              backgroundColor: COLORS.PRIMARY,
              color: COLORS.WHITE
            }}
          >
            {currentProject.awardType === AwardType.EXCELLENCE ? (
              <div className="relative w-5 h-5 flex items-center justify-center">
                <i className="fas fa-star absolute text-[12px] -translate-x-0.5 -translate-y-0.5" style={{ color: COLORS.BLACK }}></i>
                <i className="fas fa-star absolute text-[12px] translate-x-0.5 translate-y-0.5" style={{ color: COLORS.YELLOW }}></i>
                <i className="fas fa-star absolute text-[12px]" style={{ color: COLORS.WHITE }}></i>
              </div>
            ) : (
              <i className="fas fa-star"></i>
            )}
            {currentProject.awardType}
          </div>
        )}
        <h1 className="text-5xl font-extrabold mb-4 uppercase leading-tight tracking-tighter">
          {currentProject.title}
        </h1>
        <p className="text-xl opacity-90 max-w-lg mb-8 font-medium">
          {currentProject.description}
        </p>
        
        <div className="flex items-center gap-4 text-xs opacity-70 uppercase tracking-widest font-black">
          <span>{currentProject.category}</span>
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: COLORS.PRIMARY }}></span>
          <span>Semester {currentProject.year}.{currentProject.semester}</span>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 animate-bounce">
        <p className="text-[10px] font-black uppercase tracking-widest">Touch anywhere to explore</p>
      </div>

      {/* Brand Logo Overlay */}
      <div 
        className="absolute top-12 left-10 w-16 h-16 rounded-2xl flex items-center justify-center shadow-2xl border border-white/10"
        style={{ backgroundColor: COLORS.PRIMARY }}
      >
        <span className="text-white text-3xl font-black">C</span>
      </div>
    </div>
  );
};

export default AttractMode;
