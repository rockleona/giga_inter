<script setup>
import { TrashIcon, Bars3Icon } from "@heroicons/vue/24/outline";
</script>

<template>
  <div class="p-5 w-full">
    <div class="flex flex-col space-y-5">
      <div class="flex place-content-between">
        <div class="w-fit md:invisible">
          <button @click="toggleMenu">
            <Bars3Icon class="w-6 h-6" />
          </button>
        </div>
        <div class="w-fit">
          <button @click="deleteTodo" v-if="editStatus">
            <TrashIcon class="w-6 h-6" />
          </button>
        </div>
      </div>
      <div class="w-full" v-if="editStatus">
        <input class="bg-disable w-full rounded-lg py-2 px-3" v-model="title" />
      </div>
      <div
        class="grid grid-cols-1 md:grid-cols-3 w-full md:gap-x-5 gap-y-3 md:gap-y-0"
        v-if="editStatus"
      >
        <div class="md:col-span-2 grid grid-rows-3 gap-y-5 w-full">
          <div class="row-span-2 w-full relative">
            <textarea
              class="bg-disable w-full rounded-lg py-2 px-3 h-40 min-h-full max-h-40 place-self-stretch"
              :maxlength="maxWords"
              v-model="content"
            />
            <label class="absolute bottom-3 right-3 font-light">
              {{ content.length }} / {{ maxWords }}
            </label>
          </div>
          <div class="flex items-center">
            <input
              class="w-full h-full bg-disable text-center px-2 py-1 md:py-3 rounded-lg"
              type="date"
              v-model="date_start"
            />
            <p class="mx-2 md:m-5 text-center text-lg">~</p>
            <input
              class="w-full h-full bg-disable text-center px-2 py-1 md:py-3 rounded-lg"
              type="date"
              v-model="date_end"
              :min="minDate"
            />
          </div>
        </div>
        <div class="grid grid-rows-3 gap-y-5" v-if="editStatus">
          <div class="row-span-2 relative w-full rounded-lg bg-disable">
            <h1
              class="w-full text-center font-bold text-lg absolute top-1/2 -translate-y-1/2"
              v-if="img == ''"
            >
              Img Viewer
            </h1>
            <img class="w-full h-40 rounded-lg" v-else :src="img" />
          </div>
          <div>
            <button
              @click="clickUpload"
              class="w-full h-full rounded-lg bg-main font-semibold text-center py-2 px-3"
            >
              Upload Image
            </button>
            <input type="file" class="hidden" ref="img_uploader" @change="readFile" />
          </div>
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
      maxWords: 200,
    };
  },
  methods: {
    toggleMenu() {
      this.$store.commit("openMenu");
    },
    deleteTodo() {
      this.$store.commit("deleteTodo");
    },
    clickUpload() {
      this.$refs.img_uploader.click();
    },
    readFile() {
      const file = this.$refs.img_uploader.files[0];
      const reader = new FileReader();

      let rawImg;
      reader.onloadend = () => {
        rawImg = reader.result;
        this.img = rawImg;
      };
      reader.readAsDataURL(file);
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
    date_start: {
      get() {
        return this.$store.getters.getCurrentDateStart;
      },
      set(context) {
        this.$store.commit("updateCurrentDateStart", context);
      },
    },
    date_end: {
      get() {
        return this.$store.getters.getCurrentDateEnd;
      },
      set(context) {
        const date_start = this.$store.getters.getCurrentDateStart;
        const parse_start = new Date(date_start);
        const parse_end = new Date(context);

        if (parse_start < parse_end) {
          this.$store.commit("updateCurrentDateEnd", context);
        }
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
    minDate() {
      const date_start = this.$store.getters.getCurrentDateStart;
      if (date_start !== "") {
        let parse_start = new Date(date_start);
        const min_date = new Date(parse_start.setDate(parse_start.getDate() + 1));
        return min_date.toISOString().split("T")[0];
      }
      return "";
    },
  },
};
</script>
