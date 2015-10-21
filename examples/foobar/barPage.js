/** @jsx hJSX */

import { hJSX } from '@cycle/dom'

export default function barPage ({ route: route$ }) {
  return {
    DOM: route$
      .filter(route => route.name === 'barPage')
      .map(route => (
        <section>
          <h1>Bar Page: {route.params.id}</h1>
          <p><a href="#foo/fromBar">foo</a></p>
          <p><a href="#">home</a></p>
        </section>
      ))
  }
}
