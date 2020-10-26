<template>
    <div class="new_record_msg" :class="{active:active}">
      {{name}} 已抵達 {{stop}}
    </div>
</template>


<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  props: {
    name: String,
    stop: String,
    active: Boolean,
  },
})
export default class NewRecordMsg extends Vue {
  
}
</script>