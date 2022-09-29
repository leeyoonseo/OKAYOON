const isDevelopment = process.env.NODE_ENV !== 'production';

export const backUrl = isDevelopment ? 'http://localhost:3065' : 'https://api.okayoon.com';
export const bucketUrl = isDevelopment ? '' : 'https://okayoon-bucket.s3.ap-northeast-2.amazonaws.com';