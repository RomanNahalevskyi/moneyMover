<script setup>
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import CurrencyRateList from '@/components/CurrencyRateList.vue';

const store = useStore();

const baseCurrency = ref('USD');
let favorites = [];

function getCurrencies() {
    store.dispatch('fetchCurrencies');
}

function getExchangeRate() {
    store.dispatch('fetchCurrencyRates', baseCurrency);
    favorites = [];
}

function addToFavorite(favoriteCurrency) {
    const isExistingCurrency = favorites.some((currency) => currency === favoriteCurrency);

    if (!isExistingCurrency) {
        favorites.push(favoriteCurrency);
    }

    const updatedResult = updateExchangeRateDataWithFavorites(isExistingCurrency, favoriteCurrency);

    store.commit('SET_EXCHANGE_RATE', updatedResult);
}

function updateExchangeRateDataWithFavorites(isExistingCurrency, favoriteCurrency) {
    const clonedData = JSON.parse(JSON.stringify(getExchangeRateData.value));

    if (isExistingCurrency) {
        const { selectedRate, existingCurrencyIndex } = getCurrencyInfo(
            clonedData,
            favoriteCurrency
        );

        removeFavoriteCurrency(favoriteCurrency);

        removeCurrencyFromRates(existingCurrencyIndex, clonedData);

        clonedData.rates.push({
            currency: favoriteCurrency,
            rate: selectedRate
        });
    } else {
        favorites.forEach((currency) => {
            const { selectedRate, existingCurrencyIndex } = getCurrencyInfo(clonedData, currency);

            removeCurrencyFromRates(existingCurrencyIndex, clonedData);

            clonedData.rates.unshift({
                currency,
                rate: selectedRate,
                favorite: true
            });
        });
    }

    return clonedData;
}

function getCurrencyInfo(clonedData, currency) {
    const selectedRate = clonedData.rates.find((rate) => rate.currency === currency).rate;
    const existingCurrencyIndex = clonedData.rates.findIndex((rate) => rate.currency === currency);

    return { selectedRate, existingCurrencyIndex };
}

function removeFavoriteCurrency(favoriteCurrency) {
    const index = favorites.indexOf(favoriteCurrency);

    if (index !== -1) {
        favorites.splice(index, 1);
    }
}

function removeCurrencyFromRates(existingCurrencyIndex, clonedData) {
    if (existingCurrencyIndex !== -1) {
        clonedData.rates.splice(existingCurrencyIndex, 1);
    }
}

const getExchangeRateData = computed(() => store.getters['exchangeRateData']);
const currenciesOptions = computed(() => store.getters['currencies']);
const isDataLoaded = computed(() => store.getters['dataLoaded']);

onMounted(() => {
    if (!isDataLoaded.value) {
        getCurrencies();
    }
    getExchangeRate();
});
</script>

<template>
    <CurrencyRateList
        :options="currenciesOptions"
        :rate-currencies="getExchangeRateData"
        :base-currency="baseCurrency"
        @select="baseCurrency = $event"
        @change="getExchangeRate"
        @addToFavorite="addToFavorite"
    />
</template>
