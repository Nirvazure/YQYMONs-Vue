<template>
  <v-container>
    <v-row justify="center">
      <v-hover v-for="(v, i) in team" :key="i">
        <template v-slot:default="{ isHovering, props }">
          <v-card
            v-bind="props"
            class="d-md-flex ma-2"
            :elevation="isHovering ? 24 : 6"
            :class="{ 'animate__animated animate__pulse': isHovering }"
            :width="cardWidth"
            @click="$router.push({ name: 'Member', params: { name: v.name } })"
          >
            <v-img :src="v.player.avatar" cover :aspect-ratio="playerRatio">
              <div class="d-felx"></div>
              <v-card-title class="d-flex align-self-start">{{
                v.pos
              }}</v-card-title>
              <v-row class="d-flex align-self-end mb-4 mr-4" justify="end">
                <v-avatar
                  right
                  :size="heroAvatarSize"
                  border="warning lg"
                  class="d-flex justify-end"
                >
                  <v-img
                    aspect-ratio="1"
                    :src="getHeroImg(v.hero?.ename)"
                  ></v-img>
                </v-avatar>
              </v-row>
              <v-fade-transition>
                <v-overlay v-if="isHovering">
                  <template #activator="{ props }">
                    <h2 class="text-center text-white" v-bind="props">
                      {{ v.player.name }}
                    </h2>
                  </template>
                </v-overlay>
              </v-fade-transition>
            </v-img>
          </v-card>
        </template>
      </v-hover>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useDisplay } from "vuetify";
const props = defineProps(["team"]);

const { name } = useDisplay();
//选手卡片响应式宽度
const cardWidth = computed(() => {
  switch (name.value) {
    case "xs":
      return 400;
    case "sm":
      return 140;
    case "md":
      return 160;
    case "lg":
      return 200;
    case "xl":
      return 300;
    default:
      return 200;
  }
});
//选手卡片图响应式比率
const playerRatio = computed(() => {
  switch (name.value) {
    case "xs":
      return "1.8";
    case "sm":
      return "1";
    case "md":
      return "0.5";
    case "lg":
      return "0.6";
    case "xl":
      return "0.7";
    default:
      return 0.5;
  }
});
//英雄头像响应式尺寸
const heroAvatarSize = computed(() => {
  switch (name.value) {
    case "xs":
      return 90;
    case "sm":
      return 40;
    case "md":
      return 60;
    case "lg":
      return 80;
    case "xl":
      return 90;
    default:
      return 90;
  }
});

const getHeroImg = (ename: string) => {
  return (
    "https://game.gtimg.cn/images/yxzj/img201606/heroimg/" +
    ename +
    "/" +
    ename +
    ".jpg"
  );
};
</script>
