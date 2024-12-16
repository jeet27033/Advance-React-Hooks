import * as React from 'react';

function countReducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + action.step };
    default:
      return state;
  }
}

const initialCount = 0;

function Counter({ step = 1 }) {
  const [state, dispatch] = React.useReducer(countReducer, { count: initialCount });
  const { count } = state;

  const increment = () => dispatch({ type: 'INCREMENT', step });

  return (
    <div>
      <button onClick={increment}>{count}</button>
    </div>
  );
}

function App() {
  return <Counter step={2} />;
}

export default App;