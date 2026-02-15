import { NextFunction, Request, Response } from "express";

export default function auth(...roles: any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    console.log(roles);
    next();
  };
}
