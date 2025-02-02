import * as cdk from "aws-cdk-lib";
import * as certificatemanager from "aws-cdk-lib/aws-certificatemanager";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as origins from "aws-cdk-lib/aws-cloudfront-origins";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as s3deploy from "aws-cdk-lib/aws-s3-deployment";
import { Construct } from "constructs";

type NameCardStackProps = {
  publicUrl: string;
  certificateArn: string;
  branchName: string;
  stackName: string;
};

export class NameCardStack extends cdk.Stack {
  constructor(
    scope: Construct,
    private nameCardStackProps: NameCardStackProps,
    props?: cdk.StackProps
  ) {
    super(scope, nameCardStackProps.stackName, props);
    const { certificateArn, branchName } = nameCardStackProps;
    // S3
    const siteBucket = new s3.Bucket(this, "SiteBucket", {
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      bucketName: `top-name-card-s3-bucket-${branchName}`,
      autoDeleteObjects: true,
    });

    // ACM for test.namecard.travis.engineering
    const certificate = certificatemanager.Certificate.fromCertificateArn(
      this,
      "SiteCertificate",
      certificateArn
    );

    /**
     * S3 origin for CloudFront with OAC
     */
    const s3Origin = origins.S3BucketOrigin.withOriginAccessControl(siteBucket);

    // Cloudfront distribution with S3 origin
    const distribution = this.createCloudFrontDistribution(
      certificate,
      s3Origin
    );

    // Deploy the built static files to the S3 bucket.
    new s3deploy.BucketDeployment(this, "DeployWebsite", {
      sources: [s3deploy.Source.asset("../dist")],
      destinationBucket: siteBucket,
      distribution,
      distributionPaths: ["/*"],
    });

    new cdk.CfnOutput(this, "url", {
      value: distribution.distributionDomainName,
    });
  }

  /**
   * Create CloudFront distribution, given the s3 origin and certificate for the custom domain. It also attaches request restriction rules for the distribution so that only requests with custom domain is allowed
   * @param certificate: the certificate of the custom domain
   * @param s3Origin: the s3 origin this distribution uses
   * @returns cloudFront distribution
   */
  createCloudFrontDistribution(
    certificate: cdk.aws_certificatemanager.ICertificate,
    s3Origin: cdk.aws_cloudfront.IOrigin
  ) {
    return new cloudfront.Distribution(this, "SiteDistribution", {
      defaultBehavior: {
        origin: s3Origin,
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        functionAssociations: [
          {
            eventType: cloudfront.FunctionEventType.VIEWER_REQUEST,
            function: this.cloudFrontRequestRestriction(),
          },
        ],
      },
      domainNames: [this.nameCardStackProps.publicUrl],
      certificate,
      defaultRootObject: "index.html",
    });
  }
  // CloudFront Function that blocks .cloudfront.net requests
  cloudFrontRequestRestriction() {
    return new cloudfront.Function(this, "BlockCloudFrontAccess", {
      code: cloudfront.FunctionCode.fromInline(`
          function handler(event) {
            var request = event.request;
            var headers = request.headers;

            if (headers.host && headers.host.value.endsWith('.cloudfront.net')) {
              return {
                statusCode: 403,
                statusDescription: "Forbidden",
                body: ""
              };
            }
            return request;
          }
        `),
    });
  }
}
