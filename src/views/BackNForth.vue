<template >
  <div id="RecordBody">
    <NewRecordMsg
      :name="new_record[0]"
      :stop="new_record[1]"
      :active="new_record[2]"
    />
    <BackNForthCard
      v-for="(checkpoint, checkpoint_index) in checkpoints"
      ref="item"
      v-bind:key="checkpoint"
      :record_list="
        record_list.filter((item) => {
          return item.checkpoint_id == checkpoint.checkpoint_id;
        })
      "
      :name="checkpoint.name"
      :item_index="checkpoint_index"
      :width="300"
      :height="300"
      :text="String(checkpoint.passed)"
      :value="(checkpoint.passed / checkpoint.total) * 100"
      :active_card="active_card"
      v-on:active-card="ActiveCard"
      v-on:close-card="CloseCard"
    />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import BackNForthCard from "../components/BackNForthCard.vue";
import NewRecordMsg from "../components/NewRecordMsg.vue";

interface Checkpoint {
  id: number;
  passed: number;
  total: number;
}

interface RecordList {
  id: number;
  title: string;
  timestamp: string;
  checkpoint_id: number;
}

@Options({
  props: {
    //父元件傳入的參數
    checkpoints: Array,
    record_list: Array,
    Status: Array,
  },
  components: {
    //本程式使用的元件
    BackNForthCard,
    NewRecordMsg,
  },
  watch: {
    record_list(NewVal: Array<RecordList>, OldVal: Array<RecordList>) {
      //通過檢查站的參賽者資料變動
      if (this.record_list.length != 0 && NewVal.length != OldVal.length) {
        //最新一筆資料
        let last_record = this.record_list[this.record_list.length - 1];
        //檢查站名稱
        let stop = this.checkpoints.filter((item: any) => {
          return item.checkpoint_id == last_record.checkpoint_id;
        })[0].name;
        //關閉訊息顯示
        this.new_record[2] = false;
        //更新訊息顯示資訊
        this.new_record = [last_record.title, stop, true];
        //五秒後關閉訊息
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          this.new_record[2] = false;
          this.timeout = undefined;
        }, 5000);
      }
    },
  },
})

export default class BackNForth extends Vue {
  active_card: number = -1; //要展開哪一張資料卡，預設-1為全部不展開。
  new_record: Array<any> = ["", "", false]; //NewRecordMsg使用的資料，[通過人員姓名,通過檢查站姓名,是否顯示]
  timeout: number | undefined = undefined; //用於計算NewRecordMsg顯示五秒後關閉

  ActiveCard(card_num: any) {
     //展開指定的資料卡
    console.log(card_num);
    this.active_card = card_num;
    return true;
  }
  CloseCard() {
     //關閉所有資料卡
    this.active_card = -1;
    return true;
  }
  mounted(){
    document.title = "折返跑計時"
  }
}
</script>

