const fs = require('fs');
const Combinatorics = require('js-combinatorics');
const async = require('async');

const fileTestCase = fs.readFileSync('./testcase_data_small.txt', { encoding: 'utf8' }).toString().split('\r\n');

const cmb = Combinatorics.bigCombination(fileTestCase, 3);

const goal = 37375606804152;

console.time('compute');

function findFuckingNumber(cm) {
  return new Promise((resolve) => {
    let prev = 0;
    async.each(cm, (_, callback) => {
      const a = cm.next();
      const curr = a[0] * a[1] * a[2];
      prev = Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev;
      callback();
    }, (err) => {
      if (err) throw err;
      resolve(prev);
    });
  });
}
findFuckingNumber(cmb).then((ans) => {
  console.log(ans);
  console.timeEnd('compute');
});
