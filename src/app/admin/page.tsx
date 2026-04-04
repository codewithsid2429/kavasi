'use client';

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard Review</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-neutral-900 border border-white/10 p-6 rounded-2xl">
          <h3 className="text-neutral-400 mb-2">Total Contacts</h3>
          <p className="text-4xl font-bold">12</p>
        </div>
        <div className="bg-neutral-900 border border-white/10 p-6 rounded-2xl">
          <h3 className="text-neutral-400 mb-2">Projects in Portfolio</h3>
          <p className="text-4xl font-bold">4</p>
        </div>
        <div className="bg-neutral-900 border border-white/10 p-6 rounded-2xl">
          <h3 className="text-neutral-400 mb-2">Team Members</h3>
          <p className="text-4xl font-bold">2</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-6">Recent Contact Submissions</h2>
      <div className="bg-neutral-900 border border-white/10 rounded-2xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-neutral-800">
            <tr>
              <th className="p-4 font-medium text-neutral-400">Name</th>
              <th className="p-4 font-medium text-neutral-400">Email</th>
              <th className="p-4 font-medium text-neutral-400">Project Type</th>
              <th className="p-4 font-medium text-neutral-400">Date</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-white/10">
              <td className="p-4">Demo User</td>
              <td className="p-4">demo@example.com</td>
              <td className="p-4">AI Automation</td>
              <td className="p-4">Today</td>
            </tr>
            <tr>
              <td className="p-4 text-center text-neutral-500" colSpan={4}>
                Contact API logic implemented. In a full production build, fetch actual contacts from /api/contacts.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
