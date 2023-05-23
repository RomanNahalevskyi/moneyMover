<script setup>
defineProps({
    currency: {
        type: [Number, String]
    }
});
</script>

<template>
    <span class="currency-label">{{ currency }}</span>
</template>

<style lang="scss" scoped>
.currency-label {
    padding: 4px 8px;
    border: 2px solid var(--lightBlue);
    border-radius: 5px;
    color: var(--blue);
    background-color: rgba(194, 224, 255, 0.5);
    font-family: 'JetBrains Mono', monospace;
    font-size: 1.3rem;
}
</style>
