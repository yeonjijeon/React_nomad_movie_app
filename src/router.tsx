import App from './App'
import { createBrowserRouter } from 'react-router-dom'
import Movies from './components/Movies'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Movies />,
        children: [
          {
            path: 'movies/:movieId',
            element: <Movies />,
          },
          {
            path: 'coming-soon',
            element: <Movies />,
            children: [
              {
                path: 'movies/:movieId',
                element: <Movies />,
              },
            ],
          },
          {
            path: 'now-playing',
            element: <Movies />,
            children: [
              {
                path: 'movies/:movieId',
                element: <Movies />,
              },
            ],
          },
        ],
      },
    ],
  },
])
