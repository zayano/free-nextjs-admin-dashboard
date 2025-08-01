"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Request } from '@/types/request';
import { 
  getRequestsFromLocal, 
  saveRequestsToLocal,
  addRequestToLocal 
} from '@/utils/storage';

interface RequestContextType {
  requests: Request[];
  addRequest: (newRequest: Omit<Request, 'id'>) => void;
  isLoading: boolean;
}

const RequestContext = createContext<RequestContextType | undefined>(undefined);

export const RequestProvider = ({ children }: { children: React.ReactNode }) => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load data from local storage on component mount
    const savedRequests = getRequestsFromLocal();
    if (savedRequests.length === 0) {
      // Initialize with sample data if empty
      saveRequestsToLocal(requests);
      setRequests(requests);
    } else {
      setRequests(savedRequests);
    }
    setIsLoading(false);
  }, [requests]);

  const addRequest = (newRequest: Omit<Request, 'id'>) => {
    setIsLoading(true);
    try {
      const addedRequest = addRequestToLocal(newRequest);
      setRequests(prev => [addedRequest, ...prev]);
    } catch (error) {
      console.error('Failed to add request:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <RequestContext.Provider value={{ requests, addRequest, isLoading }}>
      {children}
    </RequestContext.Provider>
  );
};

export const useRequests = () => {
  const context = useContext(RequestContext);
  if (!context) {
    throw new Error('useRequests must be used within a RequestProvider');
  }
  return context;
};