
import React from 'react'
import { FileText, Eye, Users, BarChart } from 'lucide-react'

interface AdminDashboardStatsProps {
  totalArticles: number
}

const AdminDashboardStats: React.FC<AdminDashboardStatsProps> = ({ totalArticles }) => {
  const stats = [
    { label: 'Total Articles', value: totalArticles, icon: FileText, color: 'text-blue-500' },
    { label: 'Monthly Views', value: '45.2K', icon: Eye, color: 'text-green-500' },
    { label: 'Subscribers', value: '1,234', icon: Users, color: 'text-purple-500' },
    { label: 'Engagement', value: '87%', icon: BarChart, color: 'text-red-500' },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <Icon className={stat.color} size={24} />
              <div className="ml-4">
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default AdminDashboardStats
