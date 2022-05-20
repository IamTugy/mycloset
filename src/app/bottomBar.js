import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {useDispatch, useSelector} from 'react-redux'
import {setTab, TabOptions} from './store/appSlice'
import { GiLockedChest, GiAmpleDress } from 'react-icons/gi';
import { GoHome } from 'react-icons/go';
import { MdQrCodeScanner } from 'react-icons/md';
import {IconContext} from 'react-icons';


export const BottomTabs = () => {
  const currentTab = useSelector(state => state.application.currentTab)
  const dispatch = useDispatch()

  return (
    <IconContext.Provider value={{ color: undefined, className: "global-class-name", size: "30" }}>
      <Tabs
        value={currentTab}
        onChange={(event, newValue) => dispatch(setTab(newValue))}
      >
          <Tab icon={<GiLockedChest />} aria-label={TabOptions.MyCloset} />
          <Tab icon={<GoHome />} aria-label={TabOptions.Feed} />
          <Tab icon={<GiAmpleDress />} aria-label={TabOptions.Stylist} />
          <Tab icon={<MdQrCodeScanner />} aria-label={TabOptions.QR} />
      </Tabs>
    </IconContext.Provider>
  );
}

export default BottomTabs
