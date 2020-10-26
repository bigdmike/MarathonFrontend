<template>
  <div class="OptionBox" :class="{ active: OptionOpen }">
    <button @click="settings(false)" class="Close_btn">X</button>
    <div class="StopOption" :class="{ active: OptionMode == 'Stop' }">
      <h2>設定站數</h2>
      <div class="StopOptionCard">
        <label>設定檢查站數量</label>
        <input type="number" v-model="StopCount" />
      </div>
      <button @click="SetStopOption">下一步</button>
    </div>
    <div class="CountOption" :class="{ active: OptionMode == 'Count' }">
      <h2>設定通過次數</h2>
      <div class="StopCardBox">
        <div
          class="StopCard"
          v-for="(item, item_index) in StopData"
          v-bind:key="'stop_' + item_index"
        >
          <h4>第{{ ["一", "二", "三", "四", "五"][item_index] }}站</h4>
          <label>設定站名:</label>
          <input type="text" value="" @input="ChangeName(item_index, $event)" />
          <label>設定通過次數:</label>
          <input type="number" v-model="item.total" />
        </div>
      </div>
      <div class="button_box">
        <button @click="ChangeOptionMode('Stop')">上一步</button>
        <button @click="SendOption">送出設定</button>
      </div>
    </div>
  </div>
  <div class="button_box">
    <button @click="SendWsMsg('start')" v-show="!running">開始計時</button>
    <button @click="SendWsMsg('stop')" class="stop" v-show="running">
      停止計時
    </button>
    <button @click="SendWsMsg('clear')">清除資料</button>
    <button @click="settings(true)">設定</button>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";

export default class Controller extends Vue {
  //父元件傳入的參數
  @Prop() running!: boolean; //是否開始計時
  @Prop() record_list!: Array<any>; //檢查站通過紀錄
  @Prop() checkpoints!: Array<any>; //檢查站資訊
  @Prop() connect_ip!: String; //WebSocket連線IP

  private ws: WebSocket = new WebSocket(
    `ws://${this.connect_ip}/control/publish`
  );
  private OptionOpen: Boolean = false; //打開設定視窗
  private OptionMode: String = "Stop"; //目前設定模式
  private StopCount: Number = 1; //檢查站數量，最小為1
  StopData: Array<any> = []; //檢查站資訊

  SendWsMsg(msg: string) {
    //傳送指定的字串給WebSocket
    //start為開始計時，stop為停止計時，clear為清除資料
    this.ws.send(JSON.stringify({ action: msg }));
  }

  settings(action: boolean) {
    //打開設定視窗
    this.OptionOpen = action;
    if (action == false) {
      this.StopCount = 1;
      this.StopData = [];
      this.ChangeOptionMode("Stop");
    }
  }

  ChangeOptionMode(mode: string) {
    //更改設定模式
    this.OptionMode = mode;
  }

  ChangeName(item_num: number, $event: any) {
    //更新檢查站名稱
    this.StopData[item_num].name = $event.target.value;
  }

  SetStopOption() {
    //初始化檢查站資訊
    this.StopData = [];
    for (let i = 0; i < this.StopCount; i++) {
      this.StopData.push({ name: "", total: 1 });
    }
    this.ChangeOptionMode("Count");
  }

  SendOption() {
    //送出設定
    this.StopData.forEach((item) => {
      item.total = parseInt(item.total);
    });
    let data = {
      action: "set",
      data: this.StopData,
    };
    this.ws.send(JSON.stringify(data));
    this.settings(false);
  }

  mounted() {
    document.title = "計時器設定";
  }
}
</script>