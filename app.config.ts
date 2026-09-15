import type { ConfigContext, ExpoConfig } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => {
  const variant = process.env.APP_VARIANT ?? 'production';
  const isDevelopment = variant === 'development';
  const isPreview = variant === 'preview';
  const suffix = isDevelopment ? '.dev' : isPreview ? '.preview' : '';

  return {
    ...config,
    slug: config.slug ?? 'toss-the-turkeys',
    name: isDevelopment
      ? 'Toss the Turkeys Dev'
      : isPreview
        ? 'Toss the Turkeys Preview'
        : 'Toss the Turkeys',
    scheme: isDevelopment
      ? 'tossturkeys-dev'
      : isPreview
        ? 'tossturkeys-preview'
        : 'tossturkeys',
    ios: {
      ...config.ios,
      bundleIdentifier: `com.iainhoolahan.tosstheturkeys${suffix}`,
    },
    android: {
      ...config.android,
      package: `com.iainhoolahan.tosstheturkeys${suffix}`,
    },
  };
};
