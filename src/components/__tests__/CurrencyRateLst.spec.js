import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import RateList from '@/components/CurrencyRateList.vue';
import BaseSelect from '@/components/BaseSelect.vue';
import CurrencyRateCard from '@/components/CurrencyRateCard.vue';

describe('RateList', () => {
    it('render correct number of CurrencyRateCard components', () => {
        const options = {
            USD: 'US Dollar',
            EUR: 'Euro',
            GBP: 'British Pound'
        };
        const rateCurrencies = {
            rates: [
                { currency: 'USD', rate: 1.2, favorite: false },
                { currency: 'EUR', rate: 0.8, favorite: true },
                { currency: 'GBP', rate: 0.9, favorite: false }
            ]
        };
        const baseCurrency = 'USD';

        const wrapper = mount(RateList, {
            props: { options, rateCurrencies, baseCurrency },
            components: { BaseSelect, CurrencyRateCard }
        });

        const currencyRateCards = wrapper.findAllComponents(CurrencyRateCard);
        expect(currencyRateCards).toHaveLength(rateCurrencies.rates.length);
    });

    it('emits "select" event when selecting the base currency', async () => {
        const options = {
            USD: 'US Dollar',
            EUR: 'Euro',
            GBP: 'British Pound'
        };
        const rateCurrencies = {
            rates: []
        };
        const baseCurrency = 'USD';

        const wrapper = mount(RateList, {
            props: { options, rateCurrencies, baseCurrency },
            components: { BaseSelect }
        });

        const baseSelectComponent = wrapper.findComponent(BaseSelect);
        await baseSelectComponent.vm.$emit('select', 'EUR');

        expect(wrapper.emitted().select).toBeTruthy();
        expect(wrapper.emitted().select[0]).toEqual(['EUR']);
    });

    it('emits "addToFavorite" event when CurrencyRateCard is clicked', async () => {
        const options = {
            USD: 'US Dollar',
            EUR: 'Euro',
            GBP: 'British Pound'
        };
        const rateCurrencies = {
            rates: [{ currency: 'USD', rate: 1.2, favorite: false }]
        };
        const baseCurrency = 'USD';

        const wrapper = mount(RateList, {
            props: { options, rateCurrencies, baseCurrency },
            components: { BaseSelect, CurrencyRateCard }
        });

        const currencyRateCard = wrapper.findComponent(CurrencyRateCard);
        await currencyRateCard.trigger('click');

        expect(wrapper.emitted().addToFavorite).toBeTruthy();
        expect(wrapper.emitted().addToFavorite[0]).toEqual(['USD']);
    });
});
