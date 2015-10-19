/** @jsx hJSX */

import { Rx } from '@cycle/core'
import { hJSX } from '@cycle/dom'

export default function homePage ({ Route }) {
  return {
    DOM: Rx.Observable.just(
      <section>
        <h1>Home Page</h1>
        <p><a href="#foo/fromHome">foo</a></p>
        <p><a href="#bar/fromHome">bar</a></p>
      </section>
    )
  }
}
