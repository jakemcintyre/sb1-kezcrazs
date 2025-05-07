export type Platform = 'facebook' | 'instagram' | 'linkedin' | 'google' | 'other';

export type MessageStatus = 'unread' | 'read' | 'replied' | 'archived';

export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'negotiating' | 'closed' | 'lost';

export type PriorityLevel = 'low' | 'medium' | 'high' | 'urgent';

export type Reminder = {
  id: string;
  title: string;
  description?: string;
  dueDate: Date;
  completed: boolean;
  priority: PriorityLevel;
  contactId?: string;
};

export type Contact = {
  id: string;
  name: string;
  avatar?: string;
  platforms: Platform[];
  leadStatus: LeadStatus;
  priority: PriorityLevel;
  lastContact?: Date;
  notes?: string;
};

export type Message = {
  id: string;
  contactId: string;
  platform: Platform;
  content: string;
  timestamp: Date;
  status: MessageStatus;
  isOutgoing: boolean;
};

export type Appointment = {
  id: string;
  contactId: string;
  title: string;
  description?: string;
  startTime: Date;
  endTime: Date;
  location?: string;
  notes?: string;
  reminderSet: boolean;
};

export type DashboardMetric = {
  title: string;
  value: number;
  change: number;
  isPositive: boolean;
};