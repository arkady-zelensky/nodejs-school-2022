import * as validator from "class-validator";
import { ClassConstructor, plainToClass } from "class-transformer";
import { NextFunction, Request, Response } from "express";
import { catchErrors } from "./catch-errors";

export const validate = (
  schema: ClassConstructor<unknown>,
  reqPart: "body" | "params" | "query" = "body"
) => {
  return catchErrors(
    async (req: Request, res: Response, next: NextFunction) => {
      const entityToValidate = plainToClass(schema, req[reqPart]);

      const errors = await validator.validate(entityToValidate as any, {
        whitelist: true,
        forbidNonWhitelisted: true,
      });
      if (errors.length) {
        return res.status(400).send(errors);
      }

      req[reqPart] = entityToValidate;
      next();
    }
  );
};
