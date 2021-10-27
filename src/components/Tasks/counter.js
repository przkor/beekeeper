import { useEffect, useState } from "react";

function Counter() {
    const [count, setCount] = useState(0);
  
    useEffect(() => {
      const id = setInterval(() => {
        setCount(c => c + 1); // ✅ Nie zależy od zewnętrznej zmiennej `count`
      }, 1000);
      return () => clearInterval(id);
    }, []); // ✅ Nasz efekt nie korzysta z żadnych zmiennych z zakresu komponentu
  
    return <h1>{count}</h1>;
  }

export default Counter