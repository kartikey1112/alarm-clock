import { useEffect, useState } from "react";



const App =()=>{
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(()=>{
    let interval;
    if(isRunning){
    interval = setInterval(()=>{
      setTime((prev)=>prev+10)
    },10);
  }

    return ()=>clearInterval(interval)

  },[isRunning])

  const formatTime = (time) => {
    const hours = Math.floor(time / (3600 * 1000));
    const minutes = Math.floor((time % (3600 * 1000)) / (60 * 1000));
    const seconds = Math.floor((time % (60 * 1000)) / 1000);
  
    const format = (unit) => String(unit).padStart(2, '0');
  
    return `${format(hours)}:${format(minutes)}:${format(seconds)}`;
  };
  
  return (
    <div className="App w-full h-screen">
      <div className="h-full w-full flex items-center flex-col justify-center gap-4">
        <span className="text-black font-bold text-5xl">{formatTime()}</span>
        <div className="flex gap-2">
          <button
            onClick={() => setIsRunning(true)}
            className="bg-green-500 px-4 py-2 text-white rounded-md"
          >
            Start
          </button>
          <button
            onClick={() => setIsRunning(false)}
            className="bg-red-400  px-4 py-2 text-white rounded-md"
          >
            Stop
          </button>
          <button
            onClick={() => {
              setIsRunning(false);
              setTime(0);
            }}
            className="bg-gray-600  px-4 py-2 text-white rounded-md"
          >
            reset
          </button>
    </div>
      </div>
    </div>
  );
}


export default App;