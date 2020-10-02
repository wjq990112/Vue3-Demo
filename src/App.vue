<template>
  <div class="container">
    <GlobalHeader :user="user" />
    <!-- <ColumnList :list="list" /> -->
    <ValidateInput v-model="emailVal" :rules="emailRules" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import GlobalHeader, { UserProps } from '@/components/GlobalHeader.vue';
import ValidateInput, { RuleProps } from '@/components/ValidateInput.vue';

import 'bootstrap/dist/css/bootstrap.min.css';

export default defineComponent({
  name: 'App',
  components: {
    GlobalHeader,
    ValidateInput
  },
  setup() {
    const user: UserProps = {
      isLogin: true,
      name: 'jack'
    };
    const emailRules: RuleProps[] = [
      { type: 'required', message: '电子邮箱地址不能为空' },
      { type: 'email', message: '请输入正确的电子邮箱格式' }
    ];

    const emailVal = ref('');

    return { user, emailRules, emailVal };
  }
});
</script>

<style>
</style>
