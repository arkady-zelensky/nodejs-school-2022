import { Request, Response, NextFunction } from "express";

export const catchErrors = function (
  middleware: (req: Request, res: Response, next: NextFunction) => unknown
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await middleware(req, res, next);
    } catch (err) {
      next(err);
    }
  };
};
