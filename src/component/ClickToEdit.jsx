import React from 'react';
import PropTypes, { func, string } from 'prop-types';
import styled from 'styled-components';
import { sizeStyle } from '../style';

function ClickToEdit({ id, type, label, onChange, width }) {
  return (
    <div>
      <InputLabel htmlFor={id} width={width}>
        {label && <span>{label}</span>}
        <input type={type} id={id} onBlur={onChange} />
      </InputLabel>
    </div>
  );
}

ClickToEdit.propTypes = {
  id: string.isRequired,
  type: PropTypes.oneOf([
    'text',
    'email',
    'number',
    'password',
    'search',
    'tel',
    'url',
  ]),
  label: string,
  onChange: func.isRequired,
  width: string,
};

ClickToEdit.defaultProps = {
  type: 'text',
  label: '',
  width: '200px',
};

const InputLabel = styled.label`
  display: flex;
  align-items: center;
  ${sizeStyle}

  > span {
    margin-right: 0.8rem;
    word-break: keep-all;
  }

  > input {
    width: 100%;
    border: solid 1px rgb(192, 192, 192);
    border-radius: 3px;
    padding: 0.3rem 0;
    font-size: 0.875rem;
    text-align: center;

    :focus {
      border: solid 2px rgb(115, 108, 216);
    }
  }
`;

export default ClickToEdit;
