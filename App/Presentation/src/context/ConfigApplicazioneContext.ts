import React from 'react';

interface IConfigApplicazioneContextData {
  configApplicazione: object | null;
  setConfigApplicazione: (config: object | null) => void;
}

const initialState = {
  configApplicazione: null,
  setConfigApplicazione: () => {}
};

const ConfigApplicazioneContext =
  React.createContext<IConfigApplicazioneContextData>(initialState);

export default ConfigApplicazioneContext;
