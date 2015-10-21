/** @jsx hJSX */

import { hJSX } from '@cycle/dom'

export default function fooPage ({ route: route$ }) {
  return {
    DOM: route$
      .filter(route => route.name === 'fooPage')
      .map(route => (
        <section>
          <h1>Foo Page: {route.params.id}</h1>
          <p><a href="#bar/fromFoo">bar</a></p>
          <p><a href="#">home</a></p>
        </section>
      ))
  }
}
