// TODO: typescript
// import { useState, useEffect, useRef } from 'react';

// const useInterval = (callback, delay) => {
//   const savedCallback = useRefReact.RefCallback<typeof window.settimeout>(null); 

//   useEffect(() => {
//     savedCallback.current = callback; 
//   }, [callback]);

//   useEffect(() => {
//     function tick() {
//       savedCallback.current();
//     }

//     if (delay !== null) { 
//       let id = setInterval(tick, delay); 
//       return () => clearInterval(id); 
//     }
//   }, [delay]); 
// };

// export default useInterval;