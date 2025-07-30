interface Request {
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

// Define the table data using the interface
export const tableData: Request[] = [
  {
    id: 1,
    module: "User Management",
    name: "Add New User",
    priority: "High",
    description: "Need to add a new user to the system.",
    status: "Dalam Review",
    relation: "None",
    createdAt: "2023-10-01",
    requestedBy: "Admin",
    notes: "Urgent request for new user creation.",
    reference: null, // Assuming no file reference for this request
  },
  {
    id: 2,
    module: "Content Management",
    name: "Update Homepage Content",
    priority: "Medium",
    description: "Update the text and images on the homepage.",
    status: "Di Setujui",
    relation: "Homepage",
    createdAt: "2023-10-02",
    requestedBy: "Content Team",
    notes: "Need to refresh the homepage content.",
    reference: null, // Assuming no file reference for this request
  },
  {
    id: 3,
    module: "Analytics",
    name: "Add New Analytics Dashboard",
    priority: "Low",
    description: "Create a new dashboard for analytics tracking.",
    status: "Draft",
    relation: "Analytics Module",
    createdAt: "2023-10-03",
    requestedBy: "Analytics Team",
    notes: "Dashboard created successfully.",
    reference: null, // Assuming no file reference for this request
  },
  // Add more requests as needed
];