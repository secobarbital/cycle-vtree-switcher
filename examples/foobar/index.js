import { run } from '@cycle/core'
import { makeDOMDriver } from '@cycle/dom'
import { makeHashChangeDriver } from 'cycle-hashchange-driver'
import vtreeSwitcher from '../../src'

import routes from './routes'

function main (responses) {
  return vtreeSwitcher(routes, responses.path, responses)
}

run(main, {
  DOM: makeDOMDriver('main'),
  path: makeHashChangeDriver()
})
