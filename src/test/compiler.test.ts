import { compile } from '../compiler';
import { func, i32 } from '../methods';
import { Module } from '../module';

describe('compiler', () => {
  const addFunc = () =>
    func(
      'add',
      {
        params: [
          ['i32', 'a'],
          ['i32', 'b'],
        ],
        locals: [],
        returnType: 'i32',
      },
      i32.add(i32.local.get('a'), i32.local.get('b')),
    );

  test('add function (local.get, i32.add, exported func)', () => {
    const m = new Module();
    m.addFunc(addFunc(), true);

    expect(compile(m)).toMatchSnapshot();
  });
});
