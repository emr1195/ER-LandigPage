import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {startLoadingLandingPage} from '../../store/landingPage'
import './styles.css'
import {Navbar} from '../components/navbar/Navbar'
import {HeroSection} from '../components/heroSection'
export const HomePage = () => {
  const dispatch = useDispatch()

  const {info: navbarInfo} = useSelector((state) => state.navbar)
  const {info: heroSectionInfo} = useSelector((state) => state.heroSection)

  useEffect(() => {
    dispatch(startLoadingLandingPage())
  }, [])

  return (
    <main>
      <Navbar navbarInfo={navbarInfo} />
      <HeroSection heroSectionInfo={heroSectionInfo} />
      {/* {info.listMenu.map((item, index) => (
        <div key={index}>{item.title}</div>
      ))} */}
      {/* Hola Mundo */}
    </main>
  )
}
