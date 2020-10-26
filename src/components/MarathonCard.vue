<template>
  <div class="stop_card"  :class="{active:active_card==item_index,out:active_card!=-1&&active_card!=item_index}">
    <h2 class="stop_card_title">
      {{ name }}
    </h2>
    <div class="stop_card_body">
      <div class="record_header">
        <div
          class="num_circle"
          :class="{ active: CardOpen }"
          @click="ActiveCard(item_index)"
        >
          <h3 class="stop_num" :class="{active:value==100}">{{ Math.floor(value) }}<span>%</span></h3>
          <!-- 進度條開始 -->
          <svg v-bind:width="width" v-bind:height="height">
            <linearGradient id="linear" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#2ed8a7" />
              <stop offset="100%" stop-color="#a6ceff" />
            </linearGradient>
            <circle
              class="circle_progressbar_1"
              :class="{ active: animation }"
              cx="150"
              cy="150"
              r="100"
              stroke="white"
              stroke-linecap="round"
              stroke-width="3"
              fill="none"
            />
            <circle
              class="circle_progressbar_2"
              :class="{ active: animation }"
              cx="150"
              cy="150"
              r="100"
              stroke="white"
              stroke-linecap="round"
              stroke-width="3"
              fill="none"
            />
            <circle
              class="circle_progressbar_3"
              :class="{ active: animation }"
              cx="150"
              cy="150"
              r="100"
              stroke="white"
              stroke-linecap="round"
              stroke-width="3"
              fill="none"
            />
            <circle
              cx="150"
              cy="150"
              r="100"
              stroke="#182c3d"
              stroke-linecap="round"
              stroke-width="10"
              fill="none"
            />

            <circle
              v-bind:cx="width / 2"
              v-bind:cy="height / 2"
              v-bind:r="radius"
              stroke="url(#linear)"
              stroke-linecap="round"
              stroke-width="10"
              fill="transparent"
              v-bind:stroke-dasharray="strokeDashArray"
              v-bind:stroke-dashoffset="strokeDashArray * (1 - value / 100)"
            />
          </svg>
          <!-- 進度條結束 -->
          <div class="success" :class="{active:value==100}"></div>
        </div>
        <button @click="$emit('close-card')" class="return_btn">
          返回
        </button>
      </div>

      <ol class="record_list" :class="{active:active_card==item_index}">
       <transition-group name="list" tag="p">
        <template  v-for="(item,item_index) in record_list" v-bind:key="'record_'+item_index">
        <li class="record_listItem" :class="{active:item_index == 0}">
          <div class="record_listItem_box">
            <span class="record_listItem_id">{{item.id}}</span>
            <span class="record_listItem_name">{{item.title}}</span>
          </div>
          <span class="record_listItem_time">{{this.MMSS(item.timestamp)}}</span>
        </li>
        </template>
        </transition-group>
      </ol>
    </div>
  </div>
</template>


<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Emit, Watch, Prop } from "vue-property-decorator";

@Options({
  emits: { 
    'active-card': { required: false },
    'close-card': { required: false }
  }
})
export default class ProgressBar extends Vue {
  //從父元件接收的參數
  @Prop() name!: String ;
  @Prop() width: number = 50;
  @Prop() height: number = 50;
  @Prop() value: number = 60;
  @Prop() item_index: number = -1;
  @Prop() record_list!: Array<any>
  @Prop() active_card!: number

  //動畫狀態與卡片開啟狀態
  animation: boolean = true;
  CardOpen: boolean = false;  

  //計算進度條圓圈大小
  private get radius(): number {
    return Math.min(this.width, this.height) / 3;
  }
  //計算進度條
  private get strokeDashArray(): number {
    return this.radius * 2 * Math.PI;
  }

  //數值更動時撥放動畫，0.6秒後還原狀態
  @Watch("value")
  public trigger(newValue: number, oldValue: number): void {
    if (newValue != oldValue) {
      this.animation = true;
      setTimeout(() => {
        this.animation = false;
      }, 600);
    } else {
      this.animation = false;
    }
  }

  //分秒轉換
  private MMSS(t:string): string {
    return (
      (t.split(":")[0].length < 2 ? "0" : "") + t.split(":")[0] + ":"+
      (t.split(":")[1].length < 2 ? "0" : "") + t.split(":")[1] 
    );
  }
  //打開此卡片
  @Emit()
  ActiveCard() {
    return this.item_index;
  }
}
</script>

<style src="@/assets/circle_animation.css"></style>
