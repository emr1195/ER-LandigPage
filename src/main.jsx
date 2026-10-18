import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles.css'
import App from './App'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import {Provider} from 'react-redux'
import {store} from './store'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <Provider store={store}>
    <RouterProvider router={createBrowserRouter([{path: '*', element: <App/>}], {basename: import.meta.env.BASE_URL})}/>
  </Provider>,
  // </React.StrictMode>,
)
