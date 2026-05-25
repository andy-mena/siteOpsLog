import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./view/Home"
import WorkReports from "./view/WorkReports"
import AppLayout from "./layouts/AppLayout"
import Sites from "./view/Sites"


export const RouteConfig = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout/>}>
                    <Route index path="/" element={<Home/>}/>
                    <Route path="/workReports" element={<WorkReports/>}/> 
                    <Route path="/sites" element={<Sites/>}/>
                </Route>
            </Routes>
        
        </BrowserRouter>
    )
}