import React, { useCallback, useRef, useState } from 'react';
import PropTypes, { array, func, string } from 'prop-types';
import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { initBtnStyle, sizeStyle } from '../style';

const useDebounce = () => {
  const timerId = useRef(null);
  return (callback, delay) => (args) => {
    clearTimeout(timerId.current);
    timerId.current = setTimeout(callback.bind(this, args), delay);
  };
};

function AutoComplete({ placeholder, options, onSelect, width, height }) {
  const inputRef = useRef(null);
  const [keyword, setKeyword] = useState('');
  const [origin, setOrigin] = useState('');
  const [index, setIndex] = useState(-1);
  const [open, setOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const debounce = useDebounce();

  const initStatus = (initVal = '') => {
    setOrigin(initVal);
    setOpen(!!initVal);
    setIndex(-1);
  };

  const handleDebounceInput = (e) => {
    if (e.target.value === keyword) {
      return;
    }
    setKeyword(e.target.value);
    debounce((inputVal) => {
      initStatus(inputVal);
      setFilteredOptions(
        !inputVal
          ? []
          : options.filter((option) =>
              option.toLowerCase().includes(inputVal.toLowerCase()),
            ),
      );
    }, 300)(e.target.value);
  };

  const handleKeyDown = useCallback(
    (e) => {
      if (
        !keyword ||
        e.keyCode === 229 ||
        e.nativeEvent.isComposing ||
        filteredOptions.length === 0
      ) {
        return;
      }

      if (e.code === 'ArrowUp') {
        e.preventDefault();
        if (index === -1) {
          setOpen(false);
          return;
        }
        const prev = index - 1;
        setOpen(prev !== -1);
        setIndex(prev);
        setKeyword(prev === -1 ? origin : filteredOptions[prev]);
      }
      if (e.code === 'ArrowDown' || e.code === 'Tab') {
        e.preventDefault();
        if (!open) {
          setOpen(true);
          return;
        }
        const next = (index + 1) % filteredOptions.length;
        setIndex(next);
        setKeyword(filteredOptions[next]);
      }
      if (e.code === 'Enter') {
        initStatus();
        setFilteredOptions([]);

        if (typeof onSelect === 'function') {
          onSelect(keyword);
        }
      }
    },
    [open, index, origin, keyword, filteredOptions, onSelect],
  );

  const handleFocus = () => {
    if (!keyword || !origin) {
      return;
    }
    setOpen(true);
    setFilteredOptions(
      options.filter((option) =>
        option.toLowerCase().includes(keyword.toLowerCase()),
      ),
    );
  };

  const handleBlur = (e) => {
    let curText = keyword;
    if (
      e.relatedTarget?.tagName === 'A' &&
      e.relatedTarget?.dataset?.search === 'found-items'
    ) {
      curText = e.relatedTarget.text;
      setKeyword(curText);
      if (typeof onSelect === 'function') {
        onSelect(curText);
      }
    }
    setOrigin(curText);
    setOpen(false);
    setIndex(-1);
  };

  const handleCancel = useCallback(() => {
    setKeyword('');
    setOrigin('');
    inputRef.current.focus();
  }, []);

  return (
    <SearchBarContainer width={width} height={height}>
      <SearchBar listOpen={open && keyword}>
        <div>
          <FontAwesomeIcon icon={faSearch} />
        </div>
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={keyword}
          onInput={handleDebounceInput}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <CancelBtn
          hidden={!keyword}
          type="button"
          aria-label="erase"
          onClick={handleCancel}
        >
          <FontAwesomeIcon icon={faTimes} />
        </CancelBtn>
      </SearchBar>
      {keyword && open && (
        <OptionList activate={index + 1}>
          {filteredOptions.length === 0 ? (
            <li>
              <span>검색 결과가 없습니다.</span>
            </li>
          ) : (
            filteredOptions.map((option, idx) => (
              <li key={`${option}-${idx + 1}`}>
                <a tabIndex="0" aria-label={option} data-search="found-items">
                  {option}
                </a>
              </li>
            ))
          )}
        </OptionList>
      )}
    </SearchBarContainer>
  );
}

AutoComplete.propTypes = {
  placeholder: string,
  options: PropTypes.oneOfType([array]),
  onSelect: func,
  width: string,
  height: string,
};

AutoComplete.defaultProps = {
  placeholder: '',
  options: [],
  onSelect: null,
  width: '100%',
  height: '45px',
};

const SearchBarContainer = styled.div`
  position: relative;
  ${sizeStyle}
  line-height: ${(props) => props.height};
`;

const SearchBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  border: solid 1px rgb(221, 221, 221);
  border-radius: 15px;
  background-color: white;

  &:focus-within {
    box-shadow: rgba(0, 0, 0, 0.13) 0px 5px 15px,
      rgba(0, 0, 0, 0.144) 0px 3px 3px;
  }

  ${({ listOpen }) =>
    listOpen &&
    css`
      border-radius: 15px 15px 0 0;
    `}

  > div:first-child {
    margin: 0 0.8rem;
  }

  > input {
    width: 100%;
    height: 100%;
    border: none;
    padding: 0.5rem 0;
    background-color: transparent;
    font-size: 0.875rem;
  }
`;

const OptionList = styled.ul`
  position: absolute;
  width: 100%;
  margin-top: -1px;
  border: solid 1px rgb(221, 221, 221);
  border-radius: 0 0 15px 15px;
  background-color: white;
  font-size: 0.875rem;
  box-shadow: rgba(0, 0, 0, 0.13) 0px 5px 15px, rgba(0, 0, 0, 0.144) 0px 3px 3px;
  z-index: 999;

  > li {
    display: flex;
    justify-content: center;
    align-items: center;
    white-space: nowrap;
    word-break: keep-all;

    > span {
      width: 100%;
      padding: 0.8rem 0;
      text-align: center;
      cursor: default;
    }

    > a {
      width: 100%;
      padding: 0.375rem 0.7rem;
      overflow: hidden;
      text-overflow: ellipsis;
      cursor: pointer;

      :hover {
        background-color: rgb(235, 235, 235);
      }
    }
  }

  ${({ activate }) =>
    activate &&
    css`
      > li:nth-child(${activate}) {
        > a {
          background-color: rgb(221, 221, 221);
        }
      }
    `}
`;

const CancelBtn = styled.button`
  height: 100%;
  margin: 0 0.4rem;
  padding: 0.4rem;
  font-size: 0.875rem;
  ${initBtnStyle}

  > * {
    pointer-events: none;
  }
`;

export default AutoComplete;
