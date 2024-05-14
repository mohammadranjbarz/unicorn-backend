export const tokenSymbols = [
  'GIV',
  'CRC',
  'BLFI',
  'LPOOL',
  'WORLD',
  'UNI',
  'K21',
  'ETH',
  'WETH',
  'POODL',
  'PAN',
  'USDT',
  'CRO',
  'LINK',
  'LEO',
  'USDC',
  'HT',
  'COMP',
  'MKR',
  'HEDG',
  'BAT',
  'OKB',
  'PAX',
  'ZRX',
  'KNC',
  'OMG',
  'TMTG',
  'REP',
  'LEND',
  'SNX',
  'HYN',
  'ENJ',
  'DAI',
  'RAI',
  'NODE',
  'GTC',
  'FOX',
  'CRV',
  'UST',
  'SUSHI',
  'BAL',
  'DOUGH',
  'MIR',
  'SEED',
  'UBI',
  'REN',
  'HUSD',
  'CEL',
  'ZB',
  'DX',
  'QNT',
  'HOT',
  'CHSB',
  'LRC',
  'SNT',
  'XIN',
  'BNT',
  'KCS',
  'MCO',
  'MATIC',
  'EGR',
  'NMR',
  'WBTC',
  'MANA',
  'GNT',
  'PAXG',
  'RLC',
  'ELF',
  'SOLVE',
  'RSR',
  'APIX',
  'ANT',
  'UBT',
  'CVT',
  'BTU',
  'DGTX',
  'XSR',
  'DRGN',
  'EURS',
  'POWR',
  'SXP',
  'NPXS',
  'GT',
  'MOF',
  'ORBS',
  'CRPT',
  'RCN',
  'DATA',
  'HPT',
  'BHT',
  'GNO',
  'IDEX',
  'BRIGHT',
  'YFI',
  'SHIB',
  '1INCH',
  'GUSD',
  'NU',
  'IDLE',
  'YGG',
  'ALCX',
  'AMP',
  'ANKR',
  'AXS',
  'BOND',
  'CTX',
  'FTM',
  'GRT',
  'INJ',
  'LPT',
  'MCO2',
  'OXT',
  'SAND',
  'SKALE',
  'SLP',
  'CUBE',
  'STORJ',
  'LUNA',
  'UMA',
  'wCFG',
  'AUDIO',
  'MASK',
  'RAD',
  'API3',
  'ASH',
  'RARE',
  'FET',
  'CULT',
  'TON',
  'ADA',
  'XRP',
  'AVAX',
  'SOL',
  'DOGE',
  'TRX',
  'DOT',
  'OP',
  'ARB',
  'ENS',
  'BNB',
] as const;

export const frontendSupportedTokens = [
  'ETH',
  'USDT',
  'USDC',
  'BNB',
  'LINK',
  'MATIC',
  'WBTC',
  'TON',
  'SHIB',
  'GIV',
  'ADA',
  'XRP',
  'AVAX',
  'SOL',
  'DOGE',
  'TRX',
  'DOT',
  'DAI',
  'OP',
  'ARB',
  'ENS',
] as const;

export const frontendSupportedSanityTokenPrices = {
  ETH: 3286.42,
  USDT: 1,
  USDC: 1,
  BNB: 535.77,
  LINK: 15.12,
  MATIC: 0.71,
  WBTC: 66747.84,
  TON: 5.5,
  SHIB: 0.00002578,
  GIV: 0.0138,
  ADA: 0.4783,
  XRP: 0.5244,
  AVAX: 53.24,
  SOL: 151.79,
  DOGE: 0.1339,
  TRX: 0.1171,
  DOT: 9.25,
  DAI: 1,
  OP: 2.45,
  ARB: 1.13,
  ENS: 15.78,
};

type ArrayElement<A extends readonly unknown[]> = A extends readonly (infer E)[]
  ? E
  : never;

export type TokenSymbols = ArrayElement<typeof tokenSymbols>;
