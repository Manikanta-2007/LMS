// Mock Data for UI Fallback

export const mockResources = [
  {
    _id: "mock-res-1",
    title: "Introduction to React",
    description: "A comprehensive guide to building user interfaces with React. Covers components, state, and hooks.",
    resourceType: "Notes",
    subject: "Computer Science",
    category: "Technology",
    downloadsCount: 120,
    tags: ["react", "frontend", "javascript"],
    fileUrl: "#"
  },
  {
    _id: "mock-res-2",
    title: "Advanced Data Structures",
    description: "Deep dive into complex data structures like graphs, trees, and advanced priority queues.",
    resourceType: "Textbook",
    subject: "Computer Science",
    category: "Technology",
    downloadsCount: 340,
    tags: ["data structures", "algorithms"],
    fileUrl: "#"
  },
  {
    _id: "mock-res-3",
    title: "Physics: Quantum Mechanics",
    description: "Lecture slides covering the fundamentals of quantum mechanics and particle physics.",
    resourceType: "Slides",
    subject: "Physics",
    category: "Science",
    downloadsCount: 85,
    tags: ["physics", "science", "quantum"],
    fileUrl: "#"
  }
];



export const mockFeedback = [
  {
    _id: "mock-feed-1",
    user: { name: "Offline Guest", email: "guest@offline.com" },
    message: "This LMS platform is very helpful for my studies. The resources are easy to find.",
    status: "pending",
    createdAt: new Date().toISOString()
  },
  {
    _id: "mock-feed-2",
    user: { name: "Jane Doe", email: "jane@demo.com" },
    message: "Could we get more materials on advanced machine learning algorithms?",
    status: "reviewed",
    createdAt: new Date(Date.now() - 86400000).toISOString() // 1 day ago
  }
];

export const mockDashboardStats = {
  totalUsers: 42,
  totalResources: 156,
  totalDownloads: 1205,
  recentActivity: [
    { type: "user_registered", detail: "New student joined", time: "2 hours ago" },
    { type: "resource_added", detail: "Added 'Introduction to React'", time: "5 hours ago" },
    { type: "feedback_received", detail: "New feedback from Jane Doe", time: "1 day ago" }
  ]
};
