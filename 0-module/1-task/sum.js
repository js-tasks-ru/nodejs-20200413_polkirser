function sum(a, b) {
  // eslint-disable-next-line prefer-rest-params
  const args = Array.from(arguments);
  args.map((item, key) => {
    if (typeof item !== 'number') {
      throw new TypeError(`${args[key]} не является числом!`);
    }
  });
  return a + b;
}

module.exports = sum;
