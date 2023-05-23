<script setup>
import BaseSelect from '@/components/BaseSelect.vue';
import CurrencyRateCard from '@/components/CurrencyRateCard.vue';

defineProps({
    options: {
        type: Object,
        default: () => {}
    },
    rateCurrencies: {
        type: Object,
        default: () => {}
    },
    baseCurrency: {
        type: String
    }
});
</script>

<template>
    <div class="rate-list" v-if="rateCurrencies">
        <div>
            <BaseSelect
                label="Base currency:"
                :options="options"
                @select="$emit('select', $event)"
                :selected="baseCurrency"
            />
        </div>
        <ul class="rate-list__card">
            <li v-for="rate in rateCurrencies.rates" :key="rate.currency">
                <CurrencyRateCard
                    :currency-data="rate"
                    :base-currency="baseCurrency"
                    @click="$emit('addToFavorite', rate.currency)"
                />
            </li>
        </ul>
    </div>
</template>

<style lang="scss" scoped>
.rate-list {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 2rem;

    &__result {
        font-size: 2rem;
    }

    &__card {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        grid-gap: 2rem;
        list-style: none;
        padding: 0;
    }
}
</style>
