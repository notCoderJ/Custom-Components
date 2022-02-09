import React, { useEffect, useState, useCallback } from 'react';
import PropTypes, { number, string, any } from 'prop-types';
import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { initBtnStyle, colorStyle } from '../style';

const lockScroll = (lock) => {
  document.body.style.overflowY = lock ? 'hidden' : 'auto';
};

function Modal({ label, title, content, size, color }) {
  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);

  useEffect(() => {
    lockScroll(open);
    return () => lockScroll(false);
  }, [open]);

  return (
    <div>
      <ModalBtn size={size} color={color} type="button" onClick={handleOpen}>
        {label}
      </ModalBtn>
      {open && <Overlay onClick={handleClose} />}
      {open && (
        <Content
          role="dialog"
          aria-labelledby={`dialog-${label}`}
          aria-describedby={`dialog-${label}-content`}
        >
          <button aria-label="Close" type="button" onClick={handleClose}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <div>
            {title && <h2 id={`dialog-${label}`}>{title}</h2>}
            <p id={`dialog-${label}-content`}>{content}</p>
          </div>
        </Content>
      )}
    </div>
  );
}

Modal.propTypes = {
  label: string.isRequired,
  title: PropTypes.oneOfType([number, string]),
  content: PropTypes.oneOfType([any]).isRequired,
  size: string,
  color: string,
};

Modal.defaultProps = {
  title: '',
  size: 'm',
  color: 'default',
};

const BUTTON_SIZE = {
  s: {
    'min-width': '50px',
    padding: '0.5rem 0.9rem',
    'font-size': '0.9rem',
  },
  m: {
    'min-width': '115px',
    padding: '0.9rem 1rem',
    'font-size': '1rem',
  },
  l: {
    'min-width': '250px',
    padding: '1rem 1.3rem',
    'font-size': '1.15rem',
  },
};

const sizeStyle = css`
  ${({ size }) => css`
    ${BUTTON_SIZE[size]}
  `}
`;

const ModalBtn = styled.button`
  ${initBtnStyle}
  ${sizeStyle}
  ${colorStyle}
  border-radius: 30px;
  color: white;
  text-shadow: 0px 4px 3px rgba(0, 0, 0, 0.4), 0px 8px 13px rgba(0, 0, 0, 0.1),
    0px 18px 23px rgba(0, 0, 0, 0.1);
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #00000080;
  z-index: 99;
`;

const Content = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 300px;
  min-height: 100px;
  padding: 3rem 1.7rem 2.2rem 1.7rem;
  box-sizing: border-box;
  background-color: white;
  border-radius: 10px;
  transform: translate(-50%, -50%);
  text-align: center;
  word-break: break-all;
  z-index: 100;

  > button {
    position: absolute;
    top: 10px;
    width: fit-content;
    height: fit-content;
    font-size: 12px;
    transform: translateX(-50%);
    ${initBtnStyle}
  }

  > div {
    max-height: 50vh;
    overflow-y: auto;

    > h2,
    p {
      margin: 0;
    }

    > h2 {
      margin-bottom: 0.8rem;
      font-size: 1.2rem;
      font-weight: 700;
    }

    > p {
      padding: 2px 0;
      font-size: 1rem;
      background: linear-gradient(45deg, dodgerblue, purple, red);
      background-clip: text;
      -webkit-background-clip: text;
      -moz-background-clip: text;
      -webkit-text-fill-color: transparent;
      -moz-text-fill-color: transparent;
    }
  }
`;

export default Modal;
