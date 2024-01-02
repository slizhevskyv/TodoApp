import crypto from 'crypto';

export default (size: number = 16) => crypto.randomBytes(size).toString('base64');
