import { SecureBucket, SecureBucketEncryption } from '@yicr/secure-bucket';
import * as cdk from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

export interface SecureApplicationLoadBalancerAccessLogBucketProps {
  readonly bucketName?: string;
}

export class SecureApplicationLoadBalancerAccessLogBucket extends SecureBucket {

  constructor(scope: Construct, id: string, props?: SecureApplicationLoadBalancerAccessLogBucketProps) {
    super(scope, id, {
      bucketName: props?.bucketName,
      encryption: SecureBucketEncryption.KMS_MANAGED,
    });

    const account = cdk.Stack.of(this).account;
    const region = cdk.Stack.of(this).region;

    // 👇Add Lifecycle rule.
    this.addLifecycleRule({
      id: 'ArchiveStepLifeCycle',
      enabled: true,
      transitions: [
        {
          storageClass: s3.StorageClass.INFREQUENT_ACCESS,
          transitionAfter: cdk.Duration.days(60),
        },
        {
          storageClass: s3.StorageClass.INTELLIGENT_TIERING,
          transitionAfter: cdk.Duration.days(120),
        },
        {
          storageClass: s3.StorageClass.GLACIER,
          transitionAfter: cdk.Duration.days(180),
        },
        {
          storageClass: s3.StorageClass.DEEP_ARCHIVE,
          transitionAfter: cdk.Duration.days(360),
        },
      ],
    });

    // 👇Allow Region ALB Account
    this.addToResourcePolicy(new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: [
        's3:PutObject',
      ],
      principals: [
        new iam.AccountPrincipal((() => {
          // https://docs.aws.amazon.com/elasticloadbalancing/latest/application/enable-access-logging.html
          switch (region) {
            case 'us-east-1': // US East (N. Virginia)
              return '127311923021';
            case 'us-east-2': // US East (Ohio)
              return '033677994240';
            case 'us-west-1': // US West (N. California)
              return '027434742980';
            case 'us-west-2': // US West (Oregon)
              return '797873946194';
            case 'us-gov-west-1': // AWS GovCloud (US-West)
              return '048591011584';
            case 'us-gov-east-1': // WS GovCloud (US-East)
              return '190560391635';
            case 'ca-central-1': // Canada (Central)
              return '985666609251';
            case 'eu-central-1': // Europe (Frankfurt)
              return '054676820928';
            case 'eu-north-1': // Europe (Stockholm)
              return '897822967062';
            case 'eu-west-1': // Europe (Ireland)
              return '156460612806';
            case 'eu-west-2': // Europe (London)
              return '652711504416';
            case 'eu-west-3': // Europe (Paris)
              return '009996457667';
            case 'eu-south-1': // Europe (Milan)
              return '635631232127';
            case 'ap-northeast-1': // Asia Pacific (Tokyo)
              return '582318560864';
            case 'ap-northeast-2': // Asia Pacific (Seoul)
              return '600734575887';
            case 'ap-northeast-3': // Asia Pacific (Osaka)
              return '383597477331';
            case 'ap-southeast-1': // Asia Pacific (Singapore)
              return '114774131450';
            case 'ap-southeast-2': // Asia Pacific (Sydney)
              return '783225319266';
            case 'ap-southeast-3': // Asia Pacific (Jakarta)
              return '589379963580';
            case 'ap-south-1': // Asia Pacific (Mumbai)
              return '718504428378';
            case 'ap-east-1': // Asia Pacific (Hong Kong)
              return '754344448648';
            case 'af-south-1': // Africa (Cape Town)
              return '098369216593';
            // case 'cn-north-1': // China (Beijing)
            //   return '';
            // case 'cn-northwest-1': // China (Ningxia)
            //   return '';
            case 'me-south-1': // Middle East (Bahrain)
              return '076674570225';
            case 'sa-east-1': // South America (São Paulo)
              return '507241528517';
            default:
              throw new Error('Unknown region or Undefined region.');
          }
        })()),
      ],
      resources: [`${this.bucketArn}/AWSLogs/${account}/*`],
    }));

  }
}