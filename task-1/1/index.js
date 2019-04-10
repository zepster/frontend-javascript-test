function dscount(string, ...search) {
  const match = search.join('').toLowerCase();
  return string.toLowerCase().split('')
    .reduce((acc, cur, i, src) => 
      `${cur}${src[i+1]}` === match ? acc + 1 : acc
    , 0);
}

exports.dscount = dscount;
