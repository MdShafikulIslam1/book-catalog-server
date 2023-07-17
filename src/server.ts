/* eslint-disable no-console */

import mongoose from 'mongoose';
import app from './app';
import config from './config';

async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log(config.database_url);
    console.log('Database Connect successfully');

    app.listen(config.port, () => {
      console.log(
        `Express Backend Setup Application listening on port ${config.port}`
      );
    });
  } catch (error) {
    console.error('failed to connect', error);
  }
}
bootstrap();
