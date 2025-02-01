import * as cdk from "aws-cdk-lib";
import * as certificatemanager from "aws-cdk-lib/aws-certificatemanager";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as origins from "aws-cdk-lib/aws-cloudfront-origins";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as s3deploy from "aws-cdk-lib/aws-s3-deployment";
import { Construct } from "constructs";

export class StagingStack extends cdk.Stack {
  constructor(
    scope: Construct,
    id: string,
    certificateArn: string,
    props?: cdk.StackProps
  ) {
    super(scope, id, props);

    // S3
    const siteBucket = new s3.Bucket(this, "SiteBucket", {
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    /**
     * OAC Creation
     */
    const s3Origin = origins.S3BucketOrigin.withOriginAccessControl(siteBucket);

    // ACM
    const certificate = certificatemanager.Certificate.fromCertificateArn(
      this,
      "SiteCertificate",
      certificateArn
    );

    // Create a CloudFront distribution using the S3 bucket as the origin
    const distribution = new cloudfront.Distribution(this, "SiteDistribution", {
      defaultBehavior: {
        origin: s3Origin,
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
      domainNames: ["test.namecard.travis.engineering"],
      certificate,
      defaultRootObject: "index.html",
    });

    // Deploy the built static files to the S3 bucket.
    // Adjust the source path to where your static build output is located.
    new s3deploy.BucketDeployment(this, "DeployWebsite", {
      sources: [s3deploy.Source.asset("../dist")],
      destinationBucket: siteBucket,
      distribution,
      distributionPaths: ["/*"],
    });

    new cdk.CfnOutput(this, "DistributionDomainName", {
      value: distribution.distributionDomainName,
    });
  }
}
