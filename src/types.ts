export type ArtifactType = 
  | 'Decision Log'
  | 'Technical Spec'
  | 'Hardware SOP'
  | 'Meeting Synthesis'
  | 'Grant & Funding'
  | 'Post-Mortem'
  | 'Chat Capture';

export type ArtifactStatus = 'active' | 'verified' | 'needs_review' | 'archived';

export interface ActionItem {
  id?: string;
  task: string;
  owner: string;
  deadline: string;
  completed?: boolean;
}

export interface Attachment {
  name: string;
  type: string;
  size: string;
}

export interface ContinuityArtifact {
  id: string;
  title: string;
  podId: string;
  podName: string;
  type: ArtifactType;
  status: ArtifactStatus;
  summary: string;
  content: string;
  author: string;
  authorRole: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  keyDecisions: string[];
  actionItems?: ActionItem[];
  lessonsLearned?: string[];
  citations?: string[];
  attachments?: Attachment[];
  version: string;
  views: number;
  verifiedBy?: string;
  starred?: boolean;
}

export interface Pod {
  id: string;
  name: string;
  code: string;
  tagline: string;
  description: string;
  lead: string;
  leadRole: string;
  location: string;
  memberCount: number;
  activeProjects: number;
  continuityScore: number; // 0 - 100
  color: string;
  accentBg: string;
  iconName: string;
  tags: string[];
  equipmentList: string[];
}

export interface CitationReference {
  id: string;
  title: string;
  podName: string;
  type: string;
  excerpt: string;
  relevanceScore: number;
}

export interface PodMindMessage {
  id: string;
  sender: 'user' | 'podmind';
  text: string;
  timestamp: string;
  citations?: CitationReference[];
  suggestedFollowUps?: string[];
  isGenerating?: boolean;
}

export interface ContinuityAuditResult {
  resilienceScore: number;
  rating: string;
  summary: string;
  keyStrengths: string[];
  criticalGaps: string[];
  recommendations: string[];
}

export interface SynergyConnection {
  id: string;
  sourcePodId: string;
  sourcePodName: string;
  targetPodId: string;
  targetPodName: string;
  artifactTitle: string;
  synergyType: 'Shared Hardware SOP' | 'Cross-Disciplinary Sensor' | 'Grant Collaboration' | 'Shared Firmware';
  description: string;
  impact: string;
}
