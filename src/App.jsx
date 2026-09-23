import './App.css'
import { PiHandWaving } from "react-icons/pi";

function App() {
  return (
    <div className="flex items-center gap-2 text-5xl font-bold ">
      <PiHandWaving size={40} />
      <span className='text-red-500'>Hello, Vite!</span>
    </div>
  )
}

export default App