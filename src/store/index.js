import { createStore } from 'vuex';
import { BASE_URL_API } from '@/constants.js';

export default createStore({
    state() {
        return {
            exchangeRateData: null,
            currencies: null,
            conversionData: null,
            dataLoaded: false
        };
    },
    mutations: {
        SET_EXCHANGE_RATE(state, data) {
            state.exchangeRateData = data;
        },
        SET_CURRENCIES(state, data) {
            state.currencies = data;
        },
        SET_CONVERSION(state, data) {
            state.conversionData = data;
        },
        SET_DATA_LOADED(state, data) {
            state.dataLoaded = data;
        }
    },
    actions: {
        async fetchCurrencies({ commit }) {
            try {
                await fetch(`${BASE_URL_API}/currencies`)
                    .then((response) => response.json())
                    .then((data) => {
                        commit('SET_CURRENCIES', data);
                    });
            } catch (error) {
                console.error(error);
            }
        },
        async fetchCurrencyRates({ commit }, baseCurrency) {
            try {
                await fetch(`${BASE_URL_API}/latest?from=${baseCurrency.value}`)
                    .then((response) => response.json())
                    .then((data) => {
                        const ratesData = {
                            amount: data.amount,
                            base: data.base,
                            date: data.date,
                            rates: Object.entries(data.rates).map(([currency, rate]) => ({
                                currency,
                                rate
                            }))
                        };

                        commit('SET_EXCHANGE_RATE', ratesData);
                        commit('SET_DATA_LOADED', true);
                    });
            } catch (error) {
                console.error(error);
            }
        },
        async conversion({ commit }, payload) {
            try {
                await fetch(
                    `${BASE_URL_API}/latest?amount=${payload.amount}&from=${payload.fromCurrency}&to=${payload.toCurrency}`
                )
                    .then((response) => response.json())
                    .then((data) => {
                        const result = {
                            ...payload,
                            rates: data.rates[payload.toCurrency]
                        };

                        commit('SET_CONVERSION', result);
                    });
            } catch (error) {
                console.error(error);
            }
        }
    },
    getters: {
        exchangeRateData: ({ exchangeRateData }) => exchangeRateData,
        currencies: ({ currencies }) => currencies,
        conversionData: ({ conversionData }) => conversionData,
        dataLoaded: ({ dataLoaded }) => dataLoaded
    },
    modules: {}
});
