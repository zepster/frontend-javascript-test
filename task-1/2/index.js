/**
 * Удалить или добавить новые  пары
 * для включения в проверку 
 * 
  Пример:
  '+': { type: 'sign', open: true },
  '-': { type: 'sign', open: false },
  
  Тест:
  test(checkSyntax, ['++(+-)--'], 0);
 */
const TOKENS = {
  '<': { type: 'arrow', open: true },
  '>': { type: 'arrow', open: false },

  '[': { type: 'square', open: true },
  ']': { type: 'square', open: false },

  '(': { type: 'round', open: true },
  ')': { type: 'round', open: false },

  '{': { type: 'figure', open: true },
  '}': { type: 'figure', open: false },
};

function checkSyntax(string) {
  const stack = [];
  for (let i = 0; i < string.length; i += 1) {
    if (string[i] in TOKENS) {
      if (TOKENS[string[i]].open) {
        stack.push(string[i]);
        continue;
      }
      if (!stack.length || TOKENS[stack[stack.length - 1]].type !== TOKENS[string[i]].type) {
        stack.push(string[i]);
        break;
      }
      stack.pop();
    }
  }
  return stack.length ? 1 : 0;
}

exports.checkSyntax = checkSyntax;
