const regularExpressions = {
  number: /^[0-9]+$/,
  boolean: /^(true|false)$/,
  account: /^0x[a-fA-F0-9]{40}$/g, // ^(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,39}|x[a-fA-F0-9]{40}|X[1-9A-HJ-NP-Za-km-z]{33}|4[0-9AB][1-9A-HJ-NP-Za-km-z]{93}$
  array: /^[0-5]+([0-5,])+[0-5]+$/,
};

module.exports = regularExpressions;
