<template>
  <div class="todo-list-card p-3 bg-gray-100">
    <div class="w-full flex justify-between">
      <div>
        <button
          class="bg-gray-500 px-4 py-2 rounded bg-gray-500 focus:bg-gray-600 text-white"
          @click="
            () => {
              todoAddDialog = true;
            }
          "
        >
          Add Todo
        </button>
      </div>
      <div>
        <select
          class="bg-white p-2 rounded border border-2 border-gray-500 text-gray-500"
          @change="dailyTodos.filterTodos"
          v-model="dailyTodos.filterOption"
        >
          <option value="all" selected>All</option>
          <option value="today">Today</option>
          <option value="week">This week</option>
          <option value="month">This Month</option>
        </select>
      </div>
    </div>
    <teleport v-if="todoAddDialog" to=".route-container">
      <!-- Main modal -->
      <div
        id="authentication-modal"
        tabindex="-1"
        aria-hidden="true"
        class="bg-gray-200/80 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div
          class="relative left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] p-4 w-full max-w-md max-h-full"
        >
          <!-- Modal content -->
          <div class="relative bg-white rounded-lg shadow">
            <!-- Modal header -->
            <div
              class="flex items-center justify-between p-4 md:p-5 border-b rounded-t"
            >
              <h3 class="text-xl font-semibold text-gray-900">Add new todo</h3>
              <button
                type="button"
                class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                data-modal-hide="authentication-modal"
                @click="
                  () => {
                    todoAddDialog = false;
                  }
                "
              >
                <svg
                  class="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span class="sr-only">Close modal</span>
              </button>
            </div>
            <!-- Modal body -->
            <div class="p-4 md:p-5">
              <div class="flex justify-between items-center mt-3">
                <div class="w-full flex items-center">
                  <div class="w-full text-left text-sm">
                    <div class="todo-title-input w-full font-bold">
                      <input
                        class="w-full font-normal px-2 py-1 h-10 bg-gray-100 border border-2 border-gray-200 focus:border-gray-300 rounded"
                        type="text"
                        placeholder="Todo "
                        v-model="todoItem.title"
                      />
                    </div>
                    <div class="relative w-full mt-1">
                      <input
                        v-model="todoItem.date"
                        datepicker
                        id="pick-duedate"
                        type="date"
                        class="w-full bg-gray-50 border border-2 border-gray-300 text-gray-900 text-sm rounded focus:ring-gray-500 focus:border-gray-500 block w-full px-2 py-1"
                        placeholder="Select date"
                        :defaultValue="`${todoItem.date}`"
                      />
                      <!-- <label class="absolute top-0 left-0 w-full h-full" for="pick-duedate"></label> -->
                    </div>
                    <div class="relative w-full mt-1">
                      <label
                        for="countries"
                        class="block mb-2 text-sm font-medium text-gray-900"
                        >Select an priority</label
                      >
                      <select
                        v-model="todoItem.priority"
                        id="countries"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      >
                        <option value="low" selected>Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div class="w-full flex justify-end mt-1">
                <button
                  class="bg-white py-1 px-2 rounded border border-2 border-gray-500 text-gray-500"
                  @click="addTodoToList"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </teleport>
  </div>
</template>
<script setup>
import { reactive, ref } from "vue";
import { dailyTodoStore } from "../store/todoDataStore";
import { tailwind_toastStore } from "../store/tailwind_toastStore.js";
const tailwind_toast = tailwind_toastStore();
const dailyTodos = dailyTodoStore();
const todoAddDialog = ref(false);
const d = new Date();
const todoItem = reactive({
  title: "",
  date: `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`,
  priority: "low",
});
const addTodoToList = () => {
  dailyTodos.addTodos({
    ...todoItem,
    isDone: false,
  });
  todoAddDialog.value = false;
  tailwind_toast.success("Todo Added successfully!");
  todoItem.title = "";
  const d = new Date();
  console.log(`${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`)
  todoItem.date = `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;
  todoItem.priority = "low";
};
</script>
<style scoped></style>
