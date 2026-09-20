import './App.css'
import { Navbar } from './Navbar'
function App() {

  const menuItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Services', href: '/services'},
    { label: 'Portfolio', href: '/portfolio' },
  ];

  return (
    <>
      <div> 
        <Navbar logo="My Portfolio" items={menuItems} />
      </div>
    </>
  )
}

export default App
