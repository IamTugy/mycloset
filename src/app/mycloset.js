import * as React from 'react'
import styled from 'styled-components'
import {Stack} from '@mui/material'
import {IconContext} from 'react-icons'
import {MdOutlineAddCircleOutline} from 'react-icons/md'
import model_1_4 from '../static/assets/1_4.jpg'
import model_1_5 from '../static/assets/1_5.jpg'
import model_1_6 from '../static/assets/1_6.jpg'
import model_2_4 from '../static/assets/2_4.jpg'
import model_2_5 from '../static/assets/2_5.jpg'
import model_2_6 from '../static/assets/2_6.jpg'
import model_3_4 from '../static/assets/3_4.jpg'
import model_3_5 from '../static/assets/3_5.jpg'
import model_3_6 from '../static/assets/3_6.jpg'
import {useDispatch, useSelector} from 'react-redux'
import _ from 'lodash'
import {useState} from 'react'
import {addSet, changeSet} from './store/appSlice'
import simple_tee from '../static/assets/1_simple_tee.jpg'
import ck_white_top from '../static/assets/2_ck_white_top.png'
import elegant_blue from '../static/assets/3_elegant_blue.png'
import alo_yoga_pants from '../static/assets/4_alo_yoga_pants.png'
import versace_jeans from '../static/assets/5_versace_jeans.png'
import Rag_and_Bone_alex_jeans from '../static/assets/6_Rag & Bone alex jeans.png'

const getImage = (product_id) => {
  switch (product_id) {
    case 1:
      return simple_tee;
    case 2:
      return ck_white_top;
    case 3:
      return elegant_blue;
    case 4:
      return alo_yoga_pants;
    case 5:
      return versace_jeans;
    case 6:
      return Rag_and_Bone_alex_jeans;
    default:
      return
  }
}

const getModelBySet = (set) => {
  const [shirt, pants] = set
  const options = {
    1: {
      4: model_1_4,
      5: model_1_5,
      6: model_1_6,
    },
    2: {
      4: model_2_4,
      5: model_2_5,
      6: model_2_6,
    },
    3: {
      4: model_3_4,
      5: model_3_5,
      6: model_3_6,
    },
  }
  return options[shirt][pants]
}

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  margin: auto;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const BottomPicker = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 360px;
  overflow: scroll;
`

const PlusButton = styled.div`
  display: flex;
  position: relative;
  height: 130px;
  width: 80px;
  padding: 5px;
  background-color: rgba(84, 84, 84, 0.3);
  align-items: center;
  justify-content: center;
`

const ClothesOptionsWrapper = styled.div`
  display: flex;
  position: absolute;
  flex-direction: column;
  justify-content: space-around;
  width: 70px;
  height: 560px;
  overflow: scroll;
  right: 5%;
  //background-color: rgba(255, 255, 255, 0.53);
`

export const MyCloset = () => {
  const users = useSelector(state => state.application.users)
  const dispatch = useDispatch()
  const me = users[0]
  const [pickedCollection, setPickedCollection] = useState(0)

  const pickedStyle = {
    opacity: '100%',
    border: '1px solid #ff8f8f',
  }

  const [currentSetId, set] = _.head(_.map(me.custom_clothing_sets.sets,
    (value, key) => [key, value]).filter((value, index) => index === pickedCollection))

  return (
    <Main>
      <Content>
        <img
          src={getModelBySet(set)}
          style={{height: '560px'}}
        />
        <ClothesOptionsWrapper>
          {
            [1,2,3,4,5,6].map(value => (
              <img
                key={`clothes-${value}`}
                src={getImage(value)}
                style={{height: '60px', opacity: `${set.includes(value) ? 100 : 50}%`}}
                onClick={() => {
                  const sett = value <= 3 ? [value, set[1]] : [set[0], value]
                  dispatch(changeSet({
                    user: 0, currentSetId, set: sett
                  }))
                }}
              />
            ))
          }
        </ClothesOptionsWrapper>
      </Content>
      <BottomPicker>
        <Stack direction="row" spacing={1} overflow="scroll">
          {
            _.map(me.custom_clothing_sets.sets, (value, key) => (value)).map((value, index) => (
              <img
                key={`model-${index}`}
                style={{height: '140px', opacity: '50%', ...(index === pickedCollection ? pickedStyle : {}) }}
                src={getModelBySet(value)}
                onClick={() => setPickedCollection(index)}
              />
            ))
          }
          <PlusButton onClick={() => {dispatch(addSet(0))}}>
            <IconContext.Provider value={{color: 'white', className: 'global-class-name', size: '50'}}>
              <MdOutlineAddCircleOutline/>
            </IconContext.Provider>
          </PlusButton>
        </Stack>
      </BottomPicker>
    </Main>
  )
}

export default MyCloset
