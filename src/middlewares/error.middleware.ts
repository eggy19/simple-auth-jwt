import { ErrorRequestHandler} from "express";
import { BadRequestError } from "../errors/bad-request.error";

export const errorHandler: ErrorRequestHandler = async (err, req, res, next) => {
    if (err instanceof BadRequestError) {
      res.status(err.statusCode).json({
        error: {
          message: err.message,
          status: err.statusCode
        }
      });
      return;
    }
  
    console.error(err);
    res.status(500).json({
      error: {
        message: 'Internal Server Error',
        status: 500
      }
    });
  };