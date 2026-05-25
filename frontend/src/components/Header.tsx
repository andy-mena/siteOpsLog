import Logo from "./Logo"
import { MobileNav } from "./MobileNav"
import { Link } from "react-router-dom"

function Header() {
  return (
    <header id="header" className="py-5">
      <div className="header-container max-w-5xl mx-auto flex justify-between items-center px-5">
        <Logo/>
        <MobileNav/>
        <nav id="desktop-nav" className="hidden md:flex md:items-center md:gap-10">
          <Link to="/" className="text-primary hover:text-secondary duration-200">Crear reporte</Link>
          <Link to="/workReports" className="text-primary hover:text-secondary duration-200">Reportes</Link>
          <Link to="/sites" className="text-primary hover:text-secondary duration-200">Sitios</Link>
        </nav>
      </div>
    </header>
  )
}

export default Header