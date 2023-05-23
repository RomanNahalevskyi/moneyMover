<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useStore } from 'vuex';
import {
    CURRENCY_CONVERSION_REGEX,
    INCORRECT_CURRENCIES,
    INVALID_INPUT_FORMAT
} from '@/constants.js';
import BaseInput from '@/components/BaseInput.vue';
import BaseButton from '@/components/BaseButton.vue';
import CurrencyLabel from '@/components/CurrencyLabel.vue';

const store = useStore();
const inputText = ref('');

watch(inputText, (newValue) => {
    if (newValue === '') {
        store.commit('SET_CONVERSION', null);
    }
});

function getCurrencies() {
    store.dispatch('fetchCurrencies');
}

function convertCurrency() {
    const matches = inputText.value.match(CURRENCY_CONVERSION_REGEX);

    if (matches && matches.length === 4) {
        const amount = parseFloat(matches[1]);
        const fromCurrency = isValidCurrency(matches[2].toUpperCase());
        const toCurrency = isValidCurrency(matches[3].toUpperCase());

        if (amount && fromCurrency && toCurrency) {
            const payload = {
                amount,
                fromCurrency,
                toCurrency
            };

            store.dispatch('conversion', payload);
        } else {
            store.commit('SET_CONVERSION', INCORRECT_CURRENCIES);
        }
    } else {
        store.commit('SET_CONVERSION', INVALID_INPUT_FORMAT);
    }
}

function isValidCurrency(currencyCode) {
    const currency = Object.keys(currencies.value).find((el) => el === currencyCode);

    return currency ? currency : null;
}

const getConversionData = computed(() => store.getters['conversionData']);
const formattedConversionResult = computed(() => {
    let resultConversion;

    if (
        getConversionData.value === INCORRECT_CURRENCIES ||
        getConversionData.value === INVALID_INPUT_FORMAT
    ) {
        resultConversion = getConversionData.value;
    } else {
        resultConversion = `${getConversionData.value.amount} ${
            getConversionData.value.fromCurrency
        } = ${getConversionData.value.rates.toFixed(2)} ${getConversionData.value.toCurrency}`;
    }

    return resultConversion;
});
const currencies = computed(() => store.getters['currencies']);
const isDataLoaded = computed(() => store.getters['dataLoaded']);

onMounted(() => {
    if (!isDataLoaded.value) {
        getCurrencies();
    }
    store.commit('SET_CONVERSION', null);
});
</script>

<template>
    <div class="home">
        <div class="home__container">
            <BaseInput
                v-model="inputText"
                label="Currency Conversion"
                placeholder="Enter currency conversion(15 usd in dkk)"
                type="text"
            />

            <BaseButton class="convert-button" title="Convert" @click="convertCurrency" />
        </div>

        <h1 v-if="getConversionData" class="home__result">{{ formattedConversionResult }}</h1>

        <div class="home__available-currencies">
            <p class="currencies-title">All Available Currencies</p>
            <div class="currencies-label">
                <CurrencyLabel
                    v-for="(_, currency) in currencies"
                    :key="currency"
                    :currency="currency"
                />
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.home {
    &__container {
        display: flex;
        gap: 2rem;
        align-items: flex-end;
    }

    &__available-currencies {
        margin-top: 4rem;

        .currencies-title {
            width: fit-content;
            font-size: 1.5rem;
            font-weight: 700;
        }

        .currencies-label {
            display: flex;
            flex-wrap: wrap;
            gap: 1rem;
            align-items: center;
            justify-content: flex-start;
        }
    }

    @media (max-width: 660px) {
        &__container {
            display: block;
        }
    }
}
</style>
