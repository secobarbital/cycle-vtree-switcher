# Cycle VTree Switcher

A helper for [Cycle.js](http://cycle.js.org/) apps to perform routing.

## Install

```sh
npm install cycle-vtree-switcher
```

## API

### ```vtreeSwitcher(routes: Object, responses: Object) -> [vtree$: Observable, requests: Object]```

Input:

 * ```routes```: an object mapping from [routington](https://github.com/pillarjs/routington) route definitions to route handlers which are functions like Cycle.js main functions: ```main(responses: Object) -> requests: Object```. ```cycle-vtree-switcher``` uses [cycle-route](https://github.com/secobarbital/cycle-route) under the hood so it also supports ```*``` as the default route.
 * ```responses```: an object containing Cycle.js driver responses/sources. Must include a ```Path``` response, which can be built using [cycle-pushstate-driver](https://github.com/secobarbital/cycle-pushstate-driver).

Output:

 * ```vtree$```: an Observable of vtrees that is the result of switching among the vtree outputs of the route handlers according to the current path
 * ```requests```: an object containing Cycle.js driver requests/sinks, which you can combine to return to the drivers

## Gotchas

 * ```Rx.Observable.combineLatest``` is used to combine the route and route handlers, and it will only emit when every source has emitted, so make sure to have each route handler emit a starting vtree. This could be a loading page.

## Usage

Check out [the example](https://github.com/secobarbital/cycle-vtree-switcher/blob/master/examples/foobar/index.js).

## Real World Example

[iouo.me](https://github.com/secobarbital/iouo.me/blob/ba6608179a7bc69e81c378b2639014de7f9c1f26/src/index.js)
