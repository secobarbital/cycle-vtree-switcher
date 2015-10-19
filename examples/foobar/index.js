import { run, Rx } from '@cycle/core'
import { makeDOMDriver } from '@cycle/dom'
import { makeHashChangeDriver } from 'cycle-hashchange-driver'
import vtreeSwitcher from '../../src'

import routes from './routes'

function main (responses) {
  const [vtree$, requestMap] = vtreeSwitcher(routes, responses)
  return {
    DOM: vtree$
  }
}

run(main, {
  DOM: makeDOMDriver('main'),
  Path: makeHashChangeDriver()
})
