/* eslint-disable preserve-caught-error */

import api from "../config/axios";
import { isAxiosError } from "axios";
import type { Sites } from "../types/reports/reports.types";

export const getSites = async () => {
    const url = "/site/sites";
    try {
        const { data } = await api.get<Sites[]>(url);
        console.log(data)
        return data;

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message)
        }
    }
}