import { get } from '../../services/api';
import { Action, DefaultThunkAction } from '../action';
import { AppState, Dispatch } from '../store';

export enum SettingsTypes {
  StartLoadingSettings = 'START_LOADING_SETTINGS',
  SettingsLoaded = 'SETTINGS_LOADED',
}

export interface SettingsResponse {
  settings: Settings;
}

interface Settings {
  idleTimer: number;
  staleUserPeriod: string;
  i18n: I18n;
  account: Account;
  payment: Payment;
}

export interface Payment {
  boundary: Boundary;
  transactions: Transactions;
  deposit: Deposit;
  dispense: Deposit;
}

interface Deposit {
  enabled: boolean;
  custom: boolean;
  steps: number[];
}

interface Transactions {
  enabled: boolean;
}

interface Account {
  boundary: Boundary;
}

export interface Boundary {
  upper: number;
  lower: number;
}

// tslint:disable-next-line:interface-name
interface I18n {
  dateFormat: string;
  timezone: string;
  language: string;
  currency: Currency;
}

interface Currency {
  name: string;
  symbol: string;
  alpha3: string;
}

export interface SettingsLoadedAction {
  type: SettingsTypes.SettingsLoaded;
  payload: Settings;
}

export type SettingsActions = SettingsLoadedAction;

export function settingsLoaded(settings: Settings): SettingsLoadedAction {
  return {
    type: SettingsTypes.SettingsLoaded,
    payload: settings,
  };
}

export function startLoadingSettings(): DefaultThunkAction {
  return async (dispatch: Dispatch) => {
    const data: SettingsResponse = await get('settings');
    if (data.settings) {
      dispatch(settingsLoaded(data.settings));
    }
  };
}

const initialState = {
  idleTimer: 15000,
  staleUserPeriod: '10 day',
  i18n: {
    dateFormat: 'YYYY-MM-DD HH:mm:ss',
    timezone: 'auto',
    language: 'en',
    currency: {
      name: 'Euro',
      symbol: '€',
      alpha3: 'EUR',
    },
  },
  account: {
    boundary: {
      upper: 20000,
      lower: -20000,
    },
  },
  payment: {
    boundary: {
      upper: 15000,
      lower: -2000,
    },
    transactions: {
      enabled: true,
    },
    deposit: {
      enabled: true,
      custom: true,
      steps: [50, 100, 200, 500, 1000],
    },
    dispense: {
      enabled: true,
      custom: true,
      steps: [50, 100, 200, 500, 1000],
    },
  },
};

export function settings(
  state: Settings = initialState,
  action: Action
): Settings {
  switch (action.type) {
    case SettingsTypes.SettingsLoaded:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

// Settings selectors
export function getSettings(state: AppState): Settings {
  return state.settings;
}

export function getPayment(state: AppState): Payment {
  return getSettings(state).payment;
}
