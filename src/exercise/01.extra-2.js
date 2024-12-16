import * as React from 'react';

function countReducer(state, action) {
  return { ...state, count: action.count };
}

const initialCount = 0;

function Counter({ step = 1 }) {
  const [state, setState] = React.useReducer(countReducer, { count: initialCount });
  const { count } = state;

  const increment = () => setState({ count: count + step });

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