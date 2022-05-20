import * as React from 'react';
import Modal from '@mui/material/Modal';
import styled from 'styled-components'
import {useDispatch, useSelector} from 'react-redux'
import { setShownUser} from './app/store/appSlice'
import { Typography} from '@mui/material'
import Avatar from '@mui/material/Avatar'
import CardHeader from '@mui/material/CardHeader'
import { HiUsers } from 'react-icons/hi';
import { BsStarFill } from 'react-icons/bs';
import { IoPersonAdd, IoPerson } from 'react-icons/io5';

import michael from './static/assets/michael.jpeg'
import eitan from './static/assets/eitan.jpeg'
import finkel from './static/assets/finkel.jpeg'
import elkis from './static/assets/elkis.jpeg'
import reznic from './static/assets/reznic.jpeg'
import _ from 'lodash'
import IconButton from '@mui/material/IconButton'


const ModalWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 350px;
  background-color: white;
`

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`

const ModalHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

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

const FollowersWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
  margin-bottom: 10px;
`

const ItemWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export default function KeepMountedModal() {
  const userShown = useSelector(state => state.application.userShown)
  const users = useSelector(state => state.application.users)
  const me = users[0]
  const dispatch = useDispatch()

  const followers = userShown && users.filter(user => user.Followers.includes(userShown.id)).length
  const currentSetId = userShown && _.toNumber(_.head(_.map(userShown.custom_clothing_sets.sets, (value, key) => key)))
  const stars = userShown && users.filter(user => user.liked_sets.includes(currentSetId)).length

  return (
    <div>
      {userShown && <Modal
        keepMounted
        open={Boolean(userShown)}
        onClose={() => dispatch(setShownUser(null))}
      >
        <ModalWrapper>
          <ModalHeader>
            <CardHeader
              avatar={
                <Avatar
                  alt={userShown.name}
                  src={getProfileImage(userShown.id)}
                />
              }
              action={
                <IconButton aria-label="follow">
                  {userShown.Followers.includes(me.id) ? <IoPerson/> : <IoPersonAdd/>}
                </IconButton>
              }
              title={
                <Typography variant="h6" component="h2">
                  {userShown.name}
                </Typography>
              }
              style={{display: 'flex', flexBasis: '100%'}}
            />
          </ModalHeader>
          <ModalContent>
            <FollowersWrapper>
              <ItemWrapper><HiUsers style={{paddingRight: '5px'}}/>{`${followers} Folower${followers > 1 ? 's' : ''}`}</ItemWrapper>
              <ItemWrapper><BsStarFill style={{paddingRight: '5px'}}/>{`${stars} Star${stars > 1 ? 's' : ''}`}</ItemWrapper>
            </FollowersWrapper>
          </ModalContent>
        </ModalWrapper>
      </Modal>}
    </div>
  );
}
