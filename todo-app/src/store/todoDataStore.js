import { defineStore } from "pinia";
import { ref } from "vue";

export const dailyTodoStore = defineStore('dailyTodoStore', () => {
    const todoLists = ref([
        {
            title: "loremipsum dolor sit amet, consectetur adipiscing",
            date: "2023-11-17",
            isDone: false
        },
        {
            title: "work",
            date: "2023-11-17",
            isDone: true
        },
    ]);
    const sortTodosList = (todoListArray) => {
        const sortedList = todoListArray.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);

            return dateA - dateB;
        });
        return sortedList
    }
    const loadTodos = () => {
        todoLists.value = JSON.parse(localStorage.getItem('todos')) ? JSON.parse(localStorage.getItem('todos')) : []
    }
    const addTodos = (todo) => {
        todoLists.value = (JSON.parse(JSON.stringify(sortTodosList([...todoLists.value, todo]))))
        localStorage.setItem('todos', JSON.stringify(todoLists.value))
    }
    const removeTodo = (index) => {
        todoLists.value.splice(index, 1)
        localStorage.setItem('todos', JSON.stringify(todoLists.value))
    }
    const markasDoneTodo = () => {
        localStorage.setItem('todos', JSON.stringify(todoLists.value))
    }
    const updateTodo = (todo, index) => {
        todoLists.value.splice(index, 1)
        addTodos(JSON.parse(JSON.stringify(todo)))
    }
    // filter todo
    const filterOption = ref('all')
    const filterTodos = () => {
        const currentDate = new Date(); // Current date
        const todos = JSON.parse(localStorage.getItem('todos')) ? JSON.parse(localStorage.getItem('todos')) : []
        switch (filterOption.value) {
            case 'all':
                todoLists.value = (todos);
                break;
            case 'today':
                const todayTodos = todos.filter(todo => todo.date === currentDate.toISOString().split('T')[0]);
                todoLists.value = (todayTodos);
                break;
            case 'week':
                const oneWeekLater = new Date(currentDate);
                oneWeekLater.setDate(oneWeekLater.getDate() + 6);
                const oneDayBefore = new Date(currentDate);
                oneDayBefore.setDate(oneDayBefore.getDate() -1);
                const weekTodos = todos.filter(todo => new Date(todo.date) <= oneWeekLater && new Date(todo.date) >= oneDayBefore);
                todoLists.value = (weekTodos);
                break;
            case 'month':
                const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
                const monthTodos = todos.filter(todo => new Date(todo.date) >= firstDayOfMonth);
                todoLists.value = (monthTodos);
                break;
            default:
                todoLists.value = (todos);
                break;
        }
    }
    return {
        todoLists,
        loadTodos,
        addTodos,
        updateTodo,
        markasDoneTodo,
        removeTodo,
        filterTodos,
        filterOption
    }
})