#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import "source-map-support/register";
import { StagingStack } from "./lib/staging-stack";

// predefined settings
const account = process.env.AWS_ACCOUNT;
const region = process.env.AWS_REGION!;
const acmArn = process.env.AWS_ACM_ARN!; // the ARN of the HTTPS certificate pre-configured for the custom domain

const app = new cdk.App();
new StagingStack(app, "StagingStack", acmArn, {
  env: { account, region },
});
