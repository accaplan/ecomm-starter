import { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST" || !req.body) {
    res.json({ error: true, message: "Must be post method with body" });
  }

  console.log(req.body);
  res.json({ success: true });
};
