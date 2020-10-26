<template>
  <Timer :time="time" />
  <router-view
    :checkpoints="checkpoints"
    :record_list="record_list"
    :connect_ip="connect_ip"
    :running="start"
  />
</template>


<script lang="ts">
import { Options, Vue } from "vue-class-component";
import axios from "axios";
import Timer from "./components/Timer.vue";

interface Checkpoint {
  id: number;
  passed: number;
  total: number;
  name: string;
}

interface RecordList {
  id: number;
  title: string;
  timestamp: string;
  checkpoint_id: number;
}

interface Status {
  time: string;
  start: boolean;
  checkpoints: Array<Checkpoint>;
}

@Options({
  components: {
    Timer,
  },
})
export default class App extends Vue {
  private checkpoints: Array<Checkpoint> = []; //檢查點資訊
  private time: string = "00:00"; //計時時間
  private record_list: Array<RecordList> = []; //檢查站紀錄
  private start: boolean = false; //是否開始計時
  private connect_ip: String = "172.94.78.42:9002"; //WebSocket連線IP

  private ws: WebSocket = new WebSocket(
    `ws://${this.connect_ip}/status/subscribe`
  );

  mounted() {
    this.ws.onmessage = (msg) => {
      //撈API取得通過檢查點的參賽者資訊
      axios.get("/dashboard").then((response) => {
        if (response.data.length != 0) {
          this.record_list = JSON.parse(
            `[${response.data.slice(0, response.data.length - 2)}]`
          ) as Array<RecordList>;
        } else {
          this.record_list = [];
        }
      });

      const newdata = JSON.parse(msg.data) as Status; //收到的新資料
      this.start = newdata.start; //是否已開始計時
      this.time = newdata.time; //計時時間

      //更新檢查站資料
      if (
        this.checkpoints.length > 0 &&
        this.checkpoints.length === newdata.checkpoints.length
      ) {
        for (let i = 0; i < newdata.checkpoints.length; i++) {
          Object.assign(this.checkpoints[i], newdata.checkpoints[i]);
        }
      } else {
        this.checkpoints = newdata.checkpoints;
      }
    };
  }
}
</script>


<style src="@/assets/style.css"></style>