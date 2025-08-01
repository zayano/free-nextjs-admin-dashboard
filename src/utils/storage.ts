import { Request } from "@/types/request";

export const saveRequestsToLocal = (request: Request[]) => {
  localStorage.setItem('requests', JSON.stringify(request));
};

export const getRequestsFromLocal = (): Request[] => {
  if (typeof window === 'undefined') return [];
  
  const data = localStorage.getItem('requests');
  return data ? JSON.parse(data) : [];
};

export const addRequestToLocal = (newRequest: Omit<Request, 'id'>): Request => {
  const requests = getRequestsFromLocal();
  const newId = requests.length > 0 
    ? Math.max(...requests.map(r => r.id)) + 1 
    : 1;
  
  const requestWithId = { ...newRequest, id: newId };
  const updatedRequests = [requestWithId, ...requests];
  saveRequestsToLocal(updatedRequests);
  return requestWithId;
};