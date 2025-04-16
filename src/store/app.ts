// Utilities
import { defineStore } from "pinia";
import { getRandomInArray, randomArrayUtil, getWebImg } from "@/utils/Index";
import Mock from "mockjs";
import { heros, metrics } from "@/mock";
import type { TEAM, VISUAL_ITEM } from "@/interface";

//首页状态管理
export const useTeamStore = defineStore("index", {
  state: () => ({
    metrics: metrics,
    heros: heros,
    team: [
      {
        player: {
          name: "TinyRed",
          img: getWebImg("4.png"),
          avatar: getWebImg("4.jpg"),
          description: "YQYMONsAD钙奶",
          tags: ["颜值担当", "输出稳健"],
        },
        pos: "ADC",
      },
      {
        player: {
          name: "HyBarain",
          avatar: getWebImg("2.jpg"),
          img: getWebImg("2.png"),
          description: "YQYMONs打野",
          tags: ["节奏大师", "野区主宰"],
        },
        pos: "JUG",
      },
      {
        player: {
          name: "Nirvazure",
          avatar: getWebImg("3.jpg"),
          img: getWebImg("3.png"),
          description: "YQYMONs中单",
          tags: ["团队大脑", "AP法王"],
        },
        pos: "MID",
      },
      {
        player: {
          name: "SandM影",
          avatar: getWebImg("1.jpg"),
          img: getWebImg("1.png"),
          description: "YQYMONs上单",
          tags: ["上单霸主", "单打之王"],
        },
        pos: "TOP",
      },
      {
        player: {
          name: "Uncle",
          avatar: getWebImg("5.jpg"),
          img: getWebImg("5.png"),
          description: "YQYMONs辅助",
          tags: ["开团机器", "团队之盾"],
        },
        pos: "SUP",
      },
    ] as Array<TEAM>,
  }),
  actions: {
    shuffler() {
      this.team = randomArrayUtil(this.team, 5);
      this.team.map((item: TEAM) => (item.hero = getRandomInArray(this.heros)));
      this.metrics = this.metrics.map((item: VISUAL_ITEM) => {
        item.value = Mock.Random.integer(0, 100);
        return item;
      });
    },
  },
});
