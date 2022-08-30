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
    expect(compilers.localGet(w.local.get('f64', 'abc'))).toMatchSnapshot();
  });

  test('localSet node', () => {
    expect(
      compilers.localSet(w.local.set('f64', 'abc', w.constant('f64', 10))),
    ).toMatchSnapshot();
  });

  test('const node', () => {
    expect(compilers.constant(w.constant('f32', 1.5))).toMatchSnapshot();
  });

  test('add node', () => {
    expect(
      compilers.add(w.add('i32', w.constant('i32', 10), w.constant('i32', 5))),
    ).toMatchSnapshot();
  });

  test('sub node', () => {
    expect(
      compilers.sub(w.sub('i32', w.constant('i32', 10), w.constant('i32', 5))),
    ).toMatchSnapshot();
  });

  test('mul node', () => {
    expect(
      compilers.mul(w.mul('i32', w.constant('i32', 10), w.constant('i32', 5))),
    ).toMatchSnapshot();
  });

  test('div_s node', () => {
    expect(
      compilers.divSigned(
        w.divSigned('i32', w.constant('i32', 10), w.constant('i32', 5)),
      ),
    ).toMatchSnapshot();
  });

  test('div_u node', () => {
    expect(
      compilers.divUnsigned(
        w.divUnsigned('i32', w.constant('i32', 10), w.constant('i32', 5)),
      ),
    ).toMatchSnapshot();
  });

  test('rem_s node', () => {
    expect(
      compilers.remSigned(
        w.remSigned('i32', w.constant('i32', 10), w.constant('i32', 5)),
      ),
    ).toMatchSnapshot();
  });

  test('rem_u node', () => {
    expect(
      compilers.remUnsigned(
        w.remUnsigned('i32', w.constant('i32', 10), w.constant('i32', 5)),
      ),
    ).toMatchSnapshot();
  });

  test('call node', () => {
    expect(
      compilers.call(w.call('abc', 'i32', [w.constant('i32', 10)])),
    ).toMatchSnapshot();
  });

  test('call_indirect node', () => {
    expect(
      compilers.callIndirect(
        w.callIndirect(
          '0',
          w.constant('i32', 0),
          { params: addFunc().params, returnType: addFunc().dataType },
          [w.constant('i32', 3), w.constant('i32', 4)],
        ),
      ),
    ).toMatchSnapshot();
  });
});
