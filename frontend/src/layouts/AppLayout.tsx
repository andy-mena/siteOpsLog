import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { Toaster} from "sonner"

function AppLayout() {
  return (
    <>
      <Header />
      <main className="max-w-2xl lg:max-w-4xl mx-auto lg:mt-10 p-5">
        <Outlet />
        <Toaster
          position="top-right"
        />
      </main>
      <Footer />
    </>

  )
}

export default AppLayout