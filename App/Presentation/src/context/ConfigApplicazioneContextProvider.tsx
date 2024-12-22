import React, { useState, useMemo } from 'react';
import ConfigApplicazioneContext from './ConfigApplicazioneContext';

const ConfigApplicazioneContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [configApplicazione, setConfigApplicazione] = useState<object | null>(null);

  const contextValue = useMemo(() => ({ configApplicazione, setConfigApplicazione }), [configApplicazione, setConfigApplicazione]);

  return (
    <ConfigApplicazioneContext.Provider value={contextValue}>
      {children}
    </ConfigApplicazioneContext.Provider>
  );
};

export default ConfigApplicazioneContextProvider;
