import React from 'react';
import PropTypes, { bool, number, string, func, element } from 'prop-types';
import styled, { css } from 'styled-components';
import { colorStyle } from '../style';

/* eslint-disable react/jsx-props-no-spreading */
function Toggle({ id, size, color, children, ...props }) {
  return (
    <Switch
      tabindex="0"
      aria-label={`${id} selector`}
      size={size}
      color={color}
      htmlFor={id}
    >
      <input type="checkbox" id={id} {...props} />
      <div />
    </Switch>
  );
}

Toggle.propTypes = {
  id: string.isRequired,
  size: string,
  color: string,
  props: PropTypes.objectOf([bool, number, string, func]),
  children: element,
};

Toggle.defaultProps = {
  size: 's',
  color: 'default',
  props: null,
  children: null,
};

const SWITCH_SIZE = {
  s: {
    switch: {
      width: '47px',
      height: '23px',
    },
    slider: {
      width: '15px',
      height: '15px',
      top: '4px',
      left: '4px',
    },
  },
  m: {
    switch: {
      width: '62px',
      height: '30px',
    },
    slider: {
      width: '20px',
      height: '20px',
      top: '5px',
      left: '5px',
    },
  },
  l: {
    switch: {
      width: '77px',
      height: '37px',
    },
    slider: {
      width: '25px',
      height: '25px',
      top: '6px',
      left: '6px',
    },
  },
};

const sizeStyle = css`
  ${({ size }) => css`
    ${SWITCH_SIZE[size].switch}
    > div {
      ::after {
        ${SWITCH_SIZE[size].slider}
      }
    }
  `}
`;

const moveStyle = css`
  transition: transform 0.3s ease-out;
  -webkit-transition: transform 0.3s ease-out;
  -moz-transition: transform 0.3s ease-in;
  -o-transition: transform 0.3s ease-in;
`;

const Switch = styled.label`
  position: relative;
  display: inline-block;
  border-radius: 25px;
  overflow: hidden;
  cursor: pointer;
  ${sizeStyle}

  > input {
    display: none;
  }

  > div {
    width: 100%;
    height: 100%;
    border-radius: 25px;
    ${colorStyle}

    ::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: ${({ theme }) => theme.palette.off};
      ${moveStyle}
    }
    ::after {
      content: '';
      position: absolute;
      border-radius: 50%;
      background-color: white;
      ${moveStyle}
    }
  }

  > input:checked + div {
    ::before {
      transform: translateX(100%);
    }
    ::after {
      box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px,
        rgba(0, 0, 0, 0.23) 0px 3px 6px;
      transform: translateX(160%);
    }
  }
`;

export default Toggle;
