import * as React from 'react';
import One from "./03.extra-1"
import Two from "./03.extra-2"

const CountContext = React.createContext();

function CountProvider({ children }) {
  const [count, setCount] = React.useState(0);
  const value = [count, setCount];

  return (
    <CountContext.Provider value={value}>
      {children}
    </CountContext.Provider>
  );
}

function CountDisplay() {
  
  const [count] = React.useContext(CountContext);
  return <h1>{count}</h1>;
}

function Counter() {
  
  const [, setCount] = React.useContext(CountContext);
  const increment = () => setCount(c => c + 1);
  return <button onClick={increment}>Increment count</button>;
}

function App() {
  return (
    <>
    <CountProvider>
      <CountDisplay />
      <Counter />
    </CountProvider>
    <One/>
    <Two/>
    </>
  );
}

export default App;