<template>
  <div id="TimeHeader">
    00<span class="flash_dot">:</span>{{ MM }}<span class="flash_dot">:</span
    >{{ SS }}
  </div>
</template>



<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  props: {
    time: String,
  },
})
export default class Timer extends Vue {
  time: string = "00:00";
  private get MM(): string {
    return (
      (this.time.split(":")[0].length < 2 ? "0" : "") + this.time.split(":")[0]
    );
  }

  private get SS(): string {
    return (
      (this.time.split(":")[1].length < 2 ? "0" : "") + this.time.split(":")[1]
    );
  }
}
</script>