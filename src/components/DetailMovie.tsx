import { useQuery } from '@tanstack/react-query'
import { AnimatePresence, Variants, motion, useScroll } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { IMovieDetail, getMovie, makeBgPath } from '../api'
import { useState } from 'react'

const MovieDetail = styled(motion.div)`
  background-color: rgb(20, 20, 20);
  position: absolute;
  width: 40vw;
  height: 85vh;
  top: 20px;
  left: 0;
  right: 0;
  border-radius: 15px;
  margin: 0 auto;
`

const MoviePhoto = styled.div<{ bgphoto: string }>`
  display: flex;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(20, 20, 20, 1)),
    url(${(props) => props.bgphoto});
  border-radius: 15px;
  width: 40vw;
  height: 40vh;
  background-size: cover;
  background-position: center center;
`

const MovieDiscription = styled.div`
  padding: 20px 20px;
`

const MovieDetailHeader = styled.div`
  display: flex;
  flex-direction: row;
`

const MovieTitle = styled.h1`
  display: flex;
  justify-content: center;
  padding-bottom: 30px;
  padding-right: 10px;
  font-size: 30px;
`

const MovieRating = styled.div`
  display: flex;
  justify-content: center;
`

const MovieStar = styled.svg`
  fill: #ffff87;
  display: flex;
  width: 20px;
  height: 35px;
`

const MovieGenre = styled.div`
  background-color: #8d8181;
  height: fit-content;
  border-radius: 8px;
  padding: 3px;
  color: black;
  font-size: 14px;
  margin: 4px;
`

const MovieOverview = styled.h1`
  font-size: 18px;
`

const MoiveInfo = styled.ul`
  padding: 30px 0px;
`
const MovieInfoItem = styled.li``

const CloseButton = styled(motion.svg)`
  position: absolute;
  width: 33px;
  height: 30px;
  fill: rgba(0, 0, 0, 0.3);
  right: 0;
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
}

function DetailMovie({ movieId = '' }) {
  const navigate = useNavigate()
  const { isLoading, data } = useQuery<IMovieDetail>(['detail'], () =>
    getMovie(movieId)
  )
  const [leaving, setLeaving] = useState(false)
  const toggleLeaving = () => setLeaving((prev) => !prev)

  const onBtnClick = () => navigate(-1)

  return (
    <AnimatePresence onExitComplete={toggleLeaving}>
      <MovieDetail
        layoutId={movieId}
        variants={detailVariants}
        initial="initial"
        animate="visible"
        exit="exit"
        key={leaving + ''}
      >
        <CloseButton
          viewBox="0 0 20 20"
          aria-hidden="true"
          onClick={onBtnClick}
        >
          <motion.path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
          ></motion.path>
        </CloseButton>

        {isLoading ? (
          'Loading...'
        ) : (
          <>
            <MoviePhoto bgphoto={data ? makeBgPath(data?.backdrop_path) : ''} />
            <MovieDiscription>
              <MovieDetailHeader>
                <MovieTitle>{data ? data?.title : ''}</MovieTitle>
                <MovieRating>
                  {new Array(Math.floor((data ? data?.vote_average : 0) / 2))
                    .fill(0)
                    .map((data, index) => {
                      return (
                        <MovieStar
                          key={index}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                        >
                          <motion.path
                            clipRule="evenodd"
                            fillRule="evenodd"
                            d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                          ></motion.path>
                        </MovieStar>
                      )
                    })}
                </MovieRating>
                {data?.genres.slice(0, 3).map((data) => {
                  return <MovieGenre key={data.id}>{data.name}</MovieGenre>
                })}
              </MovieDetailHeader>

              <MovieOverview>{data ? data?.overview : ''}</MovieOverview>
              <MoiveInfo>
                <MovieInfoItem>
                  Budget: ${data ? data?.budget : 0}
                </MovieInfoItem>
                <MovieInfoItem>
                  Revenue: ${data ? data?.revenue : 0}
                </MovieInfoItem>
                <MovieInfoItem>
                  Runtime: {data ? Math.floor(data?.runtime / 60) : 0} Hours{' '}
                  {data ? data?.runtime % 60 : 0} Minutes
                </MovieInfoItem>
                {data?.homepage && (
                  <MovieInfoItem>
                    Homepage: {data ? data?.homepage : ''}
                  </MovieInfoItem>
                )}
              </MoiveInfo>
            </MovieDiscription>
          </>
        )}
      </MovieDetail>
    </AnimatePresence>
  )
}

export default DetailMovie
