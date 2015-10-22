import Rx from 'rx'
import { makeRouter } from 'cycle-route'

export default function vtreeSwitcher (
  routes, responses, { pathDriver = 'path', domDriver = 'dom' } = {}
) {
  const path$ = responses[pathDriver]

  // { rule: handler } => { rule: name }, { name: handler }
  const [ routeHandlers, routeNames ] = Object.keys(routes).reduce(([ routeHandlers, routeNames ], route) => {
    const handler = routes[route]
    routeHandlers[handler.name] = handler
    routeNames[route] = handler.name
    return [ routeHandlers, routeNames ]
  }, [ {}, {} ])

  const matchRoute = makeRouter(routeNames)
  const route$ = path$.map(matchRoute)

  const names = Object.keys(routeHandlers)
  const [ nameIdx, requests ] = names.reduce(([ nameIdx, requests ], name, i) => {
    nameIdx[name] = i
    requests[name] = routeHandlers[name](route$, responses)
    return [ nameIdx, requests ]
  }, [ {}, {} ])

  const vtree$s = names.map(name => requests[name][domDriver])
  const vtree$ = Rx.Observable.combineLatest(
    route$, ...vtree$s,
    (route, ...vtrees) => vtrees[nameIdx[route.name]]
  )

  return [vtree$, requests]
}
