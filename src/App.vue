<template>
  <div class="container">
    <GlobalHeader :user="user" />
    <ValidateForm @form-submit="onFormSubmit">
      <ValidateInput
        type="email"
        placeholder="请输入电子邮箱地址"
        :rules="emailRules"
        v-model="emailVal"
      />
      <ValidateInput
        type="password"
        placeholder="请输入密码"
        :rules="passwordRules"
        v-model="passwordVal"
      />
    </ValidateForm>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import GlobalHeader, { UserProps } from '@/components/GlobalHeader.vue';
import ValidateForm from '@/components/ValidateForm.vue';
import ValidateInput, { RuleProps } from '@/components/ValidateInput.vue';

import 'bootstrap/dist/css/bootstrap.min.css';

export default defineComponent({
  name: 'App',
  components: {
    GlobalHeader,
    ValidateInput,
    ValidateForm
  },
  setup() {
    const user: UserProps = {
      isLogin: true,
      name: 'jack'
    };
    const emailVal = ref('');
    const emailRules: RuleProps[] = [
      { type: 'required', message: '电子邮箱地址不能为空' },
      { type: 'email', message: '请输入正确的电子邮箱格式' }
    ];

    const passwordVal = ref('');
    const passwordRules: RuleProps[] = [
      {
        type: 'required',
        message: '密码不能为空'
      }
    ];

    const onFormSubmit = (result: boolean) => {
      console.log(result);
    };

    return {
      user,
      emailRules,
      emailVal,
      passwordRules,
      passwordVal,
      onFormSubmit
    };
  }
});
</script>

<style>
</style>
