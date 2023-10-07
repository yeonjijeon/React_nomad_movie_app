import { useQuery } from '@tanstack/react-query'
import { AnimatePresence, Variants, motion } from 'framer-motion'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { IAPIResponse, IMovieDetail, getMovie, makeBgPath } from '../api'

const MovieDetail = styled(motion.div)`
  background-color: rgb(20, 20, 20);
  position: absolute;
  width: 40vw;
  height: 85vh;
  top: 30px;
  left: 0;
  right: 0;
  border-radius: 15px;
  margin: 0 auto;
`

const DetailPhoto = styled.div<{ bgphoto: string }>`
  display: flex;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(20, 20, 20, 1)),
    url(${(props) => props.bgphoto});
  border-radius: 15px;
  width: 40vw;
  height: 40vh;
  background-size: cover;
  background-position: center center;
`

const DetailDiscription = styled.div`
  padding: 20px 20px;
`

const DetailTitle = styled.h1`
  padding-bottom: 40px;
  font-size: 30px;
`

const DetailOverview = styled.h1`
  font-size: 18px;
`

const CloseButton = styled(motion.svg)`
  position: absolute;
  width: 35px;
  height: 35px;
  fill: ${(props) => props.theme.white.lighter};
  path {
    stroke-width: 6px;
  }
  cursor: pointer;
`

const detailVariants: Variants = {
  initial: { scale: 0 },
  visible: {
    scale: 1,
  },
  exit: {
    opacity: 0,
  },
}

function DetailMovie({ movieId = '' }) {
  const navigate = useNavigate()
  const { isLoading, data } = useQuery<IMovieDetail>(['detail'], () =>
    getMovie(movieId)
  )
  console.log(data)

  const onBtnClick = () => navigate(-1)

  return (
    <AnimatePresence>
      <MovieDetail
        layoutId={movieId}
        variants={detailVariants}
        initial="initial"
        animate="visible"
        exit="exit"
      >
        <CloseButton
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          onClick={onBtnClick}
        >
          <path
            clip-rule="evenodd"
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
          ></path>
        </CloseButton>

        {isLoading ? (
          'Loading...'
        ) : (
          <>
            <DetailPhoto
              bgphoto={data ? makeBgPath(data?.backdrop_path) : ''}
            ></DetailPhoto>

            <DetailDiscription>
              <DetailTitle>{data ? data?.title : ''}</DetailTitle>
              <DetailOverview>{data ? data?.overview : ''}</DetailOverview>
            </DetailDiscription>
          </>
        )}
      </MovieDetail>
    </AnimatePresence>
  )
}

export default DetailMovie
