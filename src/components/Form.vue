<!-- 
TODO:
  - sanitize input
-->


<template>

  <b-container>
    <b-row align-h="center">
      <b-col cols="12" md="10" xl="7">
        <h1 class="text-secondary text-center">Snippet<span class="text-white">S</span>earch</h1>
        <b-form v-on:submit.prevent="onSubmit">
          <b-form-input
            id="search_form"
            ref="input"
            class="text-center text-primary background-white"
            v-model="query"
            type="text"
            :placeholder="placeholder" 
            autocomplete="off"
            >
          </b-form-input>
      </b-form>

      </b-col>

    </b-row>
  </b-container>
  

</template>

<script>

  export default {
    name: "Form",
    data() {
        return {
            placeholder: 'Let\'s find some code :)',
            query: ''
        }
    },
     mounted() {
      this.focusInput();
    },
    methods: {
       onSubmit: function(){
        this.$emit('onSubmit', this.query)

        // I think this is UX friendly
        this.placeholder = this.query 
        this.query = ""

       },
       focusInput() {
        this.$refs.input.$el.focus();
      }
    }

  }
</script>

<style scoped lang="scss">
  h1{
    font-family: 'Syncopate', sans-serif;
    margin-top: 10rem;
  }
  #search_form{
    margin-top: 2rem;
    margin-bottom: 5rem;
    font-size: 1.2rem;
    padding: 1.4rem;
    border-radius: 3rem;

    
  }
</style>
