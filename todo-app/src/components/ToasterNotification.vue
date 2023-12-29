<template>
  <div id="tailwind-toaster-container">
    <div
      v-for="(item, index) in tailwind_toast.toastList"
      :class="[
        'fixed',
        item.position == 'top-left'
          ? 'left-0 top-0 translate-x-[5%] translate-y-[15%]'
          : item.position == 'top-right'
          ? 'right-0 top-0 translate-x-[-5%] translate-y-[15%]'
          : item.position == 'bottom-left'
          ? 'left-0 bottom-0 translate-x-[5%] translate-y-[-5%]'
          : item.position == 'bottom-right'
          ? 'right-0 bottom-0 translate-x-[-5%] translate-y-[-5%]'
          : item.position == 'bottom-center'
          ? 'left-[50%] bottom-0 translate-x-[-50%] translate-y-[-5%]'
          : item.position == 'left-center'
          ? 'left-0 top-[50%] translate-x-[5%] translate-y-[-50%]'
          : item.position == 'right-center'
          ? 'right-0 top-[50%] translate-x-[-5%] translate-y-[-50%]'
          : item.position == 'center'
          ? 'left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]'
          : 'left-[50%] top-0 translate-x-[-50%] translate-y-[15%]',
      ]"
      :key="index"
    >
      <div
        class="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow"
      >
        <div
          :class="[
            `inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg`,
            item.type == 'success' ? 'text-green-500 bg-green-100' : '',
            item.type == 'error' ? 'text-red-500 bg-red-100' : '',
            item.type == 'warn' ? 'text-orange-500 bg-orange-100' : '',
          ]"
        >
          <svg
            class="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              v-if="item.type == 'success'"
              d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"
            />
            <path
              v-if="item.type == 'error'"
              d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"
            />
            <path
              v-if="item.type == 'warn'"
              d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z"
            />
          </svg>
          <span class="sr-only">Check icon</span>
        </div>
        <div class="ms-3 text-sm font-normal text-left">{{ item?.msg }}</div>
        <button
          type="button"
          class="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8"
          data-dismiss-target="#toast-success"
          aria-label="Close"
          @click="tailwind_toast.remove(item.id)"
        >
          <span class="sr-only">Close</span>
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
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { tailwind_toastStore } from "../store/tailwind_toastStore.js";
const tailwind_toast = tailwind_toastStore();

</script>

<style scoped></style>
