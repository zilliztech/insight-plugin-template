import express, { Request, Response, NextFunction } from "express";

const router = express.Router();

const data = [
  {
    name: "Example-1",
  },
  {
    name: "Example-2",
  },
  {
    name: "Example-3",
  },
];

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  return res.json(data);
});

export default { router };
