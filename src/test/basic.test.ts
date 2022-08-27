import { block, call, drop, func, i32, i64 } from '../methods';

describe('tree creation', () => {
  test('add constant', () => {
    const x = i32.add(i32.const(1), i32.const(2));

    expect(x).toMatchSnapshot();
  });

  test('function', () => {
    const f = func(
      'add',
      {
        params: [
          ['i32', 'a'],
          ['i32', 'b'],
        ],
        locals: [['i32', 'ret']],
        returnType: 'i32',
      },
      block(null, 'i32', [
        drop(i32.add(i32.local.get('a'), i32.local.get('b'))),
        i32.local.set('ret', i32.add(i32.local.get('a'), i32.local.get('b'))),
        i32.local.get('ret'),
      ]),
    );

    expect(f).toMatchSnapshot();
  });

  test('function call', () => {
    const x = call('add', { returnType: 'i32' }, [i32.local.get('a')]);

    expect(x).toMatchSnapshot();
  });
});
// block(null, [5, i64.local.get('ret')], 'i32');

// i32.local.set('ret', i32.add(i32.local.get('a'), i32.local.get('b'))),
//   i32.add(i64.local.get('a'), i32.local.get('b'));

// type Test = [...number[], string];
// const a: Test = [5, '', 4];
