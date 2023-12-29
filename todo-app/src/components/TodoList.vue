<template>
  <div class="todo-list-card mt-2 p-3 bg-blue-100 space-y-3">
    <div
      class="flex justify-between items-center p-3 bg-white shadow-lg rounded-sm"
      v-for="(todo, index) in dailyTodos.todoLists"
      :key="index"
    >
      <div class="todolist-content ml-1 flex items-center">
        <div class="w-8 h-8">
          <input
            class="w-8 h-8 accent-blue-500"
            v-model="todo.isDone"
            type="checkbox"
            :value="todo.isDone"
            @change="dailyTodos.markasDoneTodo"
          />
        </div>
        <div class="todo-content ml-2 text-left text-sm">
          <div class="todo-title font-bold">
            <span :class="[todo.isDone ? 'line-through' : '']">
              {{ " " }} {{ todo.title }}
            </span>
          </div>
          <div class="todo-date">
            {{ todo.date }}

            <span
              v-show="isLate(todo.date)"
              class="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300"
              >Late</span
            >
            <span
              v-show="todo.priority == 'high'"
              class="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300"
              >High</span
            >
            <span
              v-show="
                todo.priority == 'low' ||
                (todo.priority != 'high' && todo.priority != 'medium')
              "
              class="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300"
              >Low</span
            >
            <span
              v-show="todo.priority == 'medium'"
              class="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300"
              >Medium</span
            >
          </div>
        </div>
      </div>
      <div class="action-todo">
        <button
          class="bg-white p-2  rounded border border-2 border-red-500 text-red-500"
          @click="dailyTodos.removeTodo(index)"
        >
          <svg
            class="trash-icon w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 18 20"
          >
            <path
              d="M17 4h-4V2a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v2H1a1 1 0 0 0 0 2h1v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1a1 1 0 1 0 0-2ZM7 2h4v2H7V2Zm1 14a1 1 0 1 1-2 0V8a1 1 0 0 1 2 0v8Zm4 0a1 1 0 0 1-2 0V8a1 1 0 0 1 2 0v8Z"
            />
          </svg>
        </button>
        <button
          class="bg-white p-2 ms-2 rounded border-2 border-blue-500 text-blue-500"
          @click="openEditTodo(todo, index)"
        >
          <svg
            class="edit-icon w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 18 20"
          >
            <path
              d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z"
            />
            <path
              d="M13.243 3.2 7.359 9.081a.5.5 0 0 0-.136.256L6.51 12.9a.5.5 0 0 0 .59.59l3.566-.713a.5.5 0 0 0 .255-.136L16.8 6.757 13.243 3.2Z"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>

  <teleport v-if="todoEditDialog" to=".route-container">
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
            <h3 class="text-xl font-semibold text-gray-900">Update todo</h3>
            <button
              type="button"
              class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
              data-modal-hide="authentication-modal"
              @click="
                () => {
                  todoEditDialog = false;
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
                @click="updateTodo"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { ref, reactive } from "vue";
import { dailyTodoStore } from "../store/todoDataStore";
import { tailwind_toastStore } from "../store/tailwind_toastStore.js";
const tailwind_toast = tailwind_toastStore();
const todoEditDialog = ref(false);
const todoEditIndex = ref(0);
const dailyTodos = dailyTodoStore();
dailyTodos.loadTodos();
const todoItem = reactive({
  title: "",
  date: "",
  priority: "low",
});
const openEditTodo = (todo, index) => {
  todoEditDialog.value = true;
  todoEditIndex.value = index;
  todoItem.title = todo.title;
  todoItem.priority = todo.priority;
  todoItem.date = todo.date;
};
const updateTodo = () => {
  dailyTodos.updateTodo(todoItem, todoEditIndex.value);
  todoEditDialog.value = false;
  tailwind_toast.success("Successfully updated");
  todoEditIndex.value = 0;
  todoItem.title = "";
  todoItem.priority = "";
  todoItem.date = "";
};

const isLate = e =>{
  const d = new Date(e)
  const a_day_ago = new Date()
  a_day_ago.setDate(a_day_ago.getDate()-1)
  return a_day_ago > d
}
</script>

<style scoped></style>
