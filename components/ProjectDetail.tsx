
import React from 'react';
import { Project, AwardType } from '../types';
import { COLORS } from '../constants';

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onBack }) => {
  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col animate-in slide-in-from-bottom duration-500 overflow-y-auto pb-32">
      {/* Header Image */}
      <div className="relative h-[40vh] w-full shrink-0">
        <img src={project.thumbnailUrl} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        <button 
          onClick={onBack}
          className="absolute top-10 left-6 w-14 h-14 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center text-white active:scale-90 transition-transform"
        >
          <i className="fas fa-arrow-left text-xl"></i>
        </button>
        
        <div className="absolute bottom-8 left-8 right-8 text-white">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span 
              className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest"
              style={{ backgroundColor: COLORS.PRIMARY }}
            >
              {project.category}
            </span>
            
            {project.awardType === AwardType.EXCELLENCE && (
              <span 
                className="flex items-center gap-3 text-white text-[10px] font-black px-4 py-2 rounded-full shadow-xl border border-white/20"
                style={{ backgroundColor: COLORS.PRIMARY }}
              >
                <div className="relative w-5 h-5 flex items-center justify-center">
                  <i className="fas fa-star absolute text-[12px] -translate-x-0.5 -translate-y-0.5" style={{ color: COLORS.BLACK }}></i>
                  <i className="fas fa-star absolute text-[12px] translate-x-0.5 translate-y-0.5" style={{ color: COLORS.YELLOW }}></i>
                  <i className="fas fa-star absolute text-[12px]" style={{ color: COLORS.WHITE }}></i>
                </div>
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
              <span className="bg-white px-3 py-1.5 rounded-full text-black text-[10px] font-black uppercase tracking-tight shadow-lg">
                <i className="fas fa-building mr-1.5"></i> {project.partner}
              </span>
            )}
          </div>
          <h2 className="text-4xl font-black leading-tight max-w-2xl">{project.title}</h2>
          <p className="text-white/60 text-xs font-black tracking-widest mt-2 uppercase">Semester {project.year}.{project.semester}</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-10 space-y-12">
        {/* Project Video Section */}
        {project.videoUrl && (
          <section>
            <h3 className="text-xl font-black mb-6 flex items-center gap-2">
              <i className="fas fa-play-circle" style={{ color: COLORS.PRIMARY }}></i>
              Project Pitch & Demo
            </h3>
            <div className="relative w-full aspect-video rounded-[32px] overflow-hidden bg-black shadow-2xl border-4 border-gray-50">
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
              <span key={tag} className="px-3 py-1.5 bg-gray-100 text-[10px] font-bold text-gray-500 rounded-full uppercase tracking-tighter">
                #{tag}
              </span>
            ))}
          </div>
          <h3 className="text-2xl font-black mb-4" style={{ color: COLORS.BLACK }}>Executive Summary</h3>
          <p className="text-gray-600 leading-relaxed text-xl font-medium">
            {project.longDescription}
          </p>
        </section>

        {/* Media Gallery */}
        <section>
          <h3 className="text-xl font-black mb-6 flex items-center gap-2">
            <i className="fas fa-photo-film" style={{ color: COLORS.PRIMARY }}></i>
            Photo Gallery
          </h3>
          <div className="flex gap-6 overflow-x-auto pb-6 -mx-10 px-10 no-scrollbar">
            {project.galleryUrls.map((url, i) => (
              <div key={i} className="relative w-80 aspect-[16/10] shrink-0 rounded-3xl overflow-hidden shadow-xl border border-gray-100 bg-gray-50">
                <img src={url} className="w-full h-full object-cover" />
              </div>
            ))}
            
            <div 
              className="w-80 aspect-[16/10] shrink-0 rounded-3xl flex flex-col items-center justify-center p-8 text-center border-2 border-dashed border-gray-200"
              style={{ backgroundColor: COLORS.WHITE }}
            >
               <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-4">
                 <i className="fas fa-scroll text-3xl text-gray-300"></i>
               </div>
               <p className="font-black text-gray-900 mb-1">Technical Panel</p>
               <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-4">Official Poster</p>
               <button 
                className="px-6 py-2 rounded-full text-[10px] font-black uppercase text-white shadow-lg transition-transform active:scale-95"
                style={{ backgroundColor: COLORS.BLACK }}
               >
                 View Document
               </button>
            </div>
          </div>
        </section>

        {/* Team & Advisor */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <section className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
            <h3 className="text-[10px] font-black uppercase text-gray-400 mb-6 tracking-widest">Student Creators</h3>
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

          <section className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
            <h3 className="text-[10px] font-black uppercase text-gray-400 mb-6 tracking-widest">Faculty Advisor</h3>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-white border border-gray-200 flex items-center justify-center text-red-500 text-xl shadow-sm">
                <i className="fas fa-user-tie"></i>
              </div>
              <div>
                <p className="font-black text-base text-gray-900">{project.advisor}</p>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Research Supervisor</p>
              </div>
            </div>
            
            {project.partner && (
              <div className="pt-8 border-t border-gray-200">
                <p className="text-[9px] font-black uppercase text-gray-400 mb-3 tracking-widest">Industry Support</p>
                <div className="flex items-center gap-3">
                   <div className="px-4 py-2 bg-white rounded-xl shadow-sm border border-gray-100">
                     <p className="font-black text-sm" style={{ color: COLORS.BLACK }}>{project.partner}</p>
                   </div>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>

      {/* Persistent Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-white via-white to-transparent pointer-events-none">
        <button 
          onClick={onBack}
          className="w-full py-5 rounded-3xl font-black text-white shadow-2xl pointer-events-auto transition-all active:scale-95 bg-black tracking-widest uppercase text-xs"
        >
          BACK TO GALLERY
        </button>
      </div>
    </div>
  );
};

export default ProjectDetail;
