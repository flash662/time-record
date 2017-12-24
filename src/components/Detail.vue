<template>

  <section class="section">
    <div class="container">

      <div class="columns is-mobile">
        <div class="column is-3">
          <router-link :to="{name: 'Index'}" class="button is-outlined is-info is-large">
            <i class="fa fa-arrow-left"></i>
          </router-link>
        </div>
        <div class="column is-9">
          <b-input placeholder="Category" type="text" size="is-large" v-model="name"></b-input>
        </div>
      </div>

      <div class="columns">
        <div class="column">
          <table class="table is-striped is-fullwidth">
            <tr v-for="(value, index) in data">
              <td>
                <a class="delete" @click="remove(index)"></a>
              </td>
              <td v-text="value"></td>
            </tr>
          </table>
        </div>
      </div>

      <button class="button is-outlined is-info is-large" @click="addTime" style="border-radius: 50%; position:fixed; bottom: 10%; right: 5%;">
        <i class="fa fa-plus"></i>
      </button>

    </div>
  </section>

</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Index',
  computed: {
    ...mapState(['record']),
    data() {
      const id = this.$route.params.id;
      return this.record[id].data;
    },
    name: {
      get() {
        const id = this.$route.params.id;
        return this.record[id].name;
      },
      set(value) {
        const id = this.$route.params.id;
        this.$store.state.record[id].name = value;
        this.$store.dispatch('save');
      },
    },
  },
  methods: {
    addTime() {
      this.$store.commit('addTime', this.$route.params.id);
    },
    remove(index) {
      const id = this.$route.params.id;
      this.$store.commit('remove', id, index);
    },
  },
};
</script>