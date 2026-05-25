import type { Request, Response } from 'express';
import WorkReport from "../models/WorkReportSchema";
import Site from "../models/SitesSchema";

const TEMP_USER_ID = "6a063d872752eb6c7b29aec4";

export class WorkReportController {

    public static async createWorkReport(request: Request, response: Response) {

        const { siteId } = request.body;
        console.log(request.body)

        const siteDoc = await Site.findOne({ siteId: siteId });
        console.log(siteDoc)

        if (!siteDoc) {
            return response.status(404).json({ message: "Site not found" });
        }

        const reportToSave = {
            ...request.body,
            site: siteDoc._id,
            reportedBy: TEMP_USER_ID
        }
        const newWorkReport = new WorkReport(reportToSave);

        try {
            await newWorkReport.save();
            return response.status(201).send("Registro creado con éxito");
        } catch (error) {
            console.error("Error creating work report:", error);
            return response.status(500).json({ message: "Internal server error" });
        }
    }

    public static async getAllWorkReports(request: Request, response: Response) {
        try {
            const workReports = await WorkReport.find()
                .sort({ createdAt: -1})
                .select("-__v -siteId")
                .populate("site", "siteId name")
                .populate("reportedBy", "name lastname");
            return response.status(200).json(workReports);
        } catch (error) {
            console.error("Error fetching work reports:", error);
            return response.status(500).json({ message: "Internal server error" });
        }
    }
}