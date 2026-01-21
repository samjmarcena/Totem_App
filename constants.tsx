
import { Project, ProjectCategory, AwardType } from './types';

export const COLORS = {
  PRIMARY: '#EF3340', // PANTONE 2034 C
  WHITE: '#FFFFFF',
  BLACK: '#000000',
  TEAL: '#00AFAD',    // PANTONE 3258 C
  LIME: '#84BD00',    // PANTONE 7487 C
  YELLOW: '#FEDD00',  // PANTONE YELLOW C
  ORANGE: '#E89923',  // PANTONE 7411 C
  MAGENTA: '#DF1995', // PANTONE 218 C
  PURPLE: '#802FDE',  // PANTONE 2593 C
};

export const PARTNERS = [
  'Mercedes-Benz', 'WEG', 'Dell', 'TATA', 'Bosch', 'Siemens', 'Embraer', 
  'Intel', 'Microsoft', 'Google', 'Amazon', 'Meta', 'Tesla', 'Volvo', 
  'Scania', 'General Electric', 'Schneider Electric', 'Rockwell Automation',
  'Cisco', 'IBM', 'Oracle', 'HP', 'Lenovo', 'Samsung', 'LG', 'Sony',
  'Toyota', 'Honda', 'Hyundai', 'Ford', 'General Motors', 'Petrobras',
  'Vale', 'Suzano', 'Natura', 'Ambev', 'BTG Pactual', 'Itau', 'Santander'
].sort();

export const MOCK_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Aura Smart Helmets',
    description: 'Next-gen motorcycle helmet with AR safety overlays.',
    semester: '2',
    year: 2023,
    category: ProjectCategory.HARDWARE,
    thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/34/RR1-_Dell_Campus.jpg',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    galleryUrls: [
      'https://images.unsplash.com/photo-1558981403-c5f91cbba527?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1600192004735-3929497e8838?auto=format&fit=crop&q=80&w=800',
    ],
    awardType: AwardType.EXCELLENCE,
    students: [
      { id: 's1', name: 'Ana Silva', role: 'Hardware Lead' },
      { id: 's2', name: 'Marco Polo', role: 'UX Designer' }
    ],
    advisor: 'Dr. Elizabeth Stone',
    longDescription: 'Aura is a smart helmet designed to reduce accidents by providing heads-up display navigation and blind-spot detection via ultrasonic sensors.',
    tags: ['IoT', 'Safety', 'AR', 'Vision'],
    partner: 'Mercedes-Benz'
  },
  {
    id: '2',
    title: 'EcoTrack AI',
    description: 'Personalized carbon footprint tracker using machine learning.',
    semester: '1',
    year: 2024,
    category: ProjectCategory.AI,
    thumbnailUrl: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=800',
    galleryUrls: [
      'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=800',
    ],
    awardType: AwardType.FEATURED,
    students: [
      { id: 's3', name: 'Joao Santos', role: 'ML Engineer' },
      { id: 's4', name: 'Beatriz Costa', role: 'Data Scientist' }
    ],
    advisor: 'Prof. Ricardo Gomes',
    longDescription: 'EcoTrack uses computer vision to identify groceries and estimate their environmental impact.',
    tags: ['Sustainability', 'ML', 'Data Science'],
    partner: 'Dell'
  },
  {
    id: '3',
    title: 'Industrial Automation 4.0',
    description: 'Predictive maintenance system for large scale electrical motors.',
    semester: '1',
    year: 2024,
    category: ProjectCategory.HARDWARE,
    thumbnailUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800',
    galleryUrls: [
      'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800',
    ],
    awardType: AwardType.NONE,
    students: [
      { id: 's5', name: 'Carlos Lima', role: 'Robotics Engineer' },
      { id: 's6', name: 'Elena Gilbert', role: 'Systems Architect' }
    ],
    advisor: 'Dr. Sarah Connor',
    longDescription: 'Implementing advanced sensor networks for real-time monitoring of industrial machines.',
    tags: ['Automation', 'Industrial', 'IoT'],
    partner: 'WEG'
  },
  {
    id: '4',
    title: 'Smart City Mesh',
    description: 'Low-latency connectivity network for urban logistics.',
    semester: '2',
    year: 2022,
    category: ProjectCategory.SOFTWARE,
    thumbnailUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800',
    galleryUrls: [
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800',
    ],
    awardType: AwardType.NONE,
    students: [
      { id: 's7', name: 'Lucas Ferreira', role: 'Network Engineer' }
    ],
    advisor: 'Prof. James Watt',
    longDescription: 'A robust mesh networking solution designed for high-density urban environments.',
    tags: ['Networking', 'Logistics', 'Cloud'],
    partner: 'TATA'
  },
  {
    id: '5',
    title: 'BioSentry Monitoring',
    description: 'Wearable health patch for continuous glucose monitoring.',
    semester: '1',
    year: 2023,
    category: ProjectCategory.HARDWARE,
    thumbnailUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800',
    galleryUrls: ['https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800'],
    awardType: AwardType.EXCELLENCE,
    students: [{ id: 's8', name: 'Gabriel Mendes', role: 'Biomedical Engineer' }],
    advisor: 'Dr. House',
    longDescription: 'A non-invasive approach to monitoring blood sugar levels using interstitial fluid analysis.',
    tags: ['HealthTech', 'Biotech', 'Wearables'],
    partner: 'Siemens'
  },
  {
    id: '6',
    title: 'Autonomous Drone Swarm',
    description: 'Coordinated flight systems for search and rescue operations.',
    semester: '2',
    year: 2024,
    category: ProjectCategory.ROBOTICS,
    thumbnailUrl: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&q=80&w=800',
    galleryUrls: ['https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&q=80&w=800'],
    awardType: AwardType.FEATURED,
    students: [{ id: 's9', name: 'Sofia Oliveira', role: 'Robotics Lead' }],
    advisor: 'Prof. Xavier',
    longDescription: 'Drones that communicate with each other to map disaster zones 10x faster than traditional methods.',
    tags: ['Drones', 'AI', 'Rescue'],
    partner: 'Embraer'
  },
  {
    id: '7',
    title: 'Quantum Ledger',
    description: 'Post-quantum cryptography for financial systems.',
    semester: '1',
    year: 2022,
    category: ProjectCategory.SOFTWARE,
    thumbnailUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=800',
    galleryUrls: ['https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=800'],
    awardType: AwardType.NONE,
    students: [{ id: 's10', name: 'Arthur Lima', role: 'Security Analyst' }],
    advisor: 'Dr. Satoshi',
    longDescription: 'Securing the future of banking against quantum computing threats.',
    tags: ['Crypto', 'Security', 'Fintech'],
    partner: 'BTG Pactual'
  },
  {
    id: '8',
    title: 'Urban Hydroponics',
    description: 'Fully automated vertical farming for dense cities.',
    semester: '2',
    year: 2023,
    category: ProjectCategory.DESIGN,
    thumbnailUrl: 'https://images.unsplash.com/photo-1558449028-b53a39d100fc?auto=format&fit=crop&q=80&w=800',
    galleryUrls: ['https://images.unsplash.com/photo-1558449028-b53a39d100fc?auto=format&fit=crop&q=80&w=800'],
    awardType: AwardType.EXCELLENCE,
    students: [{ id: 's11', name: 'Mariana Duarte', role: 'Product Designer' }],
    advisor: 'Prof. Gaia',
    longDescription: 'Feeding the future with low-water, high-yield vertical systems.',
    tags: ['AgroTech', 'Design', 'Sustainability'],
    partner: 'Natura'
  }
    {
    id: '1910',
    title: 'Sport Club Corinthians Paulista',
    description: 'Corinthians vence o Vasco da Gama por 2 a 1 no Maracaná e levanta sua quarta Copa do Brasil',
    semester: '2',
    year: 2025,
    category: ProjectCategory.DESIGN,
    thumbnailUrl: 'https://static-goengines.gocase.com.br/uploads/image/349415/src/5c3134417a50046a4bb8033e07ed4366.png',
    galleryUrls: ['https://static.gazetaesportiva.com/uploads/2025/12/AFP__20251221__88TF83M__v6__HighRes__TopshotFblBraCupVascoCorinthians.webp'],
    awardType: AwardType.EXCELLENCE,
    students: [{ id: 's13', name: 'Memphis Depay', role: 'Product Designer' },
    { id: 's14', name: 'Yuri Alberto', role: 'Product Creator' }],
    advisor: 'Prof. Dorival Junior',
    longDescription: 'O MARACANA É NOSSO',
    tags: ['AgroTech', 'Design', 'Sustainability'],
    partner: 'Natura'
  }
];
