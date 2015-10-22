/** @jsx hJSX */

import { hJSX } from '@cycle/dom'

export default function noPage (route$) {
  const vtree$ = route$
    .filter(route => route.name === 'noPage')
    .map(route => (
      <section>
        <h1>Not Found</h1>
        <p><a href="#">home</a></p>
      </section>
    ))

  return {
    dom: vtree$
  }
}
