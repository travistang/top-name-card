import * as cdk from "aws-cdk-lib";
import "source-map-support/register";
import { NameCardStack } from "./lib/namecard-stack";

// predefined settings
const account = process.env.AWS_ACCOUNT;
const region = process.env.AWS_REGION!;
const acmArn = process.env.AWS_ACM_ARN!; // the ARN of the HTTPS certificate pre-configured for the custom domain
const branchName = process.env.BRANCH_NAME || "Staging";

const app = new cdk.App();
const stackProps = {
  publicUrl: "test.namecard.travis.engineering",
  certificateArn: acmArn,
  stackName: `${branchName}Stack`,
};
new NameCardStack(app, stackProps, {
  env: { account, region },
});
