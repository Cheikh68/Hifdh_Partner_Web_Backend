import { Request, Response, NextFunction } from "express";

function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err); // Log the error for debugging

  if (res.headersSent) {
    // If response already started, delegate to default Express handler
    return next(err);
  }

  if (err.status && typeof err.status === "number") {
    res.status(err.status).json({ error: err.message });
  } else {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export default errorHandler;
