<template>
  <div>
    <div class="video-selector__title">Preview Video - {{formattedDate}}</div>
    <video
      class="video-selector__video-preview"
      controls="false"
      id="video">
      <!-- <source src="/srcVideo/VID_20200308_165429.mp4" type="video/mp4"> -->
    </video>
  </div>
</template>

<script>
  import moment from 'moment'

  export default {
    props: {
      currentDate: {
        type: String,
        required: true
      }
    },
    data() {
      return {

      }
    },
    computed: {
      formattedDate() {
        if (!this.currentDate) {
          return 'No Date Selected'
        }

        return moment(this.currentDate).format('MMMM DD, yyyy')
      }
    }
  }
</script>

<style lang="stylus">
  .video-selector__title
    margin 25px 0 10px
    font-size 20px

  .video-selector__video-preview
    width 100%
    min-width 400px
</style>