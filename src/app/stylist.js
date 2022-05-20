import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {IconContext} from 'react-icons';
import { IoBagAddOutline, IoBagAdd } from 'react-icons/io5';
import { GiPriceTag } from 'react-icons/gi';


import {useDispatch, useSelector} from 'react-redux'

import simple_tee from '../static/assets/1_simple_tee.jpg';
import ck_white_top from '../static/assets/2_ck_white_top.png';
import elegant_blue from '../static/assets/3_elegant_blue.png';
import alo_yoga_pants from '../static/assets/4_alo_yoga_pants.png';
import versace_jeans from '../static/assets/5_versace_jeans.png';
import Rag_and_Bone_alex_jeans from '../static/assets/6_Rag & Bone alex jeans.png';

import {products} from './dataMock/products'
import {flipOwn} from './store/appSlice'


const CardContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 5px;
`;


const Price = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;


const getImage = (product) => {
  switch (product.id) {
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

const CardMediaWrapper = styled.div`
  overflow: hidden;
  flex: 1;
`;


const Product = ({owned, product, loading = false}) => {
  const dispatch = useDispatch()
  return (
    <Card sx={{ maxWidth: 345, m: 2}}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={product.name}
        subheader={product.brand}
      />
      <CardMediaWrapper>
        <CardMedia
          component="img"
          src={getImage(product)}
          alt={product.brand}
        />
      </CardMediaWrapper>

      <CardContent>
        <CardContentWrapper>
          <IconContext.Provider value={{ className: "global-class-name", size: "25" }}>
            <Price><GiPriceTag style={{paddingRight: '5px'}}/>{product.price}$</Price>
          </IconContext.Provider>
          <IconContext.Provider value={{ color: owned && "#ff8f8f", className: "global-class-name", size: "32" }}>
            <div onClick={() => dispatch(flipOwn(product.id))}>{owned ? <IoBagAdd/> : <IoBagAddOutline/>}</div>
          </IconContext.Provider>
        </CardContentWrapper>
      </CardContent>
    </Card>
  );
}

Product.propTypes = {
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

export const Stylist = () => {
  const users = useSelector(state => state.application.users)
  const me = users[0]
  return <ListWrapper>
    {
      products.map((product, index) => (
        <Product
          owned={me.own.includes(product.id)}
          key={`product-${index}`}
          product={product}
        />
      ))
    }
  </ListWrapper>
}

export default Stylist;
