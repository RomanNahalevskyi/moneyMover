<script setup>
import CurrencyLabel from '@/components/CurrencyLabel.vue';
import { computed } from 'vue';

const props = defineProps({
    baseCurrency: {
        type: String
    },
    currencyData: {
        type: Object,
        default: () => {}
    }
});

const formattedRateResult = computed(() => {
    return `1 ${props.currencyData.currency} = ${props.currencyData.rate} ${props.baseCurrency}`;
});
</script>

<template>
    <article :class="['rate-card', { favorite: currencyData.favorite }]">
        <div class="rate-card__currency">
            <CurrencyLabel :currency="currencyData.currency" />
        </div>

        <div class="rate-card__rate">
            <span class="rate">{{ formattedRateResult }}</span>
        </div>
    </article>
</template>

<style scoped lang="scss">
.rate-card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    gap: 2rem;
    padding: 2rem;
    border: 1px solid var(--green);
    border-radius: 5px;
    box-shadow: 5px 5px 0 var(--black);
    cursor: pointer;

    &__rate {
        .rate {
            font-size: 1.3rem;
        }
    }

    &.favorite {
        background: var(--gold);
    }
}
</style>
