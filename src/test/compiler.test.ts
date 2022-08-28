import { compilers, compile } from '../compiler';
import * as w from '../methods';
import { Module } from '../module';

describe('compiler', () => {
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

  test('add function (local.get, i32.add, exported func)', () => {
    const m = new Module();
    m.addFunc(addFunc(), true);

    expect(compile(m)).toMatchSnapshot();
  });

  test('localGet node', () => {
    expect(
      compilers.localGet(w.local.get('f64', 'abc')),
    ).toMatchInlineSnapshot();
  });

  test('const node', () => {
    expect(compilers.constant(w.constant('f32', 1.5))).toMatchInlineSnapshot();
  });

  test('add node', () => {
    expect(compilers.add(w.add('i32', w.constant('i32', 10), w.constant('i32', 5))));
  });
});
