<template>
    <button class="button" v-bind="$attrs">
        <span>{{ title }}</span>
    </button>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: ''
        }
    }
};
</script>

<style lang="scss" scoped>
.button {
    width: 100%;
    max-width: 25rem;
    padding: 1rem;
    background: var(--white);
    border: 2px solid var(--green);
    border-radius: 5px;
    color: var(--green);
    font-family: 'JetBrains Mono', monospace;
    cursor: pointer;

    &:hover {
        color: var(--white);
        background: var(--black);
        border-color: var(--black);
        box-shadow: 5px 5px 0 var(--green);
    }
}

.main__button--go-back {
    padding: 2rem;
    transform: translateY(50%);
}

@media (max-width: 660px) {
    .convert-button {
        margin-top: 1rem;
        width: 100%;
        max-width: 100%;
    }
}
</style>
