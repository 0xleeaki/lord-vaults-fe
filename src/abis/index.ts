import { ChainId } from '../utils/constants';
import IERC20 from './IERC20.json';
import VaultFactory from './VaultFactory.json';
import VaultMaster from './VaultMaster.json';
import Vault from './Vault.json';

const ABI: Record<number, Record<string, any[]>> = {
  [ChainId.BSC]: {
    IERC20: IERC20.abi,
    VaultFactory: VaultFactory.abi,
    VaultMaster: VaultMaster.abi,
    Vault: Vault.abi,
  },
  [ChainId.BSC_TESTNET]: {},
  [ChainId.POLYGON]: {
    IERC20: IERC20.abi,
    VaultFactory: VaultFactory.abi,
    VaultMaster: VaultMaster.abi,
    Vault: Vault.abi,
  },
  [ChainId.POLYGON_TESTNET]: {},
};

export default ABI;
