import type { Request, Response } from 'express';
import User from '../models/UsersSchema';

export class UserController {

    constructor() { }

    public static async createUser(request: Request, response: Response) {
        try {
            const user = new User(request.body);
            await user.save();
            return response.status(201).json({ message: "User created successfully" });
        } catch (error) {
            return response.status(500).json({ message: "Error creating user" });
        }

    }
}