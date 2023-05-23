import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import CurrencyRateCard from '@/components/CurrencyRateCard.vue';
import CurrencyLabel from '@/components/CurrencyLabel.vue';

describe('CurrencyRateCard', () => {
    it('render CurrencyLabel component with the correct currency', () => {
        const currencyData = {
            currency: 'USD',
            rate: 1.2,
            favorite: false
        };
        const baseCurrency = 'EUR';

        const wrapper = mount(CurrencyRateCard, {
            props: { currencyData, baseCurrency },
            components: { CurrencyLabel }
        });

        expect(wrapper.findComponent(CurrencyLabel).props().currency).toBe(currencyData.currency);
    });

    it('render correct formatted exchange rate result', () => {
        const currencyData = {
            currency: 'USD',
            rate: 1.2,
            favorite: false
        };
        const baseCurrency = 'EUR';

        const wrapper = mount(CurrencyRateCard, {
            props: { currencyData, baseCurrency },
            components: { CurrencyLabel }
        });

        const formattedRateResult = `1 ${currencyData.currency} = ${currencyData.rate} ${baseCurrency}`;
        expect(wrapper.find('.rate').text()).toBe(formattedRateResult);
    });

    it('adds "favorite" class if currencyData.favorite === true', () => {
        const currencyData = {
            currency: 'USD',
            rate: 1.2,
            favorite: true
        };
        const baseCurrency = 'EUR';

        const wrapper = mount(CurrencyRateCard, {
            props: { currencyData, baseCurrency },
            components: { CurrencyLabel }
        });

        expect(wrapper.classes()).toContain('favorite');
    });

    it('does not add "favorite" class if currencyData.favorite === false', () => {
        const currencyData = {
            currency: 'USD',
            rate: 1.2,
            favorite: false
        };
        const baseCurrency = 'EUR';

        const wrapper = mount(CurrencyRateCard, {
            props: { currencyData, baseCurrency },
            components: { CurrencyLabel }
        });

        expect(wrapper.classes()).not.toContain('favorite');
    });

    // Додайте більше тестів відповідно до потреб вашого компонента
});
