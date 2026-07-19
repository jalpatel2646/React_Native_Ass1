import React, { createContext, useContext, useState } from 'react';

const SurveyContext = createContext({});

const dummyHistory = [
  { id: '1', siteName: 'Downtown Plaza', clientName: 'Acme Corp', priority: 'High', date: '19/7/2026' },
  { id: '2', siteName: 'Uptown Mall', clientName: 'Stark Ind', priority: 'Medium', date: '20/7/2026' }
];

export function SurveyProvider({ children }) {
  const [surveyData, setSurveyData] = useState({
    photoUri: null,
    photoTime: null,
  });

  const [historyData, setHistoryData] = useState(dummyHistory);

  return (
    <SurveyContext.Provider value={{ surveyData, setSurveyData, historyData, setHistoryData }}>
      {children}
    </SurveyContext.Provider>
  );
}

export function useSurvey() {
  return useContext(SurveyContext);
}
