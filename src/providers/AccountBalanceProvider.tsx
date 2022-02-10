import { BigNumber } from '@ethersproject/bignumber';
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useWeb3React } from '@web3-react/core';
import { useMulticall } from '../hooks/useMulticall';
import useIsWindowVisible from '../hooks/useIsWindowVisible';
import { useBlockNumber } from '../state/application/hooks';

type BalanceState = Record<string, BigNumber>;
const GetBalanceContext = createContext<BalanceState>(null);
const SetListeningTokenContext = createContext<(token: string) => void>(null);

export const AccountBalanceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [balance, setBalance] = useState<BalanceState>({});
  const [listeningToken, _setListeningToken] = useState<string[]>([]);
  const { account } = useWeb3React();
  const isWindowVisible = useIsWindowVisible();
  const blockNumber = useBlockNumber();
  const lastCheckedBlockNumber = useRef<number>();
  const multicall = useMulticall();

  useEffect(() => {
    let mounted = true;
    if (!account) {
      setBalance({});
    } else if (isWindowVisible) {
      if (lastCheckedBlockNumber.current === blockNumber) {
        return;
      }
      multicall([
        ...(listeningToken || []).map((t) => {
          return {
            target: t,
            signature: 'balanceOf(address user) view returns (uint256)',
            params: [account],
          };
        }),
      ]).then((balances) => {
        if (mounted) {
          const res = listeningToken.reduce((memo, token, index) => {
            return {
              ...memo,
              [token]: balances[index][0],
            };
          }, {} as Record<string, BigNumber>);
          setBalance(res);
        }
      });
    }

    return () => {
      mounted = false;
    };
  }, [blockNumber, listeningToken, isWindowVisible, account, multicall]);

  const setListeningToken = useCallback((token: string) => {
    if (!token) {
      return;
    }
    _setListeningToken((x) => {
      if (x.some((t) => t === token)) {
        return x;
      }

      return [...x, token];
    });
  }, []);

  return (
    <GetBalanceContext.Provider value={balance}>
      <SetListeningTokenContext.Provider value={setListeningToken}>
        {children}
      </SetListeningTokenContext.Provider>
    </GetBalanceContext.Provider>
  );
};

export const useTokenBalance = (token: string): BigNumber => {
  const setListeningToken = useContext(SetListeningTokenContext);
  useEffect(() => {
    if (token) {
      setListeningToken(token);
    }
  }, [setListeningToken, token]);

  const context = useContext(GetBalanceContext);

  if (context == null || setListeningToken == null) {
    throw new Error('BalanceContextProvider not found');
  }

  return token ? context[token] : null;
};
