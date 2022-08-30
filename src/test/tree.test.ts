import * as w from '../methods';
import { Module } from '../module';

describe('tree creation', () => {
  test('add constant', () => {
    const x = w.add('i32', w.constant('i32', 1), w.constant('i32', 2));

    expect(x).toMatchSnapshot();
  });

  test('function', () => {
    const f = w.func(
      'add',
      {
        params: [
          ['i32', 'a'],
          ['i32', 'b'],
        ],
        locals: [['i32', 'ret']],
        returnType: 'i32',
      },
      w.block(null, 'i32', [
        w.drop(w.add('i32', w.local.get('i32', 'a'), w.local.get('i32', 'b'))),
        w.local.set(
          'i32',
          'ret',
          w.add('i32', w.local.get('i32', 'a'), w.local.get('i32', 'b')),
        ),
        w.local.get('i32', 'ret'),
      ]),
    );

    expect(f).toMatchSnapshot();
  });

  test('function call', () => {
    const x = w.call('add', 'i32', [w.local.get('i32', 'a')]);

    expect(x).toMatchSnapshot();
  });

  const addFunc = () =>
    w.func(
      'add',
      {
        params: [
          ['i32', 'a'],
          ['i32', 'b'],
        ],
        locals: [],
        returnType: 'i32',
      },
      w.add('i32', w.local.get('i32', 'a'), w.local.get('i32', 'b')),
    );

  test('addFunc', () => {
    const m = new Module();
    m.addFunc(addFunc());
    m.addFunc(addFunc(), true);
    m.addFunc(addFunc(), 'addi32');
    expect(m.funcs).toMatchSnapshot();
  });
});
// block(null, [5, i64.local.get('ret')], 'i32');

// i32.local.set('ret', i32.add(i32.local.get('a'), i32.local.get('b'))),
//   i32.add(i64.local.get('a'), i32.local.get('b'));

// type Test = [...number[], string];
// const a: Test = [5, '', 4];
