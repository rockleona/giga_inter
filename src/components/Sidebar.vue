<template>
  <div class="w-80 bg-secondary">
    <div class="w-full h-screen">
      <div class="p-5">
        <h1 class="text-2xl font-bold">Demo Todo List</h1>
      </div>
      <div class="py-2 px-5" v-if="todoCount > 0">
        <div class="grid grid-col-1 gap-y-3">
          <div
            v-for="(item, i) in getTodoList"
            :key="'item' + i"
            class="p-3 bg-primary"
          >
            <span>Hello</span>
          </div>
        </div>
      </div>
      <div class="p-5">
        <button
          @click="addTodo"
          class="bg-main text-center rounded-lg font-semibold w-full py-1"
          :class="{
            'text-disable' : !this.addStatus
          }"
        >
          Add Item
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup() {},
  data() {
    return {
      maxTodoLength: 10,
    };
  },
  computed: {
    todoCount() {
      console.log(this.$store.getters.getTodoLength);
      return this.$store.getters.getTodoLength;
    },
    getTodoList() {
      return this.$store.getters.getTodoList;
    },
    addStatus() {
      return this.todoCount < this.maxTodoLength;
    },
  },
  methods: {
    addTodo() {
      if (this.addStatus) {
        this.$store.commit("addTodo");
      }
    },
  },
};
</script>