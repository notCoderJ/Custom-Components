import React, { useState, useCallback } from 'react';
import './App.css';
import styled, { ThemeProvider } from 'styled-components';
import {
  Toggle,
  Modal,
  AutoComplete,
  Tab,
  ClickToEdit,
  Tag,
} from './component';
import { KOREA_MOVIE_LIST } from './constants';

const TOGGLE_INIT = {
  default: false,
  red: false,
  pink: false,
  purple: false,
};

const TAB_LABEL = ['Tab1', 'Tab2', 'Tab3'];

function App() {
  const [toggleState, setToggleState] = useState(TOGGLE_INIT);
  const [curTab, setCurTab] = useState(0);
  const [name, setName] = useState('');
  const [age, setAge] = useState(NaN);

  const handleToggle = useCallback((e) => {
    setToggleState((tgState) => ({
      ...tgState,
      [e.target.value]: e.target.checked,
    }));
  }, []);

  const changeName = useCallback((e) => {
    setName(e.target.value);
  }, []);

  const changeAge = useCallback((e) => {
    setAge(Number(e.target.value || 'empty'));
  }, []);

  const changeTab = useCallback((_, index) => {
    setCurTab(index);
  }, []);

  const renderElements = (label) => {
    switch (label) {
      case 'Tab1':
        return 'Tab menu ONE';
      case 'Tab2':
        return 'Tab menu TWO';
      case 'Tab3':
        return 'Tab menu THREE';
      default:
        return '';
    }
  };
  return (
    <ThemeProvider
      theme={{
        palette: {
          default: '#440cb5',
          red: '#d32f2f',
          pink: '#f50057',
          purple: '#d500f9',
          off: '#bdbdbd',
        },
      }}
    >
      <Title>Custom Components</Title>
      <GroupContainer onChange={handleToggle}>
        <h2>Toggle</h2>
        <ToggleWrapper>
          <Toggle id="default-toggle" value="default" size="s" />
          <span>{`Blue Toggle Switch ${
            toggleState.default ? 'ON' : 'OFF'
          }`}</span>
        </ToggleWrapper>
        <ToggleWrapper>
          <Toggle id="red-toggle" value="red" size="s" color="red" />
          <span>{`Red Toggle Switch ${toggleState.red ? 'ON' : 'OFF'}`}</span>
        </ToggleWrapper>
        <ToggleWrapper>
          <Toggle id="pink-toggle" value="pink" size="m" color="pink" />
          <span>{`Pink Toggle Switch ${toggleState.pink ? 'ON' : 'OFF'}`}</span>
        </ToggleWrapper>
        <ToggleWrapper>
          <Toggle id="purple-toggle" value="purple" size="l" color="purple" />
          <span>{`Purple Toggle Switch ${
            toggleState.purple ? 'ON' : 'OFF'
          }`}</span>
        </ToggleWrapper>
      </GroupContainer>
      <GroupContainer>
        <h2>Modal</h2>
        <Modal label="Open Modal" content="HELLO CODESTATES!" />
        <Modal
          label="Red"
          content="I want to be frontend developer!"
          size="s"
          color="red"
        />
        <Modal
          label="Pink"
          title="JavaScript"
          content="Very strange!!"
          size="s"
          color="pink"
        />
        <Modal
          label="Purple Modal Box"
          content="It's difficult!!!"
          size="l"
          color="purple"
        />
      </GroupContainer>
      <GroupContainer>
        <h2>Tab</h2>
        <ContentsWrapper>
          <Tab labels={TAB_LABEL} onChange={changeTab} color="pink" />
          <div>{renderElements(TAB_LABEL[curTab])}</div>
        </ContentsWrapper>
      </GroupContainer>
      <GroupContainer>
        <h2>Tag</h2>
        <TagContainer>
          <Tag placeholder="Press enter to add tags" color="purple" />
        </TagContainer>
      </GroupContainer>
      <GroupContainer>
        <h2>AutoComplete</h2>
        <AutoComplete
          placeholder="한국 영화 제목을 입력해주세요."
          options={KOREA_MOVIE_LIST}
          onSelect={(target) => console.log(`Selected: ${target}`)}
        />
      </GroupContainer>
      <GroupContainer>
        <h2>ClickToEdit</h2>
        <ContentsWrapper>
          <ClickToEdit id="이름" label="이름" onChange={changeName} />
          <ClickToEdit
            id="나이"
            type="number"
            label="나이"
            onChange={changeAge}
          />
          <div>
            <div>
              <span>이름: {name && name}</span>
              <span>나이: {!Number.isNaN(age) && age}</span>
            </div>
          </div>
        </ContentsWrapper>
      </GroupContainer>
    </ThemeProvider>
  );
}

const Title = styled.h1`
  text-align: center;
`;

const GroupContainer = styled.article`
  position: relative;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-sizing: border-box;
  min-height: 30vh;
  border: solid 1px #bdbdbd;
  border-radius: 10px;
  margin: 6vw;
  padding: 3%;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;

  > h2 {
    position: absolute;
    top: 0;
    left: 0;
    margin: 5px 8px;
    font-size: 0.9rem;
    font-weight: 700;
  }

  @media screen and (max-width: 786px) {
    flex-direction: column;
    gap: 14px;
  }
`;

const ToggleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 30vw;

  > span {
    padding: 15px;
    font-size: 0.9rem;
  }

  @media screen and (max-width: 786px) {
    > span {
      display: none;
    }
  }
`;

const ContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;

  > div:not(:last-child) {
    margin-top: 20px;
  }

  > div:last-child {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 200px;

    > div {
      display: flex;
      flex-direction: column;

      > span + span {
        margin-top: 0.3rem;
      }
    }
  }
`;

const TagContainer = styled.div`
  width: 450px;

  @media screen and (max-width: 786px) {
    width: 80%;
  }
`;

export default App;
