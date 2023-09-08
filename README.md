[![GitHub](https://img.shields.io/github/license/yicr/aws-secure-application-load-balancer-access-log-bucket?style=flat-square)](https://github.com/yicr/aws-secure-application-load-balancer-access-log-bucket/blob/main/LICENSE)
[![npm (scoped)](https://img.shields.io/npm/v/@gammarer/aws-secure-application-load-balancer-access-log-bucket?style=flat-square)](https://www.npmjs.com/package/@gammarer/aws-secure-application-load-balancer-access-log-bucket)
<!-- [![PyPI](https://img.shields.io/pypi/v/gammarer.aws-secure-application-load-balancer-access-log-bucket?style=flat-square)](https://pypi.org/project/gammarer.aws-secure-application-load-balancer-access-log-bucket/) -->
<!-- [![Nuget](https://img.shields.io/nuget/v/Gammarer.CDK.AWS.SecureApplicationLoadBalancerAccessLogBucket?style=flat-square)](https://www.nuget.org/packages/Gammarer.CDK.AWS.SecureApplicationLoadBalancerAccessLogBucket/)  -->
<!-- [![Sonatype Nexus (Releases)](https://img.shields.io/nexus/r/com.gammarer/aws-secure-application-load-balancer-access-log-bucket?server=https%3A%2F%2Fs01.oss.sonatype.org%2F&style=flat-square)](https://s01.oss.sonatype.org/content/repositories/releases/com/gammarer/aws-secure-application-load-balancer-access-log-bucket/) -->
[![GitHub Workflow Status (branch)](https://img.shields.io/github/actions/workflow/status/yicr/aws-secure-application-load-balancer-access-log-bucket/release.yml?branch=main&label=release&style=flat-square)](https://github.com/yicr/aws-secure-application-load-balancer-access-log-bucket/actions/workflows/release.yml)
[![GitHub release (latest SemVer)](https://img.shields.io/github/v/release/yicr/aws-secure-application-load-balancer-access-log-bucket?sort=semver&style=flat-square)](https://github.com/yicr/aws-secure-application-load-balancer-access-log-bucket/releases)

# Secure Application Load Balancer access log bucket

This is an AWS Application Load Balancer access log optimized secure bucket.

## Install

### TypeScript

```shell
npm install @gammarer/aws-secure-application-load-balancer-access-log-bucket
```
or
```shell
yarn add @gammarer/aws-secure-application-load-balancer-access-log-bucket
```

## Example

```typescript
import { SecureApplicationLoadBalancerAccessLogBucket } from '@gammarer/aws-secure-application-load-balancer-access-log-bucket';

new SecureApplicationLoadBalancerAccessLogBucket(stack, 'SecureApplicationLoadBalancerAccessLogBucket', {
  bucketName: 'example-alb-access-log-bucket',
});

```