import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import Button from '@/components/BaseButton.vue';

describe('Button', () => {
    it('render button title', () => {
        const title = 'Test Button';
        const wrapper = mount(Button, {
            props: { title }
        });

        expect(wrapper.text()).toBe(title);
    });

    it('has class "button"', () => {
        const wrapper = mount(Button);

        expect(wrapper.classes()).toContain('button');
    });

    it('render additional attributes', () => {
        const wrapper = mount(Button, {
            attrs: {
                id: 'test-button',
                'data-custom': 'custom-value'
            }
        });

        expect(wrapper.attributes('id')).toBe('test-button');
        expect(wrapper.attributes('data-custom')).toBe('custom-value');
    });
});
