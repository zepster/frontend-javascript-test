const { checkSyntax } = require('./index');

try {
    test(checkSyntax, ['++(+-)--'], 0);
    test(checkSyntax, [''], 0);
    test(checkSyntax, ['before ( middle []) after '], 0);
    test(checkSyntax, [') ('], 1);
    test(checkSyntax, ['} {'], 1);
    test(checkSyntax, ['} {'], 1);
    test(checkSyntax, ['<(   >)'], 1);
    test(checkSyntax, ['(  [  <>  ()  ]  <>  )'], 0);
    test(checkSyntax, ['   (      [)'], 1);

    console.info("Congratulations! All tests passed.");
} catch(e) {
    console.error(e);
}

function test(call, args, count, n) {
    let r = (call.apply(n, args) === count);
    console.assert(r, `Found items count: ${count}`);
    if (!r) throw "Test failed!";
}