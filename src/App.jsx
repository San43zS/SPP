import { useState } from 'react'
import Navigation from './components/Navigation'
import HomePage from './pages/HomePage'
import ProjectsPage from './pages/ProjectsPage'
import ProfilePage from './pages/ProfilePage'
import './App.css'
import './pages/pages.css'

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />
      case 'projects':
        return <ProjectsPage />
      case 'profile':
        return <ProfilePage />
      default:
        return <HomePage />
    }
  }

  return (
    <div className="app">
      <Navigation 
        currentPage={currentPage} 
        onPageChange={setCurrentPage} 
      />
      <main className="main-content">
        {renderPage()}
      </main>
    </div>
  )
}

export default App
