import { Router } from "express"
import { body } from "express-validator"
import { handleInputErrors } from "../middleware/validation";
import { WorkReportController } from "../controllers/workReportController";

const route : Router = Router();

route.post("/create",
    body("siteId").notEmpty().withMessage("SiteId is required"),
    body("siteName").notEmpty().withMessage("SiteName is required"),
    body("incChg").notEmpty().withMessage("IncChg is required"),
    body("workDone").notEmpty().withMessage("WorkDone is required"),
    body("workSummary").notEmpty().withMessage("WorkSummary is required"),
    handleInputErrors,
    WorkReportController.createWorkReport
)

route.get("/work-reports", WorkReportController.getAllWorkReports);



export default route;