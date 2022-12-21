import { createStore } from 'vuex'

const store = createStore({
    state() {
        return {
            cur_position: null,
            cur_todo: {},
            todo_list: [],
        }
    },
    mutations: {
        setPosition(state, position) {
            state.cur_position = position;
            state.cur_todo = state.todo_list[state.cur_position];
        },
        addTodo(state) {
            state.todo_list.push(
                {
                    title: "New Item Title",
                    content: "",
                    date_start: "",
                    date_end: "",
                    img: ""
                }
            );
            state.cur_position = state.todo_list.length - 1;
            state.cur_todo = state.todo_list[state.cur_position];
        },
        deleteTodo(state) {
            state.todo_list.splice(state.cur_position, 1);
            state.cur_todo = {};
            state.cur_position = null;
        },
        updateTodo(state) {
            state.todo_list[cur_position] = state.cur_todo;
        },
        updateCurrentTitle(state, content) {
            state.cur_todo['title'] = content;
        },
        updateCurrentContent(state, content) {
            state.cur_todo['content'] = content;
        },
        updateCurrentDateStart(state, content) {
            state.cur_todo['date_start'] = content;
        },
        updateCurrentDateEnd(state, content) {
            state.cur_todo['date_end'] = content;
        },
        updateCurrentImg(state, content) {
            state.cur_todo['img'] = content;
        },
    },
    getters: {
        getTodoLength(state) {
            return state.todo_list.length
        },
        getTodoList(state) {
            return state.todo_list
        },
        getCurrentTitle(state) {
            return state.cur_todo["title"]
        },
        getCurrentContent(state) {
            return state.cur_todo["content"]
        },
        getCurrentDateStart(state) {
            return state.cur_todo["date_start"]
        },
        getCurrentDateEnd(state) {
            return state.cur_todo["date_end"]
        },
        getCurrentImg(state) {
            return state.cur_todo["img"]
        },
        editable(state) {
            return state.cur_position !== null
        }
    },
    strict: true,
})

export default store;