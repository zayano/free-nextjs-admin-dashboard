export interface Request {
  id: number;
  module: string;
  name: string;
  priority: string;
  description: string;
  status: string;
  relation: string;
  createdAt: string;
  requestedBy: string;
  notes: string;
  reference: File | null; // Assuming reference can be a file or null
}