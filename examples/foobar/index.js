import { run } from '@cycle/core'
import { makeDOMDriver } from '@cycle/dom'
import { makeHashChangeDriver } from 'cycle-hashchange-driver'
import vtreeSwitcher from '../../src'

import routes from './routes'

function main (responses) {
  const [vtree$, requestMap] = vtreeSwitcher(routes, responses)
  return {
    dom: vtree$
  }
}

run(main, {
  dom: makeDOMDriver('main'),
  path: makeHashChangeDriver()
})
