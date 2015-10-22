/** @jsx hJSX */

import { hJSX } from '@cycle/dom'

export default function homePage (route$) {
  const vtree$ = route$
    .filter(route => route.name === 'homePage')
    .map(route => (
      <section>
        <h1>Home Page</h1>
        <p><a href="#foo/fromHome">foo</a></p>
        <p><a href="#bar/fromHome">bar</a></p>
      </section>
    ))

  return {
    dom: vtree$
  }
}
