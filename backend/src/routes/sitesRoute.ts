import { Router } from "express"
import { SitesController } from "../controllers/sitesController";

const route: Router = Router();

//Get all sites available
route.get("/sites", SitesController.getSites);
route.get("/:siteId", SitesController.getSiteById);

export default route;