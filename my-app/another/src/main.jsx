import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'react-toastify/dist/ReactToastify.css';
import App from './App.jsx'
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { UserProvider } from "./context/UserContext";
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <UserProvider>
        <App />
      </UserProvider>
    </Provider>
  </StrictMode>
)
