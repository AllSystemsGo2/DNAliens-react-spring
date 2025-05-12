/* eslint-disable no-undef */
import ghpages from 'gh-pages';
import { readFile } from 'fs/promises';
const pkg = JSON.parse(
  await readFile(
    new URL('./package.json', import.meta.url)
  )
);

function callback(err) {
    if (err) {
        console.error(err);
    } else {
        console.log('Deployed to https://allsystemsgo2.github.io/DNAliens-react-spring/');
    }
}


ghpages.publish('dist', {
    add: true, 
    tag: `${pkg.version}-build`,
    message: `Deploy ${pkg.version}`,
  }, 
  callback);