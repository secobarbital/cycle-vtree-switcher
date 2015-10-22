/** @jsx hJSX */

import Rx from 'rx'
import { hJSX } from '@cycle/dom'

export default function noPage () {
  return {
    dom: Rx.Observable.just(
      <section>
        <h1>Not Found</h1>
        <p><a href="#">home</a></p>
      </section>
    )
  }
}
