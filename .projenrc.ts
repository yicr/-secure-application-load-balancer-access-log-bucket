import { awscdk, javascript } from 'projen';

const PROJECT_NAME = '@yicr/secure-application-load-balancer-access-log-bucket';
const PROJECT_DESCRIPTION = 'AWS Application Load Balancer access log optimized secure bucket.';

const project = new awscdk.AwsCdkConstructLibrary({
  author: 'yicr',
  authorAddress: 'yicr@users.noreply.github.com',
  cdkVersion: '2.62.2',
  defaultReleaseBranch: 'main',
  projenrcTs: true,
  name: PROJECT_NAME,
  description: PROJECT_DESCRIPTION,
  repositoryUrl: 'https://github.com/yicr/secure-application-load-balancer-access-log-bucket.git',
  keywords: ['aws', 'cdk', 'aws-cdk', 'elb', 'alb', 's3', 'bucket', 'access-log', 'log'],
  npmAccess: javascript.NpmAccess.PUBLIC,
  devDeps: [
    '@yicr/secure-bucket',
  ],
  peerDeps: [
    '@yicr/secure-bucket',
  ],
  depsUpgradeOptions: {
    workflowOptions: {
      labels: ['auto-approve', 'auto-merge'],
      schedule: javascript.UpgradeDependenciesSchedule.expressions(['0 18 * * *']),
    },
  },
  autoApproveOptions: {
    secret: 'GITHUB_TOKEN',
    allowedUsernames: ['yicr'],
  },
});
project.synth();