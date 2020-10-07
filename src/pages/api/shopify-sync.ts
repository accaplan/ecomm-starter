import { NextApiRequest, NextApiResponse } from "next";
import "node-fetch";
import { clientOptions } from "lib/sanity";
import { shopifySync } from "@tylermcrobert/sanity-schemas";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  shopifySync({
    req,
    res,
    slackWebhookUrl: process.env.SLACK_WEBHOOK_URL as string,
    clientOptions: {
      ...clientOptions,
      token: process.env.SANITY_WRITE_TOKEN as string,
    },
  });
};
