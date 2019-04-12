# react-ref-groupie

> Interact with lots of refs safely through creating of easy to read configs.

![npm](https://img.shields.io/npm/v/react-ref-groupie.svg?style=flat-square)
![GitHub](https://img.shields.io/github/license/mpachin/react-ref-groupie.svg?style=flat-square)
![Snyk Vulnerabilities for npm package version](https://img.shields.io/snyk/vulnerabilities/npm/react-ref-groupie.svg?style=flat-square)

![](./gifs/usage.gif)

* [Motivation](#motivation)
* [Installation](#installation)
* [Usage](#usage)
  * [1. Config](#1.-create-ref-config)
  * [2. RefProvider](#2.-pass-config-to-RefProvider)
  * [3. Consumer](#3.-get-refs-and-methods)
  * [4. Refs locking](#4.-refs-locking)
  * [5. Errors handling](#5.-errors-handling)
* [Examples](#examples)
* [Roadmap](#roadmap)
* [License](#license)
# Motivation

This project started as an attempt to handle complexity of working with animations in large scale React apps. For the simple use cases when you need to animate single component or bunch of them and they lie in the same container this is usually not a big deal - [you just need to lean on React lifecycle hooks](https://greensock.com/react) and thats it. However you may be interested in more elaborated approach in some situations.

When an app you working on have hundreds or thousands of components and containers and design team tells you to animate components which lays in entirely different parts of React rendering tree, there is not a lot of options you have. You may create yet another container above all components you need to animate and keep React refs in single place to attach animation pipeline to them. Or maybe if you use state manager you can handle animation through its state and css animation. Another option is to manage to work with refs through React context by hand. Keeping such solutions here and there in a project creates boilerplate noize and becomes error prone with time.

`react-ref-groupie` is a React refs manager which solves that problem for you. It works through its own React context and provide a way to interact with refs through creating of easy to read configs. You may find it usefull for any task which involves working with React elements spread all over the render tree.

# Installation

`react-ref-groupie` requires **React v16.8 or later.**

You need to use [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com) package manager and a module bundler of your choice.

```
npm install --save react-ref-groupie
```

# Usage

## 1. Create ref config

`react-ref-groupie` use the idea of keeping all complex ref-related pipelines in the single place. That helps in keeping the code clean and eliminates tight-coupling of ref-related logic from components.

The first thing you want to do is to create an object which enumerates every `react-ref-groupie` config you want to use in your project.

`ref-config.js`
```js
import firstConfig from './first-config';
import secondConfig from './second-config';
// ...

export default {
  firstConfig,
  secondConfig,
  // ...
};
```

Configs represents itself just objects with fields named by this convention:
* _**refs**_ - should be a string with whitespace-symbol separated substrings, this substrings is names for refs you're gonna use in methods and components
* _**globals**_ - globals too should be whitespace-symbol separated substrings, and they are too gonna become refs. They just the same as _**refs**_ except globals may be shared between different configs (methods/components) which use the same globals as another config

Besides this two fields _**everything else interpreted as methods**_. Methods are places you want to keep your refs-manipulation logic in. First argument of this methods will become all _**refs**_ and _**globals**_ you wrote in your config, you should notice that this fields not React refs but DOM elements itself - if you've attached ref to an element, otherwise field will become `undefined`. Second argument is an argument you will call your method with - it may be callback (for tracking when animation is completed), object or anything you want.

`first-config.js`
```js
export default {
  refs: `
    first
    second
    third
  `,

  globals: `
    global
  `,

  firstConfigMethod: (
    {
      first,
      second,
      third,
      global
    },
    callback // it can be any args you want
  ) => {
    // your elements manipulating logic goes here
  }
}
```

`second-config.js`
```js
export default {
  // ...
  globals: `
    global
  `,

  secondConfigMethod: (
    {
      // ...
      global
    }
  ) => {
    //...
  }
}
```

Note that `halo` ref shared between first and second configs. That way the same element can be manipulated in different pipelines.

## 2. Pass config to RefProvider

After you created your configs you need to pass them to `RefProvider`

`app.js`
```js
import { RefProvider } from 'react-ref-groupie';

import refConfig from './ref-config';
import { HOCExample } from './hoc-example';
import { HookExample } from './hook-example';

const App = () => (
  <RefProvider config={refConfig}>
    <HOCExample />
    <HookExample />
  </RefProvider>
);
```

## 3. Get refs and methods

There is two ways you can approach this. You can use [HOC (higher order component)](https://reactjs.org/docs/higher-order-components.html) or [hook](https://reactjs.org/docs/hooks-intro.html) both provided by `react-ref-groupie`.

`withRefGroups` HOC provides this two props:
* `getRefGroups` - method which takes an object as an argument and returns an object with refs in it
* `refGroupsMethods` - object with keys mirroring config names and arguments as methods from this configs

> **This is important for you to call `getRefGroups` in `render` method.**

`hoc-example.js`

```js
import withRefGroups from 'react-ref-groupie';

class HOCExample extends React.Component {
  // ...
  // make sure you call getRefGroups in render method
  render() {
    const {
      refGroupsMethods: {
        firstConfig: {
          firstConfigMethod
        }
      },
      getRefGroups
    } = this.props;

    // argument should be an object were keys are names
    // of configs you use and values
    // as whitespace-symbol separated names of refs
    const refGroups = getRefGroups({
      firstConfig: `
        first
        second
        third
      `
    });
  }
  // ...
}

export default withRefGroups(HOCExample);
```

`useRefGroups` hook presented as function with argument same as `getRefGroups` method above. It returns an array with three parameters:
* first param describe below
* second param same as `refGroupsMethods` object above
* third param is the result of `useRefGroups` calculation same as `getRefGroups` result above

`hook-example.js`

```js
import { useRefGroups } from 'react-ref-groupie';

const HookExample = () => {
  const [
    // use the first return value for rendering
    // your component
    ready,

    // here you can retrieve any method from
    // any config
    {
      firstConfig: {
        firstConfigMethod
      }
    },

    // here you can retrieve refs which names
    // you have passed as an argument
    // to useRefGroups below
    {
      firstConfig: {
        first,
        second,
        third
      }
    }
  ] = useRefGroups({
    firstConfig: `
      first
      second
      third
    `
  });

  // ...
});
```

As you could notice `withRefGroups` (HOC) is a default export and `useRefGroups` is named export. This distinction is made intentionally. The reason for this lies in React refs working.

If you use React ref on first element, unmount this element and at the same time mount second element - on mounting second element ref would contain unmounted first element. This is usual totally okay. However `react-ref-groupie` designed such a way that if you use it in some component and retrieve refs from context (RefProvider), on component unmounting library should unlock used refs for subsequent usage. This is important because check if specific ref locked or not happens on component mounting.

`react-ref-groupie` ensures that before rendering any component all refs used in unmounted component will be cleared. That way it always can tell when you use ref multiple times or not.

HOC is default export becasue it should be used by default. It handles for you work of waiting when previous ref is cleared.

Hook however may be usefull if you want made some work as soon as possible - fetching data may be the case. However please notice that first array parameter `useRefGroups` returns is a flag you should use to determine if component ready to be animated on or not. If it is not ready you may decide to not render React elements at all, however you still can fetch any data you want or make some side effects/initializing.

## 4. Refs locking

The most important part of `react-ref-groupie` is mechanism of locking refs - you can reuse same config with refs processing (animations for example) between different parts of application with single rule - in each moment of time each configs ref should be used once. If multiple components will try to use single ref - nothing will happened (library cares about your app runtime and will not throw error but will log it instead), processing will not fire.

That is the mechanism you need to ensure during development that your ref usage is correct. If you need however to animate different React elements with same config - just make sure you attach each ref only once, and before you attach it to another component just call ref providing method without this ref name. The same rule goes for global refs.

If you need to use single config simultaneously, just export it under a different name:

`ref-config.js`

```js
import firstConfig from './first-config';
import secondConfig from './second-config';
// ...

export default {
  firstConfig,
  secondConfig,
  // ...
  anotherUsageFirstConfig: firstConfig
};
```

That way `react-ref-groupie` will work with `anotherUsageFirstConfig` as with entirely different namespace, and it will track refs locking separately.

Gif below illustrates what will happen if you use same refs in multiple components. On clicking "Use circles/squares config" you can choose which refs to use in Circles component (red one). Errors will be logged if you try to call config methods if you use same refs in multiple components, but since the moment you start to use different refs - methods will be available again.

![](./gifs/incorrect-usage.gif)

## 5. Errors handling

You may run into errors when you try to call configs method which operates on elements but they are undefined. This happens when you didn't assign refs you want to animate/process.

If this is your case and you sure that this case is correct for your situation, you should handle this error by yourself, will it be wrapping whole insides of configs method in try/catch or you will handle there async errors. You may even utilize [method arguments](#1.-create-ref-config) to pass callbacks for correct/incorrect behaviours.

# Examples

* [Integration with GSAP](https://react-ref-groupie.github.io/example-gsap/) [[repo](https://github.com/react-ref-groupie/example-gsap)] - this is a complete [RCA](https://github.com/facebook/create-react-app)-based app which shows `react-ref-groupie` integration with [GSAP](https://greensock.com/gsap).

With time new example apps may emerge, however implementations will be about the same core concept of handling ref manipulations in configs.

# Roadmap

* Implement memoization for `getRefGroups`/`useRefGroups`
* Add tests and integration with [Travis CI](https://github.com/marketplace/travis-ci)
* Add [JSDocs](http://usejsdoc.org/)

# License

[MIT](LICENSE)
