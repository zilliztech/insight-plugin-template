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
  try {
    res.json(data);
  } catch (err) {
    // Do call `next(err)` then Insight can catch and wrap this error.
    next(err);
  }
});

export default { router };
