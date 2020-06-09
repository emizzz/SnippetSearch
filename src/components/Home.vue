<template>
  <div>
    <!--<Header />-->
    <b-container class="mb-5">

      <Form @onSubmit="onSubmit"/>
  
          <transition name="fade">
              <div v-if="items.length">
                <div v-for="(item, answer_id) in items" :key="answer_id">
                  <ListItem v-bind:data="item" />
                </div>
              </div>
  
          </transition>

      
      <div v-if="waiting">
        <div class="spinner">
          <b-spinner type="grow" variant="secondary" label="Spinning"></b-spinner>
        </div>
      </div>
      

      <Footer />

    </b-container>
  </div>
</template>

<script>
import Form from './Form.vue';
import ListItem from './ListItem.vue';
import Footer from './Footer.vue';

export default {
  name: 'Home',
  components: {
    Form,
    ListItem,
    Footer
  },
  data() {
      return {
          items: [],
          waiting: false
      }
  },
  
  methods: {
    onSubmit: async function (query) {

      try{
        this.items = []
        this.waiting = true;
        this.items = query !== "" ? await this.$api.search(query) : []
        
        if(this.items.length > 0){
          this.items.forEach( item => item.body = this.$utilities.parse_useful_code(item.body) );
          this.items = this.items.filter(function (item) { return item.body.length > 0 });
        }
        else{
          this.$store.dispatch('notify', 'Nothing found :(')
        }

        this.waiting = false;
      }
      catch(err){
        this.$store.dispatch('notify', 'Failed to fetch resources :(')
        console.error("failed to fetch resources' " + err.message)
      }
    

    }
  }
}
</script>

<style scoped lang="scss">
  .spinner{
    position: fixed;
    top:50%;
    left:50%;
    transform: translate(-50%, -50%);
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
