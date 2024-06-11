import { awscdk, javascript } from 'projen';

const project = new awscdk.AwsCdkConstructLibrary({
  author: 'yicr',
  authorAddress: 'yicr@users.noreply.github.com',
  cdkVersion: '2.80.0',
  typescriptVersion: '5.3.x',
  jsiiVersion: '5.3.x',
  defaultReleaseBranch: 'main',
  projenrcTs: true,
  name: '@gammarer/aws-secure-application-load-balancer-access-log-bucket',
  description: 'AWS Application Load Balancer access log optimized secure bucket.',
  repositoryUrl: 'https://github.com/yicr/aws-secure-application-load-balancer-access-log-bucket.git',
  keywords: ['aws', 'cdk', 'aws-cdk', 'elb', 'alb', 's3', 'bucket', 'access-log', 'log'],
  npmAccess: javascript.NpmAccess.PUBLIC,
  deps: [
    '@gammarer/aws-secure-log-bucket@~0.12.10',
    '@gammarer/aws-secure-bucket@~0.12.4',
  ],
  peerDeps: [
    '@gammarer/aws-secure-log-bucket@~0.12.10',
    '@gammarer/aws-secure-bucket@~0.12.4',
  ],
  minNodeVersion: '18.0.0',
  workflowNodeVersion: '22.x',
  depsUpgradeOptions: {
    workflowOptions: {
      labels: ['auto-approve', 'auto-merge'],
      schedule: javascript.UpgradeDependenciesSchedule.expressions(['0 19 * * *']),
    },
  },
  autoApproveOptions: {
    secret: 'GITHUB_TOKEN',
    allowedUsernames: ['yicr'],
  },
});
project.synth();