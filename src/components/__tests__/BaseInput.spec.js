import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseInput from '@/components/BaseInput.vue';

describe('BaseInput', () => {
    it('render (label) if available', () => {
        const label = 'Username';
        const wrapper = mount(BaseInput, {
            props: { label }
        });

        expect(wrapper.find('label').exists()).toBe(true);
        expect(wrapper.find('label').text()).toBe(label);
    });

    it('do not render (label) if it is missing', () => {
        const wrapper = mount(BaseInput);

        expect(wrapper.find('label').exists()).toBe(false);
    });

    it('passes model value (modelValue) to the input input', () => {
        const modelValue = 'JohnDoe';
        const wrapper = mount(BaseInput, {
            props: { modelValue }
        });

        expect(wrapper.find('input').element.value).toBe(modelValue);
    });

    it('emits the "update:modelValue" event when entering text into input', async () => {
        const wrapper = mount(BaseInput);
        const input = wrapper.find('input');

        const newValue = 'New Value';
        await input.setValue(newValue);

        expect(wrapper.emitted('update:modelValue')).toBeTruthy();
        expect(wrapper.emitted('update:modelValue')[0][0]).toBe(newValue);
    });

    it('render (placeholder)', () => {
        const placeholder = 'Enter your name';
        const wrapper = mount(BaseInput, {
            props: { placeholder }
        });

        expect(wrapper.find('input').attributes('placeholder')).toBe(placeholder);
    });

    it('render additional attributes', () => {
        const wrapper = mount(BaseInput, {
            attrs: {
                id: 'username-input',
                'data-custom': 'custom-value'
            }
        });

        expect(wrapper.find('input').attributes('id')).toBe('username-input');
        expect(wrapper.find('input').attributes('data-custom')).toBe('custom-value');
    });
});
