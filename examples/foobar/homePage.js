/** @jsx hJSX */

import Rx from 'rx'
import { hJSX } from '@cycle/dom'

export default function homePage () {
  return {
    dom: Rx.Observable.just(
      <section>
        <h1>Home Page</h1>
        <p><a href="#foo/fromHome">foo</a></p>
        <p><a href="#bar/fromHome">bar</a></p>
      </section>
    )
  }
}
