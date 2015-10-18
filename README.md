# Cycle VTree Switcher

A helper for [Cycle.js](http://cycle.js.org/) apps to perform routing.

## Install

```sh
npm install cycle-vtree-switcher
```

## API

### ```vtreeSwitcher(routes: Object, responses: Object) -> [vtree$: Observable, requests: Object]```

Input:

 * ```routes```: an object mapping from ```routington``` route definitions to route handlers which are functions like Cycle.js main functions: ```main(responses: Object) -> requests: Object```
 * ```responses```: an object containing Cycle.js driver responses/sources. Must include a ```Path``` response, which can be built using [```cycle-pushstate-driver```](https://github.com/secobarbital/cycle-pushstate-driver)

Output:

 * ```vtree$```: an Observable of vtrees that is the result of switching among the vtree outputs of the route handlers according to the current path
 * ```requests```: an object containing Cycle.js driver requests/sinks, which you can combine to return to the drivers

## Usage

Basics:

```js
import { makeRouter } from 'cycle-route'

const router = makeRouter({
  '/': 'home',
  '/foo/:bar': 'foo',
  '*': 'notfound'          // default route
})

router('/')
```

[Cycle.js](http://cycle.js.org/) use case:

```js
import { run, Rx } from '@cycle/core'
import { makeDOMDriver } from '@cycle/dom'
import { makeFetchDriver } from ‘@cycle/fetch’
import { makePushStateDriver } from 'cycle-pushstate-driver'
import vtreeSwitcher from 'cycle-vtree-switcher'

import owers from './owers'
import owees from './owees'
import transactions from './transactions'
import notfound from './notfound'

const routes = {
  '/': owers,
  '/owers/:ower': owees,
  '/transactions/:ower/:owee': transactions,
  '*': notfound
}

function main (responses) {
  const { DOM, Fetch, Path } = responses

  const [vtree$, requestMap] = vtreeSwitcher(routes, responses)

  return {
    DOM: vtree$,
    Path: navigate$
  }
}

run(main, {
  DOM: makeDOMDriver('main'),
  Path: makePushStateDriver()
})
```
