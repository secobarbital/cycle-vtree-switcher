/** @jsx hJSX */

import { Rx } from '@cycle/core'
import { hJSX } from '@cycle/dom'

export default function fooPage ({ Route }) {
  return {
    DOM: Route
      .do(console.log.bind(console, 'Route'))
      .filter(route => route.name === 'fooPage')
      .map(route => (
        <section>
          <h1>Foo Page: {route.params.id}</h1>
          <p><a href="#bar/fromFoo">bar</a></p>
          <p><a href="#">home</a></p>
        </section>
      ))
      .startWith(
        <section>
          <h1>Foo Page: Loading...</h1>
        </section>
      )
  }
}
