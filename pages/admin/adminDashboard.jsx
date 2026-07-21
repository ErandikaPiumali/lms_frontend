import { FaUsers, FaBook, FaChartLine, FaClipboard } from "react-icons/fa";

export default function AdminDashboard () {

  // Temporary static data 
  const stats = [
    { title: "Total Users", value: 0, icon: <FaUsers /> },
    { title: "Courses", value: 0, icon: <FaBook /> },
    { title: "Total Enrollment", value: 0, icon: <FaClipboard /> },
    { title: "Revenue", value: "0", icon: <FaChartLine /> },
  ];
 // Temporary static data 
  const recentEnrollments = [
    { userId: "ST26-0000", name: "Nimal Perera", course: "English", date: "2026-04-28" },
    { userId: "ST26-0000", name: "Kamal Silva", course: "Mathematics", date: "2026-04-27" },
    { userId: "ST26-0000", name: "Saman Kumara", course: "Science", date: "2026-04-26" },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

     
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500 text-4xl">Welcome back, Admin</p>
      </div>

    
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-white p-5 rounded-2xl shadow flex items-center justify-between"
          >
            <div>
              <p className="text-gray-500 text-sm">{item.title}</p>
              <h2 className="text-xl font-semibold text-gray-800">
                {item.value}
              </h2>
            </div>
            <div className="text-2xl text-blue-500">
              {item.icon}
            </div>
          </div>
        ))}
      </div>

     
      <div className="bg-white p-6 rounded-2xl shadow mb-8">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">
          Overview Chart
        </h2>
        <div className="h-64 flex items-center justify-center text-gray-400">
          Chart is loading
        </div>
      </div>

     
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">
          Recent Enrollments
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-500 border-b">
                <th className="py-2">Student</th>
                <th className="py-2">Course</th>
                <th className="py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentEnrollments.map((item) => (
                <tr key={item.userId} className="border-b hover:bg-gray-50">
                  <td className="py-2">{item.name}</td>
                  <td className="py-2">{item.course}</td>
                  <td className="py-2">{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}