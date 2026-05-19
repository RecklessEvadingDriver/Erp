export const defaultDashboard = {
  students: 1240,
  teachers: 62,
  attendanceToday: 1087,
  fees: { total: 1200000, paid: 930000 },
  branches: ['Main', 'North', 'South'],
  chartData: [
    { month: 'Jan', revenue: 12000, expense: 4200 },
    { month: 'Feb', revenue: 18000, expense: 6900 },
    { month: 'Mar', revenue: 24000, expense: 8300 },
    { month: 'Apr', revenue: 21000, expense: 7200 },
    { month: 'May', revenue: 27000, expense: 8100 },
  ],
};

export const sampleStudents = [
  { id: 'S-1001', name: 'Ananya Singh', course: 'JEE Advanced', batch: 'A1', status: 'Active' },
  { id: 'S-1002', name: 'Rahul Verma', course: 'NEET', batch: 'B2', status: 'Active' },
  { id: 'S-1003', name: 'Meera Patel', course: 'Foundation 10', batch: 'C1', status: 'Pending Fees' },
];

export const sampleNotifications = [
  { id: 1, title: 'Exam Schedule Published', time: '2m ago' },
  { id: 2, title: 'New Assignment Uploaded', time: '30m ago' },
  { id: 3, title: 'Fee Reminder Sent', time: '1h ago' },
];
