<template>
  <q-page>
    <div class="row q-px-xl">
      <div class="row col-6">
        <!-- Name -->
          <q-field
            class="row col-12 q-mt-md"
            :label="$q.platform.is.mobile ? null : `${nameLabel}:`"
            :error="$v.form.name.$error"
            :error-label="nameError"
          >
            <q-input
              v-model.trim="form.name"
              :float-label="nameLabel"
            />
          </q-field>
        <!-- End name -->

        <!-- Genre -->
          <q-field
            class="row col-12 q-mt-md"
            :label="$q.platform.is.mobile ? null : `${genreLabel}:`"
            :error="$v.form.genre.$error"
            :error-label="genreError"
          >
            <q-input
              v-model.trim="form.genre"
              :float-label="genreLabel"
            />
          </q-field>
        <!-- End genre -->

        <!-- Author -->
          <q-field
            class="row col-12 q-mt-md"
            :label="$q.platform.is.mobile ? null : `${authorLabel}:`"
            :error="$v.form.authorId.$error"
            :error-label="authorError"
          >
            <q-select
              v-model="form.authorId"
              :options="authorOptions"

              :float-label="authorLabel"
            />
          </q-field>
        <!-- End author -->

        <!-- Save -->
        <div class="row col-12 q-mt-xl justify-end">
          <q-btn @click="onSubmit" color="primary">Submit</q-btn>
        </div>
        <!-- End save -->
      </div>

      <ul class="col-12">
        <li v-for="(book, index) in books" :key="index">
          {{book.name}}
        </li>
      </ul>
    </div>
  </q-page>
</template>

<style>
</style>

<script>
import { mapState } from 'vuex'
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'PageIndex',

  data () {
    return {
      nameLabel: 'Name',
      genreLabel: 'Genre',
      authorLabel: 'Author',

      form: {
        name: '',
        genre: '',
        authorId: ''
      }
    }
  },

  computed: {
    ...mapState('bookStore', ['books']),
    ...mapState('authorStore', ['authors']),

    authorOptions () {
      return this.authors.map((author) => {
        return { label: author.name, value: author.id }
      })
    },

    nameError () {
      return this.$displayError(this.nameLabel, this.$v.form.name)
    },

    genreError () {
      return this.$displayError(this.genreLabel, this.$v.form.genre)
    },

    authorError () {
      return this.$displayError(this.authorLabel, this.$v.form.authorId)
    }
  },

  beforeCreate () {
    // this.$store.dispatch('fetchBook', '5b5a7c39d7f8c85fba200d21')
    this.$store.dispatch('bookStore/fetchBooks')
    this.$store.dispatch('authorStore/fetchAuthors')
  },

  methods: {
    async onSubmit () {
      this.$v.form.$touch()

      if (this.$v.form.$error) {
        return
      }

      try {
        await this.$store.dispatch('bookStore/addBook', this.form)
        await this.$store.dispatch('bookStore/fetchBooks')
      } catch (error) {
        console.log(error)
      }
    }
  },

  validations: {
    form: {
      name: { required },
      genre: { required },
      authorId: { required }
    }
  }
}
</script>
