<template>
    <section class="section">
        
        <div class="content">
            <div class="columns is-mobile" v-if="record.length <= 0">
                <div class="column is-half is-offset-one-quarter">
                    <i class="fa fa-5 fa-file-image-o empty"></i>
                    <h1 class="empty center">Empty</h1>
                    <p class="empty center">
                        Tap <i class="fa fa-plus"></i> to add one
                    </p>
                </div>
            </div>
        </div>
        
        <div class="tile is-ancestor" v-if="record.length">
            
            <div class="tile is-3" v-for="(data, index) in record">
                <div class="tile is-parent">
                    <article class="tile is-child notification is-info" @click="addTime(index)">
                        <a class="delete" @click.stop="$parent.deleteType(index)"></a>
                        <p class="title">
                            {{data.name}}
                        </p>
                        <p class="subtitle">
                            {{ lastTime(data.data) }}
                            <router-link :to="{ name: 'Record', params: { id: index }}" @click.native.stop="" class="info">
                                <i class="fa fa-2x fa-info-circle"></i>
                            </router-link>
                        </p>
                    </article>
                </div>
            </div>
        </div>

        <nav class="navbar is-fixed-bottom has-shadow">
            <div class="navbar-brand">
                <div class="navbar-item" href="#" @click.prevent="addType">
                    <button class="button is-primary">
                        <i class="fa fa-plus"></i>
                    </button>
                </div>
            </div>

        </nav>
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
</style>

<script>
  export default {
    name: 'Dashboard',
    computed: {
      record() {
        return this.$store.state.record;
      },
    },
    methods: {
      lastTime(data) {
        if (data.length >= 1) {
          return Object.assign([], data).shift();
        }
        return 'empty record';
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
    },
  };
</script>
