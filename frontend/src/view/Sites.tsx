import SitesTable from "../components/sites/SitesTable"

function Sites() {
    return (
        <>
            <div className="flex flex-col gap-y-1 justify-center">
                <h1 className="text-4xl text-primary font-bold text-center">Sitios y Ubicación</h1>
                <span className="text-sm text-gray text-center md:max-w-xl mx-auto">Este módulo centraliza la información de todos los sitios disponibles, donde podrás acceder a su ubicación con un solo click.</span>
            </div>

            <div className="my-10">
                <SitesTable />
            </div>
        </>
    )
}

export default Sites