import React, { forwardRef, useCallback, useImperativeHandle, useMemo, useState } from 'react';
import { BigNumber } from '@ethersproject/bignumber';
import styled from 'styled-components';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { parseUnits } from '@ethersproject/units';
import { useTokenBalance } from '../../../providers/AccountBalanceProvider';
import { getDisplayNumber } from '../../../utils/formatBN';

interface TokenSliderInputProps {
  token: string;
  decimals?: number;
  precision?: number;
  disabled?: boolean;
  hasError?: boolean;
  onMax?: () => void;
  maxBalance?: BigNumber;
  onChange?: (value: BigNumber) => void;
  max?: number;
  token0?: string;
  token1?: string;
}

const TokenSliderInput: React.ForwardRefRenderFunction<unknown, TokenSliderInputProps> = (
  {
    token,
    hasError,
    disabled,
    decimals,
    precision,
    onChange,
    max = 1e9,
    maxBalance,
    token0,
    token1,
  },
  ref,
) => {
  const [input, setInput] = useState<string>('');
  const balance = useTokenBalance(token);

  const patchInputValue = useCallback(
    (newValue: BigNumber) => {
      let newInput = '';
      try {
        newInput = getDisplayNumber(newValue, decimals, precision, false, false, false, false);
      } catch (e) {
        newInput = '';
      }
      setInput(newInput || '');
      return newInput;
    },
    [decimals, precision],
  );

  const onMax = useCallback(() => {
    patchInputValue(maxBalance || balance);
    onChange(maxBalance || balance);
  }, [balance, maxBalance, onChange, patchInputValue]);

  useImperativeHandle(
    ref,
    () => ({
      resetInput: patchInputValue,
      onMax: onMax,
    }),
    [patchInputValue, onMax],
  );

  const onInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    const _value = (event.target as HTMLInputElement).value;
    broadcast(_value);
  };

  const broadcast = (_value: string) => {
    if (!isInputValid(_value)) {
      return false;
    }
    if (!isNaN(+_value)) {
      setInput(_value);
      if (_value) {
        const parsedValue = parseUnits(
          _value.substr(0, _value.lastIndexOf('.') + decimals + 1),
          decimals,
        );
        onChange(parsedValue);
      }
    }
  };

  const isInputValid = (inputValue: string) => {
    if (isNaN(+inputValue)) {
      return false;
    }
    if (inputValue === undefined) {
      return false;
    }
    const splits = inputValue.split('.');
    const countDecimals = splits[1]?.length || 0;
    if (countDecimals > precision) {
      return false;
    }
    if (+inputValue > max) {
      return false;
    }
    return true;
  };

  const onSliderChange = useCallback(
    (value) => {
      const selectedBalance = maxBalance || balance;
      if (!selectedBalance || selectedBalance.eq(BigNumber.from(0))) return;
      const newInput = selectedBalance.mul(BigNumber.from(value)).div(BigNumber.from(100));
      patchInputValue(newInput);
      onChange(newInput);
    },
    [maxBalance, balance, patchInputValue, onChange],
  );

  const sliderValue = useMemo(() => {
    const selectedBalance = maxBalance || balance;
    if (!selectedBalance || selectedBalance.eq(BigNumber.from(0))) return 0;
    const parseBalance = getDisplayNumber(
      selectedBalance,
      decimals,
      precision,
      false,
      false,
      false,
      false,
    );
    return (+input / +parseBalance) * 100;
  }, [maxBalance, balance, decimals, input, precision]);

  return (
    <StyledContainer>
      <InputContainer>
        <StyledTokenSliderInputWrapper>
          <StyledTokenSliderInput
            hasError={hasError}
            disabled={disabled}
            type="text"
            pattern="^[0-9]*[.,]?[0-9]*$"
            placeholder={disabled ? '-' : '0.0'}
            minLength={1}
            spellCheck={false}
            inputMode="decimal"
            onChange={(e) => onInputChange(e)}
            value={input}
          ></StyledTokenSliderInput>
        </StyledTokenSliderInputWrapper>
        <span className="tokenName">
          {token0}
          {token1 ? '/' + token1 : ''}
        </span>
      </InputContainer>
      <Slider
        className="slider"
        onChange={onSliderChange}
        tabIndex={10}
        step={1}
        value={sliderValue}
        ariaLabelForHandle="1"
        ariaLabelledByForHandle="2"
        trackStyle={{ backgroundColor: '#94febf' }}
        railStyle={{ backgroundColor: '#393939' }}
        handleStyle={{ backgroundColor: '#94febf', border: 'none' }}
        dotStyle={{ backgroundColor: '#393939', border: 'none' }}
        activeDotStyle={{ backgroundColor: 'transparent', border: 'none' }}
        marks={{
          0: <StyledLabel active={sliderValue >= 0}>0%</StyledLabel>,
          25: <StyledLabel active={sliderValue >= 25}>25%</StyledLabel>,
          50: <StyledLabel active={sliderValue >= 50}>50%</StyledLabel>,
          75: <StyledLabel active={sliderValue >= 75}>75%</StyledLabel>,
          100: <StyledLabel active={sliderValue >= 100}>100%</StyledLabel>,
        }}
      />
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  .slider {
    width: 94%;
    margin-bottom: 40px;
    margin-top: 10px;
    align-self: center;
  }
`;

const StyledLabel = styled.div<{ active?: boolean }>`
  margin-top: 4px;
  color: ${({ active }) => (active ? '#94febf' : '#393939')};
  :hover {
    color: #94febf;
  }
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: stretch;
  border: 1px solid #94febf;
  padding: 10px 20px;
`;

const StyledTokenSliderInputWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-flow: row nowrap;
  align-items: center;
`;

const StyledTokenSliderInput = styled.input<{ hasError?: boolean }>`
  position: relative;
  outline: none;
  border: none;
  background-color: transparent;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default forwardRef(TokenSliderInput);
