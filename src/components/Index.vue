<template>
    <section class="section">
        
        <div class="content">
            <div class="columns is-mobile" v-if="emptyRecord">
                <div class="column is-half is-offset-one-quarter center">
                    <i class="fa fa-5 fa-file-image-o empty"></i>
                    <h1 class="empty">Empty</h1>
                    <p class="empty">
                        Tap <i class="fa fa-plus"></i> to add one
                    </p>
                </div>
            </div>
        </div>
        
        <div class="tile is-ancestor" v-if="record.length">
            
            <div class="tile is-4" v-for="(data, index) in record">
                <div class="tile is-parent" v-if="!data.deleted">
                    <article class="tile is-child notification is-info" @click="addTime(index)">
                        <a class="delete" @click.stop="deleteType(index)"></a>
                        <p class="title">
                            {{data.name}}
                        </p>
                        <p class="subtitle">
                            <span v-text="lastTime(data.data)"></span>
                            <br>
                            <span v-text="relativeTime(lastTime(data.data))"></span>
                            <router-link :to="{ name: 'Record', params: { id: index }}" @click.native.stop="" class="info">
                                <i class="fa fa-2x fa-info-circle"></i>
                            </router-link>
                        </p>
                    </article>
                </div>
            </div>
            
        </div>

        <button class="button is-rounded is-outlined is-large is-info add-type" @click="addType">
            <i class="fa fa-plus"></i>
        </button>
        
    </section>
</template>

<style scoped>
    .info {
        position: absolute;
        right: 0.5rem !important;
        bottom: 0.5rem !important;
    }
    .center {
        text-align: center;
    }
    .empty {
        color: #aaa;
    }
    .fa.fa-5 {
        font-size: 12em;
    }
    .add-type {
        position: absolute;
        bottom: 8%;
        right: 5%;
        border-radius: 50%;
    }
</style>

<script>
  import moment from 'moment';
  
  export default {
    name: 'Dashboard',
    computed: {
      record() {
        return this.$store.state.record;
      },
      emptyRecord() {
        return this.$store.getters.validRecords.length <= 0;
      },
    },
    methods: {
      lastTime(data) {
        if (data.length >= 1) {
          return Object.assign([], data).shift();
        }
        return 'empty record';
      },
      relativeTime(time) {
        return moment(time).fromNow();
      },
      addTime(index) {
        this.$store.commit('addTime', index);
      },
      addType() {
        const app = this;
        this.$dialog.prompt({
          message: 'Empty category name',
          inputAttrs: {
            placeholder: 'e.g. Take Medicine',
          },
          onConfirm(value) {
            app.$store.commit('addType', value);
          },
        });
      },
      deleteType(index) {
        const $this = this;
        this.$store.commit('deleteType', index);
        this.$snackbar.open({
          message: 'Deleted',
          actionText: 'Undo',
          queue: false,
          onAction() {
            $this.$store.commit('recoveryType', index);
          },
        });
      },
    },
  };
</script>
