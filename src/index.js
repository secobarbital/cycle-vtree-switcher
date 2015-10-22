import Rx from 'rx'
import { makeRouter } from 'cycle-route'

export default function vtreeSwitcher (
  routes, responses, { pathDriver = 'path', domDriver = 'dom' } = {}
) {
  const path$ = responses[pathDriver]

  // { rule: handler } => { rule: name }, { name: handler }
  const rules = Object.keys(routes)
  const [ ruleNames, nameHandlers ] = rules.reduce(([ ruleNames, nameHandlers ], route) => {
    const handler = routes[route]
    nameHandlers[handler.name] = handler
    ruleNames[route] = handler.name
    return [ ruleNames, nameHandlers ]
  }, [ {}, {} ])

  const matchRoute = makeRouter(ruleNames)
  const route$ = path$.map(matchRoute)

  const names = Object.keys(nameHandlers)
  const [ nameIdx, requests ] = names.reduce(([ nameIdx, requests ], name, i) => {
    const handler = nameHandlers[name]
    nameIdx[name] = i
    requests[name] = handler(route$, responses)
    return [ nameIdx, requests ]
  }, [ {}, {} ])

  const vtree$s = names.map(name => requests[name][domDriver].startWith(null))
  const vtree$ = Rx.Observable.combineLatest(...vtree$s)
    .withLatestFrom(route$, (vtrees, route) => vtrees[nameIdx[route.name]])
    .filter(vtree => vtree)

  return [ vtree$, requests ]
}
