<template>
  <v-row class="fill-height" >
    <v-col>
      <VideoSelector
        :currentDate="focusedDate">
      </VideoSelector>
    </v-col>
    <v-col>
      <v-sheet height="64">
        <v-toolbar flat color="white">
          <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">
            Today
          </v-btn>
          <v-btn fab text small color="grey darken-2" @click="prev">
            <v-icon small>mdi-chevron-left</v-icon>
          </v-btn>
          <v-toolbar-title>{{ title }}</v-toolbar-title>
          <v-btn fab text small color="grey darken-2" @click="next">
            <v-icon small>mdi-chevron-right</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
        </v-toolbar>
      </v-sheet>

      <v-sheet height="500">
        <v-calendar
          class="custom-calendar"
          ref="calendar"
          color="primary"
          v-model="focusedDate"
          :event-color="getEventColor"
          :type="type"
          :now="veryOldDate"
          @click:day="viewDate"
          @change="updateRange"
        >
          <!-- Controls the content for the day number shown in each day -->
          <template v-slot:day-label="{ month, day, date }">
            <div v-if="month !== currentMonthAsNumber">
              <!--
                If this div doesn't get added (due to failing the v-if) then the default slot content will be used.
                We only provide a blank div when the day is not in the current month so that the date number isn't rendered.
              -->
            </div>
            <span
              v-else
              class="custom-calendar__day-label"
              :class="{ 'custom-calendar__day-label--is-selected': date === focusedDate }">
              {{day}}
            </span>
          </template>

          <!-- The content displayed below the date for each day-box on the calendar -->
          <template v-slot:day="{ month, day, date }">
            <div v-if="month !== currentMonthAsNumber"><!-- Don't put anything here for days outside of the month --></div>
            <PassVariables v-else :dateClipDetails="getDateClipDetails(day)">
              <div
                slot-scope="{ dateClipDetails }"
                class="custom-calendar__day-body"
                :class="{
                  'custom-calendar__day-body--has-clip': dateClipDetails,
                  'custom-calendar__day-body--is-selected': date === focusedDate
                }">
                <span v-if="!dateClipDetails">No Clip</span>
                <img
                  v-else
                  class="custom-calendar__day-body__image"
                  :src="dateClipDetails.image">
              </div>
            </PassVariables>
          </template>

        </v-calendar>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
  import format   from 'date-fns/format'
  import getDate  from 'date-fns/getDate'
  import parseISO from 'date-fns/parseISO'

  import VideoSelector from './VideoSelector'
  import PassVariables from './PassVariables'

  export default {
    components: {
      VideoSelector,
      PassVariables
    },
    data:() => ({
      console,
      focusedDate: '',
      type: 'month',
      start: null,
      end: null,
      dayClips: [ { day: 3, image: 'https://i.redd.it/q18vfzjgb5f21.jpg'} ]
    }),
    computed: {
      veryOldDate() {
        return format(new Date('1990-01-01'), 'yyyy-MM-dd')
      },
      title() {
        const { start, end } = this
        if (!start || !end) {
          return ''
        }

        const startMonth = this.monthFormatter(start)
        const startYear = start.year

        return `${startMonth} ${startYear}`
      },
      currentMonthAsNumber() {
        const date = new Date(`${this.focusedDate}T00:00:00`)
        return date.getMonth() + 1
      },
      monthFormatter() {
        return this.$refs.calendar.getFormatter({
          timeZone: 'UTC', month: 'long',
        })
      },
    },
    mounted() {
      this.$refs.calendar.checkChange()
    },
    methods: {
      getDateClipDetails(day, label) {
        return this.dayClips.find(dayDetails => dayDetails.day === day)
      },
      getEventColor (event) {
        return event.color
      },
      setToday() {
        this.focusedDate = new Date()
      },
      prev() {
        this.$refs.calendar.prev()
      },
      next() {
        this.$refs.calendar.next()
      },
      viewDate ({month, date}) {
        //Ignore click events on days that aren't part of the current month.
        if (month !== this.currentMonthAsNumber) {
          return
        }

        this.focusedDate = date
      },
      updateRange ({ start, end }) {
        this.focusedDate = start.date
        this.start = start
        this.end = end
      },
    },
  }
</script>

<style lang="stylus">
  .custom-calendar
    min-width 400px

    & .v-calendar-weekly__day
      display flex
      flex-direction column

    &__day-label
      font-size 13px
      font-weight 600
      text-align center
      display flex
      justify-content center
      border 1px solid transparent
      border-bottom none

      &--is-selected
        border-color black

    &__day-body
      flex 1
      display flex
      align-items center
      justify-content center
      text-align center
      font-style italic
      padding 4px
      overflow hidden
      cursor pointer
      font-size 13px
      background-color lightcoral
      border 1px solid transparent
      border-top none

      &__image
        height 100%
        width 100%
        object-fit contain

      &--is-selected
        border-color black

      &--has-clip
        background-color lightgreen

</style>