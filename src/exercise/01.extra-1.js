import * as React from 'react';

function countReducer(previousCount, step) {
  return previousCount + step;
}

const initialCount = 0;

function Counter({ step = 1 }) {
  const [count, changeCount] = React.useReducer(countReducer, initialCount);
  
  const increment = () => changeCount(step);

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