import core from '@actions/core';

const run = async (): Promise<void> => {
  try {
    core.info('Hello world!');
  }
  catch (error) {
    core.setFailed(error.message);
  }
};

run();
