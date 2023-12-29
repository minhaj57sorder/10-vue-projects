import { defineStore } from "pinia";
import { ref } from "vue";

export const tailwind_toastStore = defineStore('tailwind_toastStore', () => {
    const toastList = ref([
    ]);
    const defaultTimeout = ref(3000)
    function generateUniqueId() {
        const timestamp = new Date().getTime().toString(16); // Convert current timestamp to hexadecimal
        const randomValue = Math.random().toString(16).slice(2); // Generate a random hexadecimal value
    
        return `${timestamp}_${randomValue}`;
    }
    
    function removeByTimeout(id,timeOutDur = defaultTimeout.value) {
        setTimeout(()=>{
            remove(id)
        },timeOutDur)
    }
    
    
    const success = (e) => {
        const id = generateUniqueId();
        toastList.value.push({
            msg: typeof e === 'string' ? e:e.msg,
            id,
            type: "success"
        })
        removeByTimeout(id, typeof e === 'string'? defaultTimeout.value:e.duration)
    }
    const error = (e) => {
        const id = generateUniqueId();
        toastList.value.push({
            msg: typeof e === 'string' ? e:e.msg,
            id,
            type: "error"
        })
        removeByTimeout(id, typeof e === 'string'? defaultTimeout.value:e.duration)
    }
    const warn = (e) => {
        const id = generateUniqueId();
        toastList.value.push({
            msg: typeof e === 'string' ? e:e.msg,
            id,
            type: "warn"
        })
        removeByTimeout(id, typeof e === 'string'? defaultTimeout.value:e.duration)
    }
    const remove = (id) => {
        toastList.value = toastList.value.filter(e=>e.id !== id)
    }
    return {
        toastList,
        success,
        error,
        warn,
        remove
    }
})