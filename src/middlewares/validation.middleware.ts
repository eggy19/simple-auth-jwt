import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "../errors/bad-request.error";

function hasConstraints(error: ValidationError): error is ValidationError & { constraints: { [key: string]: string } } {
    return !!error.constraints;
  }

export function validateDto(dtoClass:any){
    console.log("======= MASUK MIDDLEWARE VALIDATION");
    return async (req:Request, res:Response, next:NextFunction): Promise <void> => {
        const dto :any = plainToInstance(dtoClass, req.body);
        const errors = await validate(dto);

        if (errors.length > 0) {
            const message = errors
            .filter(hasConstraints) // Filter hanya error yang punya constraints
            .flatMap(error => Object.values(error.constraints))
            .join(', ');

            return next(new BadRequestError(message || 'Validation failed'));
        }

        req.body = dto
        next();
    }
}