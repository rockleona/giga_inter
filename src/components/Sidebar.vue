<script setup>
import { CheckCircleIcon, XMarkIcon } from "@heroicons/vue/24/solid";
</script>

<template>
  <div
    class="w-full md:w-80 md:block bg-black/60"
    :class="{
      hidden: !mobileMenuStatus,
      absolute: mobileMenuStatus,
      'left-0': mobileMenuStatus,
      'z-10': mobileMenuStatus,
    }"
  >
    <div
      class="w-72 md:w-80 md:block bg-secondary"
      :class="{
        hidden: !mobileMenuStatus,
        'z-20': mobileMenuStatus,
      }"
    >
      <div class="w-full h-screen">
        <div class="p-3 md:p-5 flex place-content-between">
          <h1 class="text-lg md:text-2xl font-bold">Demo Todo List</h1>
          <button @click="closeMenu" class="md:hidden">
            <XMarkIcon class="w-5 h-5" />
          </button>
        </div>
        <div class="py-2 px-5" v-if="todoCount > 0">
          <div class="grid grid-col-1 gap-y-2 md:gap-y-3">
            <div
              v-for="(item, i) in getTodoList"
              :key="'item' + i"
              @click="() => changeTodo(i)"
              class="px-3 py-2 md:py-3 bg-primary flex items-center"
            >
              <span class="w-full">{{ item.title }}</span>
              <div>
                <CheckCircleIcon v-if="currentIndex === i" class="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>
        <div class="p-3 md:p-5">
          <button
            @click="addTodo"
            class="bg-main text-center rounded-lg font-semibold w-full py-1"
            :class="{
              'text-disable': !this.addStatus,
            }"
          >
            Add Item
          </button>
        </div>
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
      return this.$store.getters.getTodoLength;
    },
    getTodoList() {
      return this.$store.getters.getTodoList;
    },
    addStatus() {
      return this.todoCount < this.maxTodoLength;
    },
    currentIndex() {
      return this.$store.state.cur_position;
    },
    mobileMenuStatus() {
      return this.$store.getters.getMenuStatus;
    },
  },
  methods: {
    addTodo() {
      if (this.addStatus) {
        this.$store.commit("addTodo");
      }
    },
    changeTodo(index) {
      this.$store.commit("setPosition", index);
    },
    closeMenu() {
      this.$store.commit("closeMenu");
    },
  },
};
</script>
