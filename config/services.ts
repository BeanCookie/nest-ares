import { registerAs } from '@nestjs/config';

// all third-party services' configurations to go here
export default registerAs('services', () => ({
    juhe_key: process.env.JUHE_KEY || '',
}));
