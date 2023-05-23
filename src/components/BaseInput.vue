<template>
    <div class="input-wrap">
        <label v-if="label" :for="label">{{ label }}</label>
        <input
            :id="label"
            type="text"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            :placeholder="placeholder"
            v-bind="$attrs"
        />
    </div>
</template>

<script setup>
defineProps({
    label: {
        type: [String, Boolean],
        default: false,
        required: true
    },
    modelValue: {
        type: String,
        default: ''
    },
    placeholder: {
        type: String,
        default: ''
    }
});
</script>

<style lang="scss" scoped>
.input-wrap {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;

    label {
        width: fit-content;
        cursor: pointer;
        font-size: 1.5rem;
        font-weight: 700;
    }

    input {
        padding: 1rem;
        border: 2px solid var(--green);
        border-radius: 5px;
        font-family: inherit;
        color: inherit;
    }
}
</style>
