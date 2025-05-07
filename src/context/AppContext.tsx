import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Appointment, Contact, Message, Reminder } from '../types';
import { mockAppointments, mockContacts, mockMessages, mockReminders } from '../data/mockData';

interface AppContextType {
  contacts: Contact[];
  messages: Message[];
  appointments: Appointment[];
  reminders: Reminder[];
  selectedContactId: string | null;
  isDarkMode: boolean;
  setSelectedContactId: (id: string | null) => void;
  toggleDarkMode: () => void;
  markMessageAsRead: (id: string) => void;
  toggleReminderComplete: (id: string) => void;
  addReminder: (reminder: Omit<Reminder, 'id'>) => void;
  addAppointment: (appointment: Omit<Appointment, 'id'>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [contacts, setContacts] = useState<Contact[]>(mockContacts);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
  const [reminders, setReminders] = useState<Reminder[]>(mockReminders);
  const [selectedContactId, setSelectedContactId] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  const markMessageAsRead = (id: string) => {
    setMessages(prevMessages =>
      prevMessages.map(message =>
        message.id === id ? { ...message, status: 'read' } : message
      )
    );
  };

  const toggleReminderComplete = (id: string) => {
    setReminders(prevReminders =>
      prevReminders.map(reminder =>
        reminder.id === id ? { ...reminder, completed: !reminder.completed } : reminder
      )
    );
  };

  const addReminder = (reminder: Omit<Reminder, 'id'>) => {
    const newReminder = {
      ...reminder,
      id: `reminder-${Date.now()}`
    };
    setReminders(prev => [...prev, newReminder]);
  };

  const addAppointment = (appointment: Omit<Appointment, 'id'>) => {
    const newAppointment = {
      ...appointment,
      id: `appointment-${Date.now()}`
    };
    setAppointments(prev => [...prev, newAppointment]);
  };

  return (
    <AppContext.Provider
      value={{
        contacts,
        messages,
        appointments,
        reminders,
        selectedContactId,
        isDarkMode,
        setSelectedContactId,
        toggleDarkMode,
        markMessageAsRead,
        toggleReminderComplete,
        addReminder,
        addAppointment
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};