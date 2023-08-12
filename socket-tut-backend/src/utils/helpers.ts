import { Response } from "express";


export const respWithSuccess = (res: Response, statusCode: number = 200, msg: string = "", data?: any) => res.status(statusCode).json({ msg, data });
