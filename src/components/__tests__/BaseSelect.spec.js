import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseSelect from '@/components/BaseSelect.vue';

describe('BaseSelect', () => {
    it('render label if available', () => {
        const label = 'Select Option';
        const wrapper = mount(BaseSelect, {
            props: { label, options: {}, selected: '' }
        });

        expect(wrapper.find('.label').exists()).toBe(true);
    });

    it('do not render the label if it is missing', () => {
        const wrapper = mount(BaseSelect, {
            props: { options: {}, selected: '' }
        });

        expect(wrapper.find('.label').exists()).toBe(false);
    });

    it('correctly passes options to be displayed in the drop-down list', () => {
        const options = {
            USD: 'United States Dollar',
            EUR: 'Euro',
            GBP: 'British Pound'
        };
        const wrapper = mount(BaseSelect, {
            props: { options, selected: '' }
        });

        const selectOptions = wrapper.findAll('option');

        expect(selectOptions.length).toBe(Object.keys(options).length);

        selectOptions.forEach((option, index) => {
            const currencyCode = option.attributes('value');
            const currencyName = option.text();

            expect(currencyCode).toBe(Object.keys(options)[index]);
            expect(currencyName).toBe(`${currencyCode}: ${Object.values(options)[index]}`);
        });
    });

    it('correctly sets selected option (selected)', () => {
        const options = {
            USD: 'United States Dollar',
            EUR: 'Euro',
            GBP: 'British Pound'
        };
        const selected = 'EUR';
        const wrapper = mount(BaseSelect, {
            props: { options, selected }
        });

        const selectElement = wrapper.find('select');

        expect(selectElement.element.value).toBe(selected);
    });

    it('emits "select" event when the selected option is changed', async () => {
        const options = {
            USD: 'United States Dollar',
            EUR: 'Euro',
            GBP: 'British Pound'
        };
        const selected = 'EUR';
        const wrapper = mount(BaseSelect, {
            props: { options, selected }
        });

        const selectElement = wrapper.find('select');

        const newValue = 'USD';
        await selectElement.setValue(newValue);

        expect(wrapper.emitted('select')).toBeTruthy();
        expect(wrapper.emitted('select')[0][0]).toBe(newValue);
    });

    it('render additional attributes', () => {
        const wrapper = mount(BaseSelect, {
            attrs: {
                id: 'currency-select',
                'data-custom': 'custom-value'
            },
            props: { options: {}, selected: '' }
        });

        expect(wrapper.find('select').attributes('id')).toBe('currency-select');
        expect(wrapper.find('select').attributes('data-custom')).toBe('custom-value');
    });
});
