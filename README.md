# wazum

Wazum is a human-friendly compiler infrastructure library for WebAssembly.

It's an alternative to Binaryen.js with the following benefits:

✍️ Wazum is **hand-written** and not machine-generated.

🧪 Thoroughly **tested** and **predictable**.

🪶 **Lightweight** and tree-shakeable.

🤯 Large degree of **flexibility** and **hackability** of the AST.

🍀 Full **type-safety**. And I mean **full**. Type correctness is preferred over type inference.

✨ Stellar documentation, QoL features, overall **great DX**. Give it a try!

*note: the above is the end goal, Wazum is still a work in progress.*

```ts
// Try Me!
import { w } from 'wazum';
const m = new w.Module();

const add = w.func(
  'add',
  {
    params: [['i32', 'a'], ['i32', 'b']],
    returnType: 'i32',
    locals: []
  },
  w.add('i32', w.local.get('i32', 'a'), w.local.get('i32', 'b'))
);

m.addFunc(add);
console.log(m.compile());
```

### Getting Started
```bash
yarn add wazum
// or
npm i wazum
```

You'll find all the methods and types under:
```ts
import { w } from 'wazum';
w. // let IntelliSense guide you!
```
<!-- 
For more information, check out the [**docs**](https://judehunter.dev/wazum/docs). -->