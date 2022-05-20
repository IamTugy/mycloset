import styled from 'styled-components';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';


import closet_logo from '../static/assets/closet.png'
import qr from '../static/assets/qr-code.png'
import './App.css';
import {BottomTabs} from './bottomBar'
import {useSelector} from 'react-redux'
import {TabOptions} from './store/appSlice'
import Feed from './feed'
import Stylist from './stylist'
import MyCloset from './mycloset'
import Recommendation from './recommendation/recommendation'
import KeepMountedModal from '../profileModal'

const Main = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const TopBarWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0.5rem;
  align-items: center;
  box-sizing: border-box;
`;

const TopBarRightSection = styled.div`
  display: flex;
  flex-basis: 100%;
  justify-content: flex-end;
`;

const BottomWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: auto;
  padding: 0.5rem;
  align-items: center;
  justify-content: space-between;
  overflow-y: scroll;
  box-sizing: border-box;
`;

const QR = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
`;

const MainSection = () => {
  const currentTab = useSelector(state => state.application.currentTab)

  switch (currentTab) {
    case TabOptions.MyCloset:
      return <MyCloset/>
    case TabOptions.Stylist:
      return <Stylist/>
    case TabOptions.Feed:
      return <Feed/>
    case TabOptions.QR:
      return (
        <QR>
          <img src={qr} style={{width: '350px'}}/>
          My Profile QR
        </QR>
      )
    default:
      return <div/>
  }
}

const App = () => {
  const recommendationFinished = useSelector(state => state.application.recommendationFinished)
  return (
    <div className="App">
      {recommendationFinished ?
        <Main>
          <TopBarWrapper>
            <img id="closet_logo" src={closet_logo} style={{height: '2rem'}}/>
            <TopBarRightSection>
              <IconButton size="large" aria-label="search" color="inherit">
                <SearchIcon/>
              </IconButton>
              <IconButton
                size="large"
                aria-label="display more actions"
                edge="end"
                color="inherit"
              >
                <MoreIcon/>
              </IconButton>
            </TopBarRightSection>
          </TopBarWrapper>
          <BottomWrapper>
            <MainSection/>
            <BottomTabs/>
          </BottomWrapper>
        </Main> : <Recommendation/>}
        <KeepMountedModal/>
    </div>
  );
}

export default App;
