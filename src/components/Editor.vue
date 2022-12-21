<script setup>
import { TrashIcon } from "@heroicons/vue/24/outline";
</script>

<template>
  <div class="p-5 w-full">
    <div class="flex flex-col space-y-5" v-if="editStatus">
      <div class="flex flex-row-reverse">
        <div class="w-fit">
          <button @click="deleteTodo">
            <TrashIcon class="w-6 h-6" />
          </button>
        </div>
      </div>
      <div class="w-full">
        <input class="bg-disable w-full rounded-lg py-2 px-3" v-model="title" />
      </div>
      <div class="grid grid-cols-3 gap-x-5 h-40">
        <div class="col-span-2">
          <textarea
            class="
              bg-disable
              w-full
              rounded-lg
              py-2
              px-3
              h-40
              min-h-full
              max-h-40
              place-self-stretch
            "
            v-model="content"
          />
        </div>
        <div>
          <img class="w-full h-40 bg-disable rounded-lg" :src="img" />
        </div>
      </div>
      <div class="grid grid-cols-12 gap-x-1">
        <div class="col-span-3">
          <input type="date" />
        </div>
        <div class="col-span-2">
          <span>~</span>
        </div>
        <div class="col-span-3">
          <input type="date" />
        </div>
        <div class="col-span-4">
          <button>Upload Image</button>
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
      // title: "abceee",
      // content: "",
      date_start: "",
      date_end: "",
      img: "",
    };
  },
  methods: {
    deleteTodo() {
      this.$store.commit("deleteTodo");
    },
  },
  computed: {
    title: {
      get() {
        return this.$store.getters.getCurrentTitle;
      },
      set(context) {
        this.$store.commit("updateCurrentTitle", context);
      },
    },
    content: {
      get() {
        return this.$store.getters.getCurrentContent;
      },
      set(context) {
        this.$store.commit("updateCurrentContent", context);
      },
    },
    img: {
      get() {
        return this.$store.getters.getCurrentImg;
      },
      set(context) {
        this.$store.commit("updateCurrentImg", context);
      },
    },
    editStatus() {
      return this.$store.getters.editable;
    },
  },
};
</script>