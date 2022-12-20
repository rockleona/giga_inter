import { createStore } from 'vuex'

const store = createStore({
    state() {
        return {
            todo_list: [],
        }
    },
    mutations: {
        addTodo(state) { state.todo_list.push('text') },
        deleteTodo(state) { state.todo_list = [] },
        updateTodo(state) { state.todo_list = [] },
    },
    getters:{
        getTodoLength(state){
            return state.todo_list.length
        },
        getTodoList(state){
            return state.todo_list
        },
    }
})

export default store;