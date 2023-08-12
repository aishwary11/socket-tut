import { NextFunction, Request, Response } from "express";

const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const requestTimestamp = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  }).format(new Date());
  const { method, originalUrl } = req;
  console.log(`${requestTimestamp}:: ${method}== ${originalUrl}`);
  next();
};
export default loggerMiddleware;
