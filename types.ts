
export enum ProjectCategory {
  SOFTWARE = 'Software Engineering',
  HARDWARE = 'Hardware & IoT',
  AI = 'Artificial Intelligence',
  DESIGN = 'UX/UI Design',
  ROBOTICS = 'Robotics'
}

export enum AwardType {
  NONE = 'None',
  FEATURED = 'Falconi Featured Project',
  EXCELLENCE = 'Falconi Excellence Project'
}

export interface Student {
  id: string;
  name: string;
  role: string;
  photoUrl?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  semester: '1' | '2';
  year: number;
  category: ProjectCategory;
  thumbnailUrl: string;
  videoUrl?: string;
  galleryUrls: string[];
  presentationUrl?: string;
  awardType: AwardType;
  students: Student[];
  advisor: string;
  longDescription: string;
  tags: string[];
  partner?: string;
}

export type ViewState = 'IDLE' | 'DASHBOARD' | 'PROJECT_DETAIL' | 'AWARDS_WALL';
