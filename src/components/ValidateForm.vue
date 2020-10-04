<template>
  <form class="validate-form-container">
    <slot />
    <div class="submit-area" @click.prevent="onFormSubmit">
      <slot name="submit">
        <button class="btn btn-primary" type="submit">提交</button>
      </slot>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from 'vue';
import mitt from 'mitt';

type ValidateFunc = () => boolean;

export const emitter = mitt();

export default defineComponent({
  name: 'ValidateForm',
  emits: { 'form-submit': null },
  setup(props, context) {
    const validateFuncArray: ValidateFunc[] = [];

    const onFormSubmit = () => {
      const result = validateFuncArray
        .map((validateFunc) => validateFunc())
        .every((result) => result);
      context.emit('form-submit', result);
    };

    const handler = (validateFunc?: ValidateFunc) => {
      validateFuncArray.push(validateFunc as ValidateFunc);
    };
    emitter.on('form-item-created', handler);
    onUnmounted(() => {
      emitter.off('form-item-created', handler);
      validateFuncArray.splice(0);
    });

    return {
      onFormSubmit
    };
  }
});
</script>

<style>
</style>
