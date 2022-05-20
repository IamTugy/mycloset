import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { BsStar, BsStarFill } from 'react-icons/bs';
import {IconContext} from 'react-icons';
import {products} from './dataMock/products'
import {useDispatch, useSelector} from 'react-redux'
import _ from 'lodash'
import {flipStarVote, setShownUser} from './store/appSlice'

import michael from '../static/assets/michael.jpeg'
import eitan from '../static/assets/eitan.jpeg'
import finkel from '../static/assets/finkel.jpeg'
import elkis from '../static/assets/elkis.jpeg'
import reznic from '../static/assets/reznic.jpeg'

import model_1_4 from '../static/assets/1_4.jpg'
import model_1_5 from '../static/assets/1_5.jpg'
import model_1_6 from '../static/assets/1_6.jpg'
import model_2_4 from '../static/assets/2_4.jpg'
import model_2_5 from '../static/assets/2_5.jpg'
import model_2_6 from '../static/assets/2_6.jpg'
import model_3_4 from '../static/assets/3_4.jpg'
import model_3_5 from '../static/assets/3_5.jpg'
import model_3_6 from '../static/assets/3_6.jpg'

import {useState} from 'react'
import {Stack} from '@mui/material'
import {GiPriceTag} from 'react-icons/gi'


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
    }
  }
  return options[shirt.id][pants.id]
}


const CardContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
`;

const ScoreRow = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  align-items: center;
  padding-bottom: 10px;
`;

const CollectionName = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 30px;
`;

const ScoreWrapper = styled.div`
  min-width: 30px;
  padding-right: 5px;
`;


const getSets = (users) => (
  _.flatten(users.map(user => (
    _.map(user.custom_clothing_sets.sets, (value, key) => {
      const stars = users.filter(u => u.liked_sets.includes(_.toNumber(key))).length
      return {
        stars,
        id: _.toNumber(key),
        creator: user,
        name: user.custom_clothing_sets.name,
        items: value.map(product_id => (
          _.head(products.filter(product => product.id === product_id))
        )),
        create_time_ago: user.custom_clothing_sets.create_time_ago,
      }
    })
  ))
))


const getProfileImage = (user_id) => {
  switch (user_id) {
    case 317593457:
      return michael;
    case 215875459:
      return eitan;
    case 315893091:
      return finkel;
    case 209375629:
      return elkis;
    case 394870293:
      return reznic;
    default:
      return
  }
}


const Item = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const Total = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

const Price = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-right: 20px;
`;


const FeedItem = ({set, me, voted = false, loading = false}) => {
  const dispatch = useDispatch()
  const  [open, setOpen] = useState(false)

  return (
    <Card sx={{ maxWidth: 345, m: 2 }}>
      <CardHeader
        avatar={
          <Avatar
            alt={set.creator.name}
            src={getProfileImage(set.creator.id)}
            onClick={() => dispatch(setShownUser(set.creator))}
          />
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={set.creator.name}
        subheader={set.create_time_ago}
      />
      <div onClick={() => setOpen(!open)}>
        <CardMedia
          component="img"
          image={getModelBySet(set.items)}
          alt={set.name}
        />

        <CardContent>
          <CardContentWrapper>
            <ScoreRow>
              <IconContext.Provider value={{ color: voted && "#ffa000", className: "global-class-name", size: "20" }}>
                <ScoreWrapper>{set.stars}</ScoreWrapper>
                <div onClick={(event) => {
                  event.stopPropagation()
                  dispatch(flipStarVote(set.id))
                }}>
                  {voted ? <BsStarFill/> : <BsStar/>}
                </div>
              </IconContext.Provider>
              <CollectionName>{set.name}</CollectionName>
            </ScoreRow>
          </CardContentWrapper>
        </CardContent>

        {open && <Stack spacing={1} paddingBottom='10px' paddingLeft='10px'>
          {set.items.map((item, index) => (
            <Item key={`item-${index}`}>
              <IconContext.Provider value={{ className: "global-class-name", size: "25" }}>
                <Price><GiPriceTag style={{paddingRight: '5px'}}/>{item.price}$</Price>
              </IconContext.Provider>
              {item.name}
            </Item>
          ))}
          {set.items.length > 1 && <Total>
            <IconContext.Provider value={{className: 'global-class-name', size: '25'}}>
              <Price><GiPriceTag style={{paddingRight: '5px'}}/>{_.sum(set.items.map(item => item.price))}$</Price>
            </IconContext.Provider>
            Total
          </Total>}
        </Stack>}
      </div>
    </Card>
  );
}

FeedItem.propTypes = {
  loading: PropTypes.bool,
  title: PropTypes.string,
  index: PropTypes.number,
};

const ListWrapper = styled.div`
  width: 100%;
  height: 700px;
  max-width: 360px;
  overflow: scroll;
`;

export const Feed = () => {
  const users = useSelector(state => state.application.users)
  const sets = getSets(users)
  const me = users[0]

  return <ListWrapper>
    {
      sets.map((set, index) => (
        <FeedItem
          set={set}
          key={`feed-item-${index}`}
          index={index}
          voted={me.liked_sets.includes(set.id)}
          me={me}
        />
      ))
    }
  </ListWrapper>
}

export default Feed;
