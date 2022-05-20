import * as React from 'react'
import styled from 'styled-components'
import {useState} from 'react'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import {useDispatch} from 'react-redux'
import {IconContext} from 'react-icons'

import model1 from '../../static/assets/models/model1.jpeg'
import model2 from '../../static/assets/models/model2.jpeg'
import model3 from '../../static/assets/models/model3.jpeg'
import model4 from '../../static/assets/models/model4.jpeg'
import model5 from '../../static/assets/models/model5.jpeg'
import model6 from '../../static/assets/models/model6.jpeg'
import model7 from '../../static/assets/models/model7.jpeg'
import model8 from '../../static/assets/models/model8.jpeg'
import {finishedRecommendation} from '../store/appSlice'
import {Button, CircularProgress} from '@mui/material'
import closet_logo from '../../static/assets/closet.png'


const models = [model1, model2, model3, model4, model5, model6, model7, model8];


const Main = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
`

const Model = ({model, index}) => {
  const [picked, setPicked] = useState(false)
  return (
        <ImageListItem>
          <img
            src={model}
            srcSet={model}
            alt={`model-${index}`}
            loading="lazy"
            style={{opacity: `${picked ? 100 : 30}%`}}
            onClick={() => setPicked(!picked)}
          />
        </ImageListItem>
  )
}

const StandardImageList = () => {
  return (
    <ImageList sx={{ width: 500, height: 600 }} cols={2} >
      {models.map((model, index) => (
        <Model
           key={`model-${index}`}
          model={model}
          index={index}
        />
      ))}
    </ImageList>
  );
}

const Logo = styled.div`
  font-family: PlaylistScript;
  font-size: 90px;
  color: #ff8f8f;
`;

export const Recommendation = () => {
  const [load, setLoad] = useState(false)
  const dispatch = useDispatch()

  const closeLoaderIn4Seconds = () => {
    setLoad(true)
    setTimeout(() => {
      dispatch(finishedRecommendation())
    }, 4000);
  }

  return (
    <Main>
      {load ?
        <>
          <Logo> Lamode </Logo>
          <h2>Taylor made clothes are being prepared for you</h2>
          <CircularProgress size={100} style={{padding: "20px"}}/>
        </> :
        <>
          <h3>Pick the style you're connected to</h3>
          <StandardImageList/>
          <Button variant="contained" onClick={() => closeLoaderIn4Seconds()}>Im Done</Button>
        </>}
    </Main>
  )
}

export default Recommendation
