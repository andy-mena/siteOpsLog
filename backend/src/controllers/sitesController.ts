import type {  Request, Response } from "express"
import Sites from "../models/SitesSchema";

export class SitesController {
    constructor() { }

    public static async getSites(request: Request, response: Response) {
        try {
            const sites = await Sites.find()
                .select('-__v -createdAt -updatedAt');
            return response.status(200).json(sites);
        } catch (error) {
            console.error("Error fetching sites:", error);
            response.status(500).json({ message: "Internal server error" });
        }
    }

    public static async getSiteById (request: Request, response: Response) {
        try {
            const { siteId } = request.params;
            const site = await Sites.findOne({siteId}, "-__v -createdAt -updatedAt");

            if(!site){
                return response.status(404).json({ message: "Site not found" });
            }
            return response.status(200).json(site);
        } catch (error) {
            console.error("Error fetching sites:", error);
            response.status(500).json({ message: "Internal server error" });
        }

    }
}