import App from './App'
import { createBrowserRouter } from 'react-router-dom'
import Home from './routes/Home'
import ComingSoon from './routes/ComingSoon'
import NowPlaying from './routes/NowPlaying'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'coming-soon',
        element: <ComingSoon />,
      },
      {
        path: 'now-playing',
        element: <NowPlaying />,
      },
    ],
  },
])
