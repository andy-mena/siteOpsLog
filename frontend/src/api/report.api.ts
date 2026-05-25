/* eslint-disable preserve-caught-error */
import api from "../config/axios";
import { isAxiosError } from "axios"
import type { ReportFormData, SiteReport, Sites } from "../types/reports/reports.types";

export const createReport = async  (reportData: ReportFormData) => {
    const url = "/work-report/create"
    try {
        const { data } = await api.post<string>(url, reportData);
        console.log(data)
        return data;
    } catch (error) {
        console.log(error)
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.message)
        }
    }

}

export const getAllReports = async () => {
    try {
        const { data } = await api.get<SiteReport[]>('/work-report/work-reports')
        console.log(data)
        return data;
        
    } catch (error : unknown) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.message)
        }
        
    }
}

export const getSiteByInputId = async (siteId : Sites["siteId"]) => {
    try {
        const { data } = await api.get<Sites>(`/site/${siteId}`)
        return {
            siteId: data.siteId,
            name: data.name
        }
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.message)
        }
    }

}