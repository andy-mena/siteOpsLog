import { WorkReportsTable } from "../components/workreports/WorkReportsTable"

function WorkReports() {
    return (
        <>
            <div className="flex flex-col gap-y-1 justify-center">
                <h1 className="text-4xl text-primary font-bold text-center">Mis Reportes</h1>
                <span className="text-sm text-gray text-center md:max-w-xl mx-auto">Este módulo centraliza su información, permitiéndole consultar y gestionar el historial completo de los reportes.</span>
            </div>

            <div className="my-10">
                <WorkReportsTable />
            </div>
        </>
    )
}

export default WorkReports