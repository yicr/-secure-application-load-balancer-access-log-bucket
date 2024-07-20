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
    '@gammarers/aws-secure-log-bucket@~1.7.2',
    '@gammarers/aws-secure-bucket@~1.4.1',
  ],
  peerDeps: [
    '@gammarers/aws-secure-log-bucket@~1.7.2',
    '@gammarers/aws-secure-bucket@~1.4.1',
  ],
  minNodeVersion: '18.0.0',
  workflowNodeVersion: '22.4.x',
  depsUpgradeOptions: {
    workflowOptions: {
      labels: ['auto-approve', 'auto-merge'],
      schedule: javascript.UpgradeDependenciesSchedule.expressions(['0 19 * * 6']),
    },
  },
  autoApproveOptions: {
    secret: 'GITHUB_TOKEN',
    allowedUsernames: ['yicr'],
  },
});
project.synth();