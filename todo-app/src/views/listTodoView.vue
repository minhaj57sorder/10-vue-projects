<template>
  <div class="w-full h-full bg-white">
    <TodoTopActionBar />
    <TodoList />
  </div>
</template>

<script setup>
import TodoTopActionBar from "../components/TodoTopActionBar.vue";
import TodoList from "../components/TodoList.vue";
import { dailyTodoStore } from "../store/todoDataStore";

const dailyTodos = dailyTodoStore();
</script>

<style scoped></style>
