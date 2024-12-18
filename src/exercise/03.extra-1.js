import * as React from 'react';


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


function useCount() {
  const context = React.useContext(CountContext);
  if (!context) {
    throw new Error('useCount must be used within a CountProvider');
  }
  return context;
}

function CountDisplay() {
  
  const [count] = useCount();
  return <h1>{count}</h1>;
}

function Counter() {
  
  const [, setCount] = useCount();
  const increment = () => setCount(c => c + 1);
  return <button onClick={increment}>Increment count</button>;
}

function App() {
  return (
    <CountProvider>
      <CountDisplay />
      <Counter />
    </CountProvider>
  );
}

export default App;