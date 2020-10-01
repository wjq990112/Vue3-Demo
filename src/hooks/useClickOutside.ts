import { ref, onMounted, onUnmounted, Ref } from 'vue';

const useClickOutside = (elementRef: Ref<HTMLElement | null>) => {
  const isClickOutside = ref<boolean>(false);

  const handler = (event: MouseEvent) => {
    if (
      elementRef.value &&
      !elementRef.value.contains(event.target as HTMLElement) &&
      isClickOutside
    ) {
      isClickOutside.value = true;
    } else {
      isClickOutside.value = false;
    }
  };

  onMounted(() => {
    document.addEventListener('click', handler);
  });

  onUnmounted(() => {
    document.removeEventListener('click', handler);
  });

  return {
    isClickOutside
  };
};

export default useClickOutside;
