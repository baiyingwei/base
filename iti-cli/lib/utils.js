const ora = require('ora');

async function sleep(n) {
  return new Promise((resolve) => setTimeout(resolve, n));
}

async function wrapLoading(fn, message, ...arg) {
  const spinner = ora(message);
  spinner.start();
  try {
    let repos = await fn(...arg);
    spinner.succeed();
    return repos;
  } catch (e) {
    spinner.fail('========fail=======');
    await sleep(1000);
    wrapLoading(fn, message, ...arg);
  }
}

module.exports = {
  sleep, wrapLoading
}