
import React from 'react'
import { 
  BarChart,
  FileText,
  Plus,
  Image,
  Settings
} from 'lucide-react'

interface AdminSidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart },
    { id: 'articles', label: 'Articles', icon: FileText },
    { id: 'new-article', label: 'New Article', icon: Plus },
    { id: 'media', label: 'Media', icon: Image },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]

  return (
    <nav className="bg-white rounded-lg shadow-md p-4">
      <ul className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <li key={item.id}>
              <button
                onClick={() => setActiveTab(item.id)}
                className={`w-full text-left px-3 py-2 rounded flex items-center space-x-2 ${
                  activeTab === item.id ? 'bg-red-100 text-red-600' : 'hover:bg-gray-100'
                }`}
              >
                <Icon size={16} />
                <span>{item.label}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default AdminSidebar
