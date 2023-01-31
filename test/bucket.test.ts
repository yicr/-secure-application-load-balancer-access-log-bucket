import { App, Stack } from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { SecureApplicationLoadBalancerAccessLogBucket } from '../src';

describe('SecureApplicationLoadBalancerAccessLogBucket Testing', () => {

  const app = new App();
  const stack = new Stack(app, 'TestingStack', {
    env: {
      account: '123456789012',
      region: 'us-east-1',
    },
  });

  const bucket = new SecureApplicationLoadBalancerAccessLogBucket(stack, 'SecureApplicationLoadBalancerAccessLogBucket', {
    bucketName: 'example-alb-access-log-bucket',
    account: '123456789012',
    region: 'us-east-1',
  });

  it('Is Bucket', () => {
    expect(bucket).toBeInstanceOf(s3.Bucket);
  });

  const template = Template.fromStack(stack);

  it('Should have encryption', () => {
    template.hasResourceProperties('AWS::S3::Bucket', {
      BucketEncryption: Match.objectEquals({
        ServerSideEncryptionConfiguration: [
          {
            ServerSideEncryptionByDefault: {
              SSEAlgorithm: 'aws:kms',
            },
          },
        ],
      }),
    });
  });

  it('Should versioning enabled', () => {
    template.hasResourceProperties('AWS::S3::Bucket', {
      VersioningConfiguration: Match.objectEquals({
        Status: 'Enabled',
      }),
    });
  });

  it('Should exist lifecycle', () => {
    template.hasResourceProperties('AWS::S3::Bucket', {
      LifecycleConfiguration: {
        Rules: Match.arrayEquals([
          Match.objectEquals({
            Id: 'ArchiveStepLifeCycle',
            Status: 'Enabled',
            Transitions: Match.arrayEquals([
              Match.objectEquals({
                StorageClass: 'STANDARD_IA',
                TransitionInDays: 60,
              }),
              Match.objectEquals({
                StorageClass: 'INTELLIGENT_TIERING',
                TransitionInDays: 120,
              }),
              Match.objectEquals({
                StorageClass: 'GLACIER',
                TransitionInDays: 180,
              }),
              Match.objectEquals({
                StorageClass: 'DEEP_ARCHIVE',
                TransitionInDays: 360,
              }),
            ]),
          }),
        ]),
      },
    });
  });

  it('Should enforce SSL', () => {
    template.hasResourceProperties('AWS::S3::BucketPolicy', {
      Bucket: {
        Ref: Match.stringLikeRegexp('SecureApplicationLoadBalancerAccessLogBucket'),
      },
      PolicyDocument: {
        Version: '2012-10-17',
        Statement: Match.arrayWith([
          Match.objectLike({
            Action: 's3:*',
            Condition: {
              Bool: {
                'aws:SecureTransport': 'false',
              },
            },
            Effect: 'Deny',
            Principal: {
              AWS: '*',
            },
          }),
        ]),
      },
    });
  });

  it('Should match snapshot', () => {
    expect(template.toJSON()).toMatchSnapshot();
  });
});

describe('Region SecureApplicationLoadBalancerAccessLogBucket Testing', () => {
  const cases = [
    ['us-east-1', '127311923021'], // US East (N. Virginia)
    ['us-east-2', '033677994240'], // US East (Ohio)
    ['us-west-1', '027434742980'], // US West (N. California)
    ['us-west-2', '797873946194'], // US West (Oregon)
    ['us-gov-west-1', '048591011584'], // AWS GovCloud (US-West)
    ['us-gov-east-1', '190560391635'], // WS GovCloud (US-East)
    ['ca-central-1', '985666609251'], // Canada (Central)
    ['eu-central-1', '054676820928'], // Europe (Frankfurt)
    ['eu-north-1', '897822967062'], // Europe (Stockholm)
    ['eu-west-1', '156460612806'], // Europe (Ireland)
    ['eu-west-2', '652711504416'], // Europe (London)
    ['eu-west-3', '009996457667'], // Europe (Paris)
    ['eu-south-1', '635631232127'], // Europe (Milan)
    ['ap-northeast-1', '582318560864'], // Asia Pacific (Tokyo)
    ['ap-northeast-2', '600734575887'], // Asia Pacific (Seoul)
    ['ap-northeast-3', '383597477331'], // Asia Pacific (Osaka)
    ['ap-southeast-1', '114774131450'], // Asia Pacific (Singapore)
    ['ap-southeast-2', '783225319266'], // Asia Pacific (Sydney)
    ['ap-southeast-3', '589379963580'], // Asia Pacific (Jakarta)
    ['ap-south-1', '718504428378'], // Asia Pacific (Mumbai)
    ['ap-east-1', '754344448648'], // Asia Pacific (Hong Kong)
    ['af-south-1', '098369216593'], // Africa (Cape Town)
    ['me-south-1', '076674570225'], // Middle East (Bahrain)
    ['sa-east-1', '507241528517'], // South America (São Paulo)
  ];
  it.each(cases)('Should match region %p = account(%p)', (regionCode, albAwsAccount) => {
    const app = new App();
    const stack = new Stack(app, `TestingStack${regionCode}`, {
      env: {
        account: '123456789012',
        region: 'us-east-1',
      },
    });
    new SecureApplicationLoadBalancerAccessLogBucket(stack, 'SecureApplicationLoadBalancerAccessLogBucket', {
      bucketName: 'example-alb-access-log-bucket',
      account: '123456789012',
      region: regionCode,
    });
    const template = Template.fromStack(stack);
    template.hasResourceProperties('AWS::S3::BucketPolicy', {
      Bucket: {
        Ref: Match.stringLikeRegexp('SecureApplicationLoadBalancerAccessLogBucket'),
      },
      PolicyDocument: {
        Version: '2012-10-17',
        Statement: Match.arrayWith([
          Match.objectEquals({
            Effect: 'Allow',
            Action: 's3:PutObject',
            Principal: {
              AWS: {
                'Fn::Join': Match.arrayWith([
                  '',
                  [
                    'arn:',
                    {
                      Ref: 'AWS::Partition',
                    },
                    `:iam::${albAwsAccount}:root`,
                  ],
                ]),
              },
            },
            Resource: {
              'Fn::Join': Match.arrayWith([
                '',
                [
                  {
                    'Fn::GetAtt': Match.arrayWith([
                      Match.stringLikeRegexp('SecureApplicationLoadBalancerAccessLogBucket'),
                      'Arn',
                    ]),
                  },
                  '/AWSLogs/123456789012/*',
                ],
              ]),
            },
          }),
        ]),
      },
    });
  });

  it('Should unknown region error', () => {
    const app = new App();
    const stack = new Stack(app, 'ErrorTestingStack', {
      env: {
        account: '123456789012',
        region: 'us-east-1',
      },
    });
    const bucket = () => {
      new SecureApplicationLoadBalancerAccessLogBucket(stack, 'SecureApplicationLoadBalancerAccessLogBucket', {
        bucketName: 'example-alb-access-log-bucket',
        account: '123456789012',
        region: 'xx-xxx-1',
      });
    };
    expect(bucket).toThrowError(Error);
  });
});