<template>
  <div class="validate-input-container pb-3">
    <input
      :class="['form-control', { 'is-invalid': inputRef.error }]"
      :value="inputRef.val"
      @blur="validateInput"
      @input="updateValue"
      v-bind="$attrs"
    />
    <div class="invalid-feedback" v-show="inputRef.error">
      {{ inputRef.message }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, reactive } from 'vue';
import { emitter } from '@/components/ValidateForm.vue';

export interface RuleProps {
  type: 'required' | 'email';
  message: string;
}

const emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export default defineComponent({
  name: 'ValidateInput',
  props: {
    rules: {
      type: Array as PropType<RuleProps[]>,
      default: []
    },
    modalValue: {
      type: String,
      default: ''
    }
  },
  emits: { 'update:modelValue': null },
  inheritAttrs: false,
  setup(props, context) {
    const inputRef = reactive({
      val: props.modalValue,
      error: false,
      message: ''
    });
    const validateInput = () => {
      if (props.rules.length) {
        const allPassed = props.rules.every((rule) => {
          inputRef.message = rule.message;
          switch (rule.type) {
            case 'required': {
              return inputRef.val.trim() !== '';
            }
            case 'email': {
              return emailReg.test(inputRef.val);
            }
            default: {
              return true;
            }
          }
        });
        inputRef.error = !allPassed;
        return allPassed;
      }
      return true;
    };
    const updateValue = (event: KeyboardEvent) => {
      const { value } = event.target as HTMLInputElement;
      inputRef.val = value;
      context.emit('update:modelValue', value);
    };

    onMounted(() => {
      emitter.emit('form-item-created', validateInput);
    });

    return {
      inputRef,
      validateInput,
      updateValue
    };
  }
});
</script>

<style>
</style>
