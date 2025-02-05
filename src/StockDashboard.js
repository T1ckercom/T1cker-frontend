import React, { useState, useEffect } from 'react';
import axios from 'axios';
import KeyMetricsTable from './KeyMetricsTable';

const API_KEY = 'UwbsK5XWR0U2yaV0732fg2MSGz8bHBR'; // Replace with your FMP API key

const fetchStockData = async (ticker) => {
  try {
    const response = await axios.get(
      `https://financialmodelingprep.com/api/v3/quote/${ticker}?apikey=${API_KEY}`
    );
    return response.data[0];
  } catch (error) {
    console.error('Error fetching stock data:', error);
    return null;
  }
};

const fetchKeyMetrics = async (ticker) => {
  try {
    const response = await axios.get(
      `https://financialmodelingprep.com/api/v3/key-metrics/${ticker}?apikey=${API_KEY}`
    );
    return response.data[0];
  } catch (error) {
    console.error('Error fetching key metrics:', error);
    return null;
  }
};

const StockDashboard = ({ ticker }) => {
  const [stock, setStock] = useState(null);
  const [keyMetrics, setKeyMetrics] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const stockData = await fetchStockData(ticker);
      setStock(stockData);

      const metricsData = await fetchKeyMetrics(ticker);
      setKeyMetrics(metricsData);
    };
    loadData();
  }, [ticker]); // Re-run when ticker changes

  if (!stock) return <div>Loading...</div>;

  return