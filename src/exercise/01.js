import * as React from 'react';
import One from "./01.extra-1"
import Two from "./01.extra-2"
import Three from "./01.extra-3"
import Four from "./01.extra-4"
function Counter({ initialCount = 0, step = 1 }) {
  const countRef = React.useRef(initialCount);
  const [, forceUpdate] = React.useState(); 

  const increment = () => {
    countRef.current += step;
    forceUpdate({});
  };


  return (
    <div>
      <button onClick={increment}>{countRef.current}</button>
      <One/>
      <Two/>
      <Three/>
      <Four/>
    </div>
  );
}

function App() {
  return <Counter initialCount={0} step={2} />;
}

export default App;