import { ReportForm } from "../components/reports/ReportForm"

function Home() {
  return (
    <>
      <div className="flex flex-col gap-y-1 justify-center">
        <h1 className="text-4xl text-primary font-bold text-center">Crear Reporte</h1>
        <span className="text-sm text-gray text-center md:max-w-xl mx-auto">Bienvenido a la página de creación de reportes, genera tu reporte y no pierdas tu seguimiento.</span>
      </div>

      {/**Service Report Formulario */}
      <div className="my-10">
        <ReportForm />
      </div>

    </>
  )
}

export default Home