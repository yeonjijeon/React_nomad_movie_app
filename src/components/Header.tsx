import { Variants, motion } from 'framer-motion'
import { Link, useMatch } from 'react-router-dom'
import styled from 'styled-components'

const Menu = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 80px;
`

const MenuItem = styled(motion.li)`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-right: 40px;
  font-size: 25px;
  position: relative;
`

const Circle = styled(motion.span)`
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 7px;
  height: 7px;
  border-radius: 7px;
  bottom: -10px;
  background-color: red;
`

const ItemVariants: Variants = {
  hover: {
    opacity: 0.5,
  },
  click: {
    scale: 1.2,
  },
}

function Header() {
  const isHome = useMatch('/')
  const isComing = useMatch('/coming-soon')
  const isNow = useMatch('/now-playing')

  return (
    <Menu>
      <MenuItem variants={ItemVariants} whileHover="hover" whileTap="click">
        <Link to="/">
          POPULAR
          {isHome && <Circle layoutId="circle" />}
        </Link>
      </MenuItem>
      <MenuItem variants={ItemVariants} whileHover="hover" whileTap="click">
        <Link to="/coming-soon">
          COMING SOON
          {isComing && <Circle layoutId="circle" />}
        </Link>
      </MenuItem>
      <MenuItem variants={ItemVariants} whileHover="hover" whileTap="click">
        <Link to="/now-playing">
          NOW PLAYING
          {isNow && <Circle layoutId="circle" />}
        </Link>
      </MenuItem>
    </Menu>
  )
}

export default Header
