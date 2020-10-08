import { NextApiRequest, NextApiResponse } from "next";
import "node-fetch";
import { clientOptions } from "lib/sanity";
import { shopifySync } from "sanity-shopify-toolkit";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // eslint-disable-next-line no-console
  console.log(JSON.stringify(req.body));

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
