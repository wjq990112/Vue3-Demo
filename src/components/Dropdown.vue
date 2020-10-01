<template>
  <div class="dropdown" ref="dropdownRef">
    <a
      href="#"
      class="btn btn-outline-light my-2 dropdown-toggle"
      @click.prevent="toggleOpen"
    >
      {{ buttonText }}
    </a>
    <ul class="dropdown-menu" style="display: block" v-show="isOpen">
      <slot />
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import useClickOutside from '@/hooks/useClickOutside';

export default defineComponent({
  name: 'Dropdown',
  props: {
    buttonText: {
      type: String,
      required: true
    }
  },
  setup() {
    const isOpen = ref<boolean>(false);
    const toggleOpen = () => {
      isOpen.value = !isOpen.value;
    };

    const dropdownRef = ref<HTMLElement | null>(null);
    const { isClickOutside } = useClickOutside(dropdownRef);
    watch([isClickOutside], () => {
      if (isOpen.value && isClickOutside.value) {
        isOpen.value = false;
      }
    });

    return {
      isOpen,
      toggleOpen,
      dropdownRef
    };
  }
});
</script>

<style>
</style>
