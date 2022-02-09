import React, { useCallback, useEffect, useState } from 'react';
import { func, string } from 'prop-types';
import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { colorStyle, initBtnStyle } from '../style';

function Tag({ placeholder, onChange, width, minHeight, color }) {
  const [selectedItems, setSelectedItems] = useState(new Set());

  useEffect(() => {
    if (typeof onChange === 'function') {
      onChange([...selectedItems]);
    }
  }, [selectedItems, onChange]);

  const deleteItem = useCallback((e) => {
    if (e.target.tagName !== 'BUTTON') {
      return;
    }
    setSelectedItems((prev) => {
      prev.delete(e.target.value);
      return new Set(prev);
    });
  }, []);

  const selectItem = useCallback(
    (e) => {
      if (!e.target.value || e.keyCode === 229 || e.nativeEvent.isComposing) {
        return;
      }

      if (e?.keyCode === 13 || e?.key === 'Enter' || e?.code === 'Enter') {
        if (!!e.target.value.trim() && !selectedItems.has(e.target.value)) {
          setSelectedItems(
            ((item) => (prev) => {
              prev.add(item);
              return new Set(prev);
            })(e.target.value),
          );
        }
        e.target.value = '';
      }
    },
    [selectedItems],
  );

  return (
    <div>
      <SearchBar
        onClick={deleteItem}
        width={width}
        minHeight={minHeight}
        color={color}
      >
        {[...selectedItems].map((item) => (
          <li key={item}>
            <span>{item}</span>
            <button type="button" value={item}>
              <FontAwesomeIcon icon={faTimesCircle} />
            </button>
          </li>
        ))}
        <li>
          <input type="text" placeholder={placeholder} onKeyDown={selectItem} />
        </li>
      </SearchBar>
    </div>
  );
}

Tag.propTypes = {
  placeholder: string,
  onChange: func,
  color: string,
  width: string,
  minHeight: string,
};

Tag.defaultProps = {
  placeholder: '',
  color: 'default',
  onChange: null,
  width: '100%',
  minHeight: '40px',
};

const SearchBar = styled.ul`
  display: flex;
  flex-wrap: wrap;
  border: solid 1px rgb(221, 221, 221);
  border-radius: 5px;
  padding: 0.25rem;

  ${({ width, minHeight }) => css`
    width: ${width};
    min-height: ${minHeight};
  `}

  &:focus-within {
    border: solid 1px ${({ theme, color }) => theme.palette[color]};
  }

  > li:not(:last-child) {
    display: flex;
    align-items: center;
    border-radius: 5px;
    margin: 0.25rem;
    font-size: 0.875rem;
    text-shadow: 0px 4px 3px rgba(0, 0, 0, 0.4), 0px 8px 13px rgba(0, 0, 0, 0.1),
      0px 18px 23px rgba(0, 0, 0, 0.1);
    color: white;
    ${colorStyle}

    > span {
      padding: 0.2rem;
    }

    > button {
      display: flex;
      align-items: center;
      padding: 0.1rem;
      ${initBtnStyle}

      > * {
        border-radius: 50%;
        background-color: black;
        color: white;
        box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px,
          rgba(0, 0, 0, 0.23) 0px 3px 6px;
        pointer-events: none;
      }
    }
  }

  > li:last-child {
    flex: 1;
    align-self: center;

    > input {
      min-width: 100%;
      height: 100%;
      border: none;
      padding: 0.55rem 0.25rem;
      background-color: transparent;
      font-size: 0.875rem;
    }
  }
`;

export default Tag;
