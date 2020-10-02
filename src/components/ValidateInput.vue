<template>
  <div class="validate-input-container pb-3">
    <input
      type="text"
      :class="['form-control', { 'is-invalid': inputRef.error }]"
      :value="inputRef.val"
      @blur="validateInput"
      @input="updateValue"
    />
    <div v-show="inputRef.error" class="invalid-feedback">
      {{ inputRef.message }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive } from 'vue';

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
              const passed = inputRef.val.trim() !== '';
              return passed;
            }
            case 'email': {
              const passed = emailReg.test(inputRef.val);
              return passed;
            }
            default: {
              return true;
            }
          }
        });
        inputRef.error = !allPassed;
      }
    };

    const updateValue = (event: KeyboardEvent) => {
      const { value } = event.target as HTMLInputElement;
      inputRef.val = value;
      context.emit('update:modelValue', value);
    };

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
