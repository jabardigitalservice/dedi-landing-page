<template>
  <div class="partner">
    <div class="partner__joined">
      <div class="partner__joined-sum">
        Total <strong>{{ totalPartner }}</strong> Mitra telah bergabung
      </div>
      <div class="partner__joined-update">
        Update per {{ lastUpdate }}
      </div>
    </div>
    <div class="partner__search">
      <jds-search
        placeholder="Cari Mitra ..."
        icon
        :button="false"
        :value="search"
        @input="onSearchPartner"
      />
    </div>
    <div v-if="partnerIsReady && !partners.length" class="partner__empty-state">
      <img width="125" height="160" src="~/assets/images/EmptyStateSearch.svg" alt="Empty State Search">
      <div class="partner__empty-state-title">
        Mohon maaf, pencarian dengan kata kunci
        <strong v-if="search" class="partner__empty-state-new-tab">'{{ search }}'</strong>
        tidak dapat ditemukan.
      </div>
      <div class="partner__empty-state-subtitle">
        Silahkan mencoba dengan kata kunci yang berbeda.
      </div>
    </div>
    <div v-show="!partnerIsReady" class="partner__skeleton">
      <div v-for="(i, index) in 3" :key="index" class="partner__skeleton-item">
        <div class="partner__skeleton-item-box">
          <div class="partner__skeleton-item-box-avatar animate-pulse" />
          <div class="partner__skeleton-item-box-partner">
            <div class="partner__skeleton-item-box-partner-text">
              Mitra
            </div>
            <div class="partner__skeleton-item-box-partner-name animate-pulse" />
          </div>
        </div>
        <div class="partner__skeleton-item-boxjoin">
          <div class="partner__skeleton-item-boxjoin-joined">
            <div class="partner__skeleton-item-boxjoin-joined-text">
              Bergabung sejak
            </div>
            <div class="partner__skeleton-item-boxjoin-joined-date animate-pulse" />
          </div>
          <div class="partner__skeleton-item-boxjoin-totaljoin">
            <div class="partner__skeleton-item-boxjoin-totaljoin-text">
              Total desa dampingan
            </div>
            <div class="partner__skeleton-item-boxjoin-totaljoin-total animate-pulse" />
          </div>
        </div>
      </div>
    </div>
    <div v-show="partnerIsReady" ref="partners" class="partner__partner">
      <div v-for="partner in partners" :key="partner.id" class="partner__partner-item">
        <div class="partner__partner-item-box">
          <div class="partner__partner-item-box-avatar">
            <img width="40" height="40" :src="[partner.logo ? `https://avatars.dicebear.com/api/gridy/${partner.logo}.svg` : require('~/assets/logo/logo-dedi-abu-abu.svg')]" :alt="partner.name">
          </div>
          <div class="partner__partner-item-box-partner">
            <div class="partner__partner-item-box-partner-text">
              Mitra
            </div>
            <div class="partner__partner-item-box-partner-name">
              {{ partner.name || '-' }}
            </div>
          </div>
          <a :href="partner.website" target="_blank" class="partner__partner-item-box-partner-new-tab">
            <jds-icon name="open-new-tab" size="20px" color="#069550" />
          </a>
        </div>
        <div class="partner__partner-item-boxjoin">
          <div class="partner__partner-item-boxjoin-joined">
            <div class="partner__partner-item-boxjoin-joined-text">
              Bergabung sejak
            </div>
            <div class="partner__partner-item-boxjoin-joined-date">
              {{ partner.created_at ? joinedSince(partner.created_at) : '-' }}
            </div>
          </div>
          <div class="partner__partner-item-boxjoin-totaljoin">
            <div class="partner__partner-item-boxjoin-totaljoin-text">
              Total desa dampingan
            </div>
            <div class="partner__partner-item-boxjoin-totaljoin-total">
              {{ partner.total_village || 0 }} Desa
            </div>
          </div>
        </div>
      </div>
      <div ref="observerPartner" class="h-10 w-full" />
    </div>
  </div>
</template>

<script>
import debounce from 'lodash/debounce'
import { parseJSON, format } from 'date-fns'

export default {
  data () {
    return {
      partnerIsReady: true,
      observer: null,
      partners: [],
      meta: {},
      search: '',
      totalPartner: 0,
      query: {
        per_page: 6,
        current_page: 1
      }
    }
  },
  async fetch () {
    const response = await this.$axios.get('/partners', { params: this.query })
    const { data, meta } = response.data
    if (this.query.current_page > 1) {
      this.partners = [...this.partners, ...data]
    } else {
      this.partners = data
    }
    this.query = { ...this.query, ...meta }
    if (this.totalPartner < meta.total) {
      this.totalPartner = meta.total
    }
  },
  computed: {
    lastUpdate () {
      const date = this.query?.last_update ? parseJSON(this.query.last_update) : new Date()
      return format(date, 'LLLL yyyy')
    }

  },
  watch: {
    '$fetchState.pending' (val) {
      this.partnerIsReady = false
      if (!val) {
        setTimeout(() => {
          this.partnerIsReady = true
        }, 1000)
      }
    }
  },
  mounted () {
    this.initIntersectionObserverPartner()
  },
  methods: {
    joinedSince (date) {
      const mDate = parseJSON(date)
      return format(mDate, 'dd LLLL yyyy')
    },
    onSearchPartner (value) {
      if (value.length > 2) {
        this.debounceSearch(value)
      } else {
        this.debounceSearch('')
      }
      this.search = value
    },
    debounceSearch: debounce(function (value) {
      this.query = { ...this.query, name: value, current_page: 1 }
      this.$refs.partners.scrollTop = 0
      this.$fetch()
    }, 1000),
    /**
     * Initial Intersection Observer
     */
    initIntersectionObserverPartner () {
      this.observer = new IntersectionObserver(([entry]) => {
        if (entry && entry.isIntersecting && this.query.current_page < this.query.last_page) {
          this.query = { ...this.query, current_page: this.query.current_page + 1 }
          this.$fetch()
        }
      })

      this.observer.observe(this.$refs.observerPartner)
    }
  }
}
</script>

<style lang="postcss">
@import './Partner.pcss';
</style>
