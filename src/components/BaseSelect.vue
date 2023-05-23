<script setup>
defineProps({
    options: {
        required: true
    },
    selected: {
        type: String
    },
    label: {
        type: String
    }
});
const emit = defineEmits(['select']);
</script>

<template>
    <label class="label" v-if="label">{{ label }} {{ selected }}</label>
    <div class="base-select">
        <select
            @change="emit('select', $event.target.value)"
            class="base-select__select"
            v-bind="$attrs"
        >
            <option
                v-for="(currencyName, currency) in options"
                :key="currency"
                :value="currency"
                :selected="currency === selected"
            >
                {{ currency }}: {{ currencyName }}
            </option>
        </select>
    </div>
</template>

<style lang="scss" scoped>
.base-select {
    position: relative;
    height: 100%;

    select {
        color: #363636;
        font-size: 1.5rem;
        height: 3.3rem;
        border-radius: 4px;
        max-width: 100%;
        margin: auto;
        outline: 0;
        background: #fff;
        padding-left: 1rem;
        border: 2px solid var(--green);
        box-shadow: inset 0 0.0625em 0.125em rgb(10 10 10 / 5%);
        -webkit-appearance: none;
    }

    &__select {
        border-color: #3273dc;
        width: 100%;
        height: 100%;
        cursor: pointer;
        font-size: 1em;
        max-width: 100%;
        outline: 0;
        display: block;
    }

    &:after {
        transform: rotate(-45deg);
        transform-origin: center;
        content: '';
        border: 3px solid rgba(0, 0, 0, 0);
        border-radius: 2px;
        border-top: 0;
        border-right: 0;
        display: block;
        height: 1rem;
        width: 1rem;
        z-index: 4;
        position: absolute;
        top: 30%;
        right: 2rem;
    }

    &:not(:hover)::after {
        border-color: var(--green);
    }

    &:hover::after {
        border-color: var(--black);
    }
}

.label {
    font-size: 1.2rem;
}
</style>
