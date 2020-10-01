<template>
  <div class="container">
    <GlobalHeader :user="user" />
    <!-- <ColumnList :list="list" /> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import GlobalHeader, { UserProps } from '@/components/GlobalHeader.vue';

import 'bootstrap/dist/css/bootstrap.min.css';

export default defineComponent({
  name: 'App',
  components: {
    GlobalHeader
  },
  setup() {
    const user: UserProps = {
      isLogin: true,
      name: 'jack'
    };

    return { user };
  }
});
</script>

<style>
</style>
