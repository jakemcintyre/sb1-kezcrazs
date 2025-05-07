import { Appointment, Contact, DashboardMetric, Message, Reminder } from '../types';

// Generate dates relative to current time
const now = new Date();
const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

export const mockContacts: Contact[] = [
  {
    id: '1',
    name: 'John Smith',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    platforms: ['facebook', 'linkedin'],
    leadStatus: 'qualified',
    priority: 'high',
    lastContact: yesterday,
    notes: 'Interested in our premium package'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    platforms: ['instagram', 'facebook'],
    leadStatus: 'contacted',
    priority: 'medium',
    lastContact: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
    notes: 'Follow up about pricing options'
  },
  {
    id: '3',
    name: 'Michael Chen',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    platforms: ['linkedin', 'google'],
    leadStatus: 'new',
    priority: 'urgent',
    lastContact: new Date(now.getTime() - 15 * 60 * 1000),
    notes: 'New inquiry about enterprise solutions'
  },
  {
    id: '4',
    name: 'Emily Wilson',
    avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    platforms: ['facebook'],
    leadStatus: 'negotiating',
    priority: 'high',
    lastContact: new Date(now.getTime() - 4 * 60 * 60 * 1000),
    notes: 'Discussing contract terms'
  },
  {
    id: '5',
    name: 'David Rodriguez',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    platforms: ['google', 'instagram'],
    leadStatus: 'closed',
    priority: 'low',
    lastContact: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000),
    notes: 'Successfully closed deal on basic package'
  }
];

export const mockMessages: Message[] = [
  {
    id: '1',
    contactId: '1',
    platform: 'facebook',
    content: 'Hi there, I'm interested in your services. Can you tell me more about your premium package?',
    timestamp: new Date(yesterday.getTime() + 10 * 60 * 60 * 1000),
    status: 'read',
    isOutgoing: false
  },
  {
    id: '2',
    contactId: '1',
    platform: 'facebook',
    content: 'Our premium package includes all features plus priority support. Would you like to schedule a demo?',
    timestamp: new Date(yesterday.getTime() + 11 * 60 * 60 * 1000),
    status: 'read',
    isOutgoing: true
  },
  {
    id: '3',
    contactId: '1',
    platform: 'facebook',
    content: 'That sounds great. When are you available for a demo?',
    timestamp: new Date(now.getTime() - 5 * 60 * 60 * 1000),
    status: 'unread',
    isOutgoing: false
  },
  {
    id: '4',
    contactId: '2',
    platform: 'instagram',
    content: 'Hey, I saw your post about your new product line. Do you offer any discounts for bulk orders?',
    timestamp: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
    status: 'read',
    isOutgoing: false
  },
  {
    id: '5',
    contactId: '3',
    platform: 'linkedin',
    content: 'Hello, I'm interested in discussing how your enterprise solutions could work for our company.',
    timestamp: new Date(now.getTime() - 15 * 60 * 1000),
    status: 'unread',
    isOutgoing: false
  },
  {
    id: '6',
    contactId: '4',
    platform: 'facebook',
    content: 'I've reviewed the contract and have a few questions about section 3.2 regarding implementation timelines.',
    timestamp: new Date(now.getTime() - 4 * 60 * 60 * 1000),
    status: 'unread',
    isOutgoing: false
  },
  {
    id: '7',
    contactId: '5',
    platform: 'google',
    content: 'Thank you for your help with setting up our account. The system is working great!',
    timestamp: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000),
    status: 'archived',
    isOutgoing: false
  }
];

export const mockAppointments: Appointment[] = [
  {
    id: '1',
    contactId: '1',
    title: 'Product Demo',
    description: 'Demonstrate premium package features',
    startTime: tomorrow,
    endTime: new Date(tomorrow.getTime() + 60 * 60 * 1000),
    location: 'Zoom Meeting',
    notes: 'Prepare pricing sheet and feature comparison',
    reminderSet: true
  },
  {
    id: '2',
    contactId: '4',
    title: 'Contract Review',
    description: 'Go through contract details and negotiate terms',
    startTime: new Date(tomorrow.getTime() + 3 * 60 * 60 * 1000),
    endTime: new Date(tomorrow.getTime() + 4 * 60 * 60 * 1000),
    location: 'Office',
    notes: 'Bring printed copies of previous agreements',
    reminderSet: true
  },
  {
    id: '3',
    contactId: '3',
    title: 'Initial Consultation',
    description: 'Discuss enterprise solution needs',
    startTime: nextWeek,
    endTime: new Date(nextWeek.getTime() + 90 * 60 * 1000),
    location: 'Google Meet',
    notes: 'Prepare case studies and ROI calculations',
    reminderSet: false
  }
];

export const mockReminders: Reminder[] = [
  {
    id: '1',
    title: 'Follow up with Sarah about pricing options',
    description: 'Send custom quote based on her business needs',
    dueDate: tomorrow,
    completed: false,
    priority: 'medium',
    contactId: '2'
  },
  {
    id: '2',
    title: 'Prepare presentation for Michael',
    description: 'Create custom demo highlighting enterprise features',
    dueDate: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000),
    completed: false,
    priority: 'high',
    contactId: '3'
  },
  {
    id: '3',
    title: 'Send thank you note to David',
    description: 'Include referral program information',
    dueDate: new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000),
    completed: true,
    priority: 'low',
    contactId: '5'
  }
];

export const mockDashboardMetrics: DashboardMetric[] = [
  {
    title: 'Unread Messages',
    value: 3,
    change: 2,
    isPositive: false
  },
  {
    title: 'Active Leads',
    value: 4,
    change: 1,
    isPositive: true
  },
  {
    title: 'Upcoming Appointments',
    value: 3,
    change: 2,
    isPositive: true
  },
  {
    title: 'Pending Follow-ups',
    value: 2,
    change: 0,
    isPositive: true
  },
  {
    title: 'Conversion Rate',
    value: 35,
    change: 5,
    isPositive: true
  },
  {
    title: 'Avg. Response Time',
    value: 45,
    change: 10,
    isPositive: true
  }
];