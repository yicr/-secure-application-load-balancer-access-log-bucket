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
  // deps: [],                /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],             /* Build dependencies for this module. */
  // packageName: undefined,  /* The "name" in package.json. */
});
project.synth();