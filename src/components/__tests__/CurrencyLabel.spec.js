import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import CurrencyLabel from '@/components/CurrencyLabel.vue';

describe('CurrencyLabel', () => {
    it('render currency values', () => {
        const currency = 'USD';
        const wrapper = mount(CurrencyLabel, {
            props: { currency }
        });

        expect(wrapper.find('.currency-label').exists()).toBe(true);
        expect(wrapper.find('.currency-label').text()).toBe(currency);
    });

    it('correctly transmits type of currency', () => {
        const currency = 100;
        const wrapper = mount(CurrencyLabel, {
            props: { currency }
        });

        expect(wrapper.props().currency).toBe(currency);
        expect(typeof wrapper.props().currency).toBe('number');
    });

    it('render additional attributes', () => {
        const currency = 'GBP';
        const wrapper = mount(CurrencyLabel, {
            attrs: {
                'data-test': 'currency-label'
            },
            props: { currency }
        });

        expect(wrapper.find('.currency-label').attributes('data-test')).toBe('currency-label');
    });
});
