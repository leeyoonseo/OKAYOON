
const isDevelopment = process.env.NODE_ENV !== 'production';
const isAnalyze = process.env.ANALYZE === 'true';

const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: isAnalyze,
});


module.exports = withBundleAnalyzer({
    compress: true,
    webpack(config, { webpack }) {
        const plugins = [...config.plugins];

        return {
            ...config,
            mode: isDevelopment ? 'development': 'production',
            devtool: isDevelopment ? 'eval': 'hidden-source-map',
            plugins,
        }

    }
});
