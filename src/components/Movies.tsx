import { useQuery } from '@tanstack/react-query'
import styled from 'styled-components'
import {
  IAPIResponse,
  getComingSoon,
  getNowPlaying,
  getPopular,
  makeImagePath,
} from '../api'
import { Variants, motion } from 'framer-motion'
import { useLocation, useMatch, useNavigate } from 'react-router-dom'

import DetailMovie from './DetailMovie'

const Wrapper = styled.div`
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 10px 230px;
`

const BoxContainter = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 80px 80px;
`

const Box = styled(motion.div)`
  text-align: center;
`

const Movie = styled(motion.div)<{ bgphoto: string }>`
  background-color: red;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  cursor: pointer;
  width: 300px;
  height: 400px;
  border-radius: 15px;
`
const Title = styled.span`
  font-size: 25px;
`

const containerVariants: Variants = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
}

const boxVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
}

const getApiFunc = (pageName: string) => {
  switch (pageName) {
    case 'coming-soon':
      return getComingSoon
    case 'now-playing':
      return getNowPlaying
    default:
      return getPopular
  }
}
function Movies() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const pageName = pathname.includes('coming-soon')
    ? 'coming-soon'
    : pathname.includes('now-playing')
    ? 'now-playing'
    : ''

  const apiFunc = getApiFunc(pageName)
  const { isLoading, data } = useQuery<IAPIResponse>([pageName], apiFunc)

  const movieDetail = useMatch(`${pageName}/movies/:movieId`)

  const onBoxClick = (movieId: number) => {
    navigate(`${pageName}/movies/${movieId}`)
  }

  return (
    <Wrapper>
      {isLoading ? (
        'Loading ... '
      ) : (
        <BoxContainter
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {data?.results.map((movie) => (
            <Box
              variants={boxVariants}
              key={movie.id}
              onClick={() => onBoxClick(movie.id)}
            >
              <Movie bgphoto={makeImagePath(movie.poster_path)}></Movie>
              <Title>{movie.title}</Title>
            </Box>
          ))}

          {movieDetail && <DetailMovie movieId={movieDetail.params.movieId} />}
        </BoxContainter>
      )}
    </Wrapper>
  )
}

export default Movies
