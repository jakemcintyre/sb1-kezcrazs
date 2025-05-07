export const formatDate = (date: Date): string => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const inputDate = new Date(date);
  const inputDay = new Date(inputDate.getFullYear(), inputDate.getMonth(), inputDate.getDate());

  if (inputDay.getTime() === today.getTime()) {
    return `Today at ${formatTime(inputDate)}`;
  } else if (inputDay.getTime() === yesterday.getTime()) {
    return `Yesterday at ${formatTime(inputDate)}`;
  } else {
    return `${inputDate.toLocaleDateString()} at ${formatTime(inputDate)}`;
  }
};

export const formatTime = (date: Date): string => {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

export const formatTimeRange = (start: Date, end: Date): string => {
  return `${formatTime(start)} - ${formatTime(end)}`;
};

export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(part => part.charAt(0))
    .join('')
    .toUpperCase();
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

export const getDaysFromToday = (date: Date): number => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const compareDate = new Date(date);
  compareDate.setHours(0, 0, 0, 0);
  
  const diffTime = compareDate.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const getDueStatusColor = (dueDate: Date): string => {
  const daysRemaining = getDaysFromToday(dueDate);
  
  if (daysRemaining < 0) return 'text-red-500';
  if (daysRemaining === 0) return 'text-amber-500';
  if (daysRemaining <= 2) return 'text-orange-500';
  return 'text-green-500';
};

export const getPriorityColor = (priority: string): string => {
  switch (priority) {
    case 'low': return 'bg-green-100 text-green-800';
    case 'medium': return 'bg-blue-100 text-blue-800';
    case 'high': return 'bg-orange-100 text-orange-800';
    case 'urgent': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export const getLeadStatusColor = (status: string): string => {
  switch (status) {
    case 'new': return 'bg-purple-100 text-purple-800';
    case 'contacted': return 'bg-blue-100 text-blue-800';
    case 'qualified': return 'bg-green-100 text-green-800';
    case 'negotiating': return 'bg-amber-100 text-amber-800';
    case 'closed': return 'bg-emerald-100 text-emerald-800';
    case 'lost': return 'bg-gray-100 text-gray-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export const getMessageStatusIndicator = (status: string): string => {
  switch (status) {
    case 'unread': return 'bg-blue-500';
    case 'read': return 'bg-gray-300';
    case 'replied': return 'bg-green-500';
    case 'archived': return 'bg-gray-400';
    default: return 'bg-gray-300';
  }
};

export const getPlatformColor = (platform: string): string => {
  switch (platform) {
    case 'facebook': return 'text-blue-600';
    case 'instagram': return 'text-pink-600';
    case 'linkedin': return 'text-blue-700';
    case 'google': return 'text-red-500';
    default: return 'text-gray-500';
  }
};