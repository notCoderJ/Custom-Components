import React, { useCallback, useState } from 'react';
import PropTypes, { func, number, string } from 'prop-types';
import styled, { css } from 'styled-components';
import { initBtnStyle, colorStyle, sizeStyle } from '../style';

function Tab({ labels, initIndex, onChange, width, height, color }) {
  const [current, setCurrent] = useState(() => {
    if (initIndex < 0) {
      return 0;
    }
    if (initIndex > labels.length - 1) {
      return labels.length - 1;
    }
    return initIndex;
  });

  const changeTab = useCallback(
    (e) => {
      if (e.target.tagName !== 'BUTTON') {
        return;
      }
      const curIndex = Number(e.target.value);
      setCurrent(curIndex);
      if (typeof onChange === 'function') {
        onChange(labels[curIndex], curIndex);
      }
    },
    [labels, onChange],
  );

  return (
    <TabBar width={width} height={height}>
      <TabGroup color={color} activate={current + 1} onClick={changeTab}>
        {labels.map((label, index) => (
          <li key={`${label}-tab`}>
            <button type="button" aria-label={`${label} tab`} value={index}>
              {label}
            </button>
          </li>
        ))}
      </TabGroup>
    </TabBar>
  );
}

Tab.propTypes = {
  labels: PropTypes.arrayOf(string).isRequired,
  initIndex: number,
  onChange: func,
  width: string,
  height: string,
  color: string,
};

Tab.defaultProps = {
  initIndex: 0,
  onChange: null,
  width: '100%',
  height: '45px',
  color: 'default',
};

const TabBar = styled.div`
  display: flex;
  justify-content: flex-end;
  ${sizeStyle}
  padding-left: 5%;
  line-height: ${(props) => props.height};
  background-color: #d4d4d4;
`;

const TabGroup = styled.ul`
  display: flex;
  width: 100%;
  height: 100%;

  > li {
    width: 100%;

    > button {
      width: 100%;
      height: 100%;
      ${initBtnStyle};
      border: solid 3px transparent;
      color: rgb(146, 146, 146);
      transition: all 0.3s ease-in;
    }
  }

  ${({ activate }) =>
    activate &&
    css`
      > li:nth-child(${activate}) {
        > button {
          ${colorStyle}
          color: white;
          text-shadow: 0px 4px 3px rgba(0, 0, 0, 0.4),
            0px 8px 13px rgba(0, 0, 0, 0.1), 0px 18px 23px rgba(0, 0, 0, 0.1);
        }
      }
    `}
`;

export default Tab;
