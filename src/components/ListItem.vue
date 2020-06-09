<template>
      <div class="section-snippet mt-5">
          <div v-for="(body, answer_id) in data.body" :key="answer_id"  @mouseover="show_copy_btn = answer_id" @mouseleave="show_copy_btn = -1" class="section-code">
            <pre v-highlightjs><code class="javascript">{{body}}</code></pre>
            
            <b-button v-if="show_copy_btn == answer_id" @click="copy(data.body[answer_id])" size="sm" variant="secondary" target="_blank" class="copy-btn ml-2">Copy</b-button>
          </div>
          <div class="section-link text-right">
            <b-button :href="data.link" size="sm" variant="secondary" target="_blank" class="ml-2">More info</b-button>
          </div>    
      </div>
  </template>

<script>

export default {  
  name: 'ListItem',
 
  data() {
      return {
          show_copy_btn: -1
      }
  },
  methods: {
    copy(text){
      this.$utilities.copyToClipboard(text)
    }
  },
  props: ['data']
}
</script>

<style scoped lang="scss">

  .section-snippet{
    .section-code{
      position: relative;
      pre{
        margin-bottom: 0.5rem;

        code{
          padding: 1.8rem;
        }
      }

      .copy-btn{
        position: absolute;
        top: 0;
        right: 0;
      }
      
    }
  }
</style>
