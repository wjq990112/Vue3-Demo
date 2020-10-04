<template>
  <div class="row">
    <div class="col-4 mb-4" :key="column.id" v-for="column of columnList">
      <div class="card h-100 shadow-sm">
        <div class="card-body text-center">
          <img
            class="w-25 my-3 border border-light rounded-circle"
            :alt="column.title"
            :src="column.avatar"
          />
          <h5 class="card-title">{{ column.title }}</h5>
          <p class="card-text text-left">{{ column.description }}</p>
          <a class="btn btn-outline-primary" href="#">进入专栏</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue';

export interface ColumnItemProps {
  id: number;
  title: string;
  avatar?: string;
  description: string;
}

export default defineComponent({
  name: 'ColumnList',
  props: {
    list: {
      type: Array as PropType<ColumnItemProps[]>,
      required: true
    }
  },
  setup(props) {
    const columnList = computed(() =>
      props.list.map((column) => {
        if (!column.avatar) {
          column.avatar = require('@/assets/column.jpg');
        }
        return column;
      })
    );

    return {
      columnList
    };
  }
});
</script>

<style>
</style>
