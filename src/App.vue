<script setup>
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router';
import { computed } from 'vue';
import BaseButton from '@/components/BaseButton.vue';

const route = useRoute();
const router = useRouter();

const pageRouteData = computed(() => {
    return route.name === 'Home'
        ? {
              goTo: '/currency-rates',
              btnName: 'Go To Currency Rates Page'
          }
        : {
              goTo: '/',
              btnName: 'Go To Home Page'
          };
});
</script>

<template>
    <header class="header">
        <h1 class="header__text">
            <router-link to="/">MoneyMover</router-link>
        </h1>
    </header>

    <BaseButton
        @click="router.push(`${pageRouteData.goTo}`)"
        :title="pageRouteData.btnName"
        class="button--primary main__button--go-back"
    />

    <main class="main">
        <RouterView />
    </main>
</template>

<style scoped lang="scss">
.header__text {
    font-size: 4rem;
    text-shadow: 2px 2px 0 var(--black);

    a {
        color: var(--white);
    }
}

.main {
    padding-top: 10rem;
}
</style>
