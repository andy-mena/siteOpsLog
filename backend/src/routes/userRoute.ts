import { Router } from "express"
import { body, param } from "express-validator";
import { UserController } from "../controllers/userController";
import { handleInputErrors } from "../middleware/validation";

const route: Router = Router();

//create account
route.post("/create",
    body("name")
        .notEmpty().withMessage("Name is required")
        .isString().withMessage("Name must be a string")
        .trim(),
    body("lastname")
        .notEmpty().withMessage("Lastname is required")
        .isString().withMessage("Lastname must be a string"),
    handleInputErrors,
    UserController.createUser
)



export default route;