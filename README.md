# Secure Application Load Balancer access log bucket

This is an AWS Application Load Balancer access log optimized secure bucket.

## Install

### TypeScript

```shell
npm install @yicr/secure-application-load-balancer-access-log-bucket
```
or
```shell
yarn add @yicr/secure-application-load-balancer-access-log-bucket
```

## Example

### TypeScript

```shell
npm install @yicr/secure-application-load-balancer-access-log-bucket
```

```typescript
import { SecureApplicationLoadBalancerAccessLogBucket } from '@yicr/secure-application-load-balancer-access-log-bucket';

new SecureApplicationLoadBalancerAccessLogBucket(stack, 'SecureApplicationLoadBalancerAccessLogBucket', {
  bucketName: 'example-alb-access-log-bucket',
});

```