import * as React from 'react'
import {
  fetchPokemon,
  PokemonForm,
  PokemonDataView,
  PokemonInfoFallback,
  PokemonErrorBoundary,
} from '../pokemon'

function pokemonInfoReducer(state, action) {
  switch (action.type) {
    case 'pending':
      return { status: 'pending', data: null, error: null }
    case 'resolved':
      return { status: 'resolved', data: action.data, error: null }
    case 'rejected':
      return { status: 'rejected', data: null, error: action.error }
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

function useAsync(asyncCallback, initialState, dependencies) {
  const [state, dispatch] = React.useReducer(pokemonInfoReducer, initialState)

  React.useEffect(() => {
    const promise = asyncCallback()
    if (!promise) {
      return
    }
    dispatch({ type: 'pending' })
    promise.then(
      data => {
        dispatch({ type: 'resolved', data })
      },
      error => {
        dispatch({ type: 'rejected', error })
      },
    )
  }, dependencies)

  return state
}

function PokemonInfo({ pokemonName, memoizeDependencies }) {
  const { data, status, error } = useAsync(
    React.useCallback(() => {
      if (!pokemonName) {
        return
      }
      return fetchPokemon(pokemonName)
    }, memoizeDependencies), 
    { status: pokemonName ? 'pending' : 'idle', data: null, error: null },
    [pokemonName, ...memoizeDependencies] 
  )

  switch (status) {
    case 'idle':
      return <span>Submit a pokemon</span>
    case 'pending':
      return <PokemonInfoFallback name={pokemonName} />
    case 'rejected':
      throw error
    case 'resolved':
      return <PokemonDataView pokemon={data} />
    default:
      throw new Error('This should be impossible')
  }
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')
  const [memoizeDependencies, setMemoizeDependencies] = React.useState([])

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  function handleReset() {
    setPokemonName('')
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div>
        <label>
          Custom Memoization Dependencies (comma-separated):
          <input
            type="text"
            onChange={e => setMemoizeDependencies(e.target.value.split(',').map(dep => dep.trim()))}
          />
        </label>
      </div>
      <div className="pokemon-info">
        <PokemonErrorBoundary onReset={handleReset} resetKeys={[pokemonName]}>
          <PokemonInfo pokemonName={pokemonName} memoizeDependencies={memoizeDependencies} />
        </PokemonErrorBoundary>
      </div>
    </div>
  )
}

function AppWithUnmountCheckbox() {
  const [mountApp, setMountApp] = React.useState(true)
  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={mountApp}
          onChange={e => setMountApp(e.target.checked)}
        />{' '}
        Mount Component
      </label>
      <hr />
      {mountApp ? <App /> : null}
    </div>
  )
}

export default AppWithUnmountCheckbox