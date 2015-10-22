/** @jsx hJSX */

import { hJSX } from '@cycle/dom'

export default function barPage (route$) {
  return {
    dom: route$
      .map(route => (
        <section>
          <h1>Bar Page: {route.params.id}</h1>
          <p><a href="#foo/fromBar">foo</a></p>
          <p><a href="#">home</a></p>
        </section>
      ))
      .startWith(
        <section>
          <h1>Bar Page: Loading...</h1>
        </section>
      )
  }
}
