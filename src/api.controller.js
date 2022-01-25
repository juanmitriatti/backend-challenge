import axios from "axios";

const BITFINEX_URL = "https://api-pub.bitfinex.com/v2/";

axios.defaults.baseURL = BITFINEX_URL;

const getSymbol = (pair) => {
  // Return valid Bitfinex pair/symbol
  return `t${pair.split("-").join("")}`;
};

export const getBook = async (pair, depth = "25", precision = "P0") => {
  try {
    const symbol = getSymbol(pair);
    const res = await axios.get(`book/${symbol}/${precision}?len=${depth}`);
    const data = res.data;
    return data.map((item) => {
      return {
        price: item[0],
        count: item[1],
        amount: item[2],
        type: item[2] > 0 ? "BID" : "ASK",
      };
    });
  } catch (e) {
    const resError = e.response?.data;
    if (resError) {
      console.log(resError);
      throw new Error(resError);
    } else throw e;
  }
};

export const getTicker = async (pair) => {
  try {
    const symbol = getSymbol(pair);
    const res = await axios.get(`ticker/${symbol}`);
    const data = res.data;
    return { highest_bid: data[0], lowest_ask: data[2] };
  } catch (e) {
    const resError = e.response?.data;
    if (resError) {
      console.log(resError);
      throw new Error(resError);
    } else throw e;
  }
};
