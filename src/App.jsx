import './App.css'
import MainPage from './components/MainPage'
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import "primereact/resources/themes/lara-light-indigo/theme.css";     
import "primereact/resources/primereact.min.css";
import 'primeicons/primeicons.css';
         

function App() {
  
  return (
    <>
      <PrimeReactProvider>
        <MainPage />
      </PrimeReactProvider>
    </>
  )
}

export default App
