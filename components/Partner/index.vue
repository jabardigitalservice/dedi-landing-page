<template>
  <div class="w-full h-[567px] rounded-xl bg-[#FAFBFC] border border-blue-gray-50 p-4">
    <div class="py-2 px-4 bg-green-700 w-full rounded-lg">
      <div class="font-roboto text-base leading-[26px] text-white">
        Total <strong>{{ totalPartner }}</strong> Mitra telah bergabung
      </div>
      <div class="text-xs leading-[19px] italic text-white">
        Update per {{ lastUpdate }}
      </div>
    </div>
    <div class="mt-[10px]">
      <jds-search
        placeholder="Cari Mitra ..."
        icon
        :button="false"
        :value="search"
        @input="onSearchPartner"
      />
    </div>
    <div v-if="partnerIsReady && !partners.length" class="h-[404px] flex flex-col justify-center items-center">
      <img width="125" height="160" src="~/assets/images/EmptyStateSearch.svg" alt="Empty State Search">
      <div class="text-base leading-[26px] font-medium text-blue-gray-700 text-center mt-8">
        Mohon maaf, pencarian dengan kata kunci <strong v-if="search" class="text-green-800">'{{ search }}'</strong> tidak dapat ditemukan.
      </div>
      <div class="mt-[14px] text-xs leading-[19px] text-center text-blue-gray-700">
        Silahkan mencoba dengan kata kunci yang berbeda.
      </div>
    </div>
    <div v-show="!partnerIsReady" class="mt-[12px] h-[404px] flex flex-col gap-3 overflow-y-hidden overflow-x-hidden">
      <div v-for="(i, index) in 3" :key="index" class="h-max w-full bg-white rounded-lg py-4 px-6">
        <div class="flex gap-4 py-[2px]">
          <div class="w-[40px] h-[40px] rounded-full bg-[#F0F4F5] animate-pulse" />
          <div class="flex flex-col gap-[2px]">
            <div class="font-medium text-xs leading-[18px] text-blue-gray-200">
              Mitra
            </div>
            <div class="bg-[#F0F4F5] w-[106px] h-[20px] animate-pulse rounded-full" />
          </div>
        </div>
        <div class="mt-[12px] flex gap-4 w-full justify-between">
          <div class="flex flex-col gap-[2px]">
            <div class="font-medium text-xs leading-[18px] text-blue-gray-200">
              Bergabung sejak
            </div>
            <div class="bg-[#F0F4F5] w-[106px] h-[20px] animate-pulse rounded-full" />
          </div>
          <div class="flex flex-col gap-[2px]">
            <div class="font-medium text-xs leading-[18px] text-blue-gray-200">
              Total desa dampingan
            </div>
            <div class="bg-[#F0F4F5] w-[106px] h-[20px] animate-pulse rounded-full" />
          </div>
        </div>
      </div>
    </div>
    <div v-show="partnerIsReady" ref="partners" class="mt-[12px] h-[388px] flex flex-col gap-3 overflow-y-auto overflow-x-hidden">
      <div v-for="partner in partners" :key="partner.id" class="h-max w-full bg-white rounded-lg py-4 px-6">
        <div class="flex gap-4 py-[2px]">
          <div class="w-[40px] h-[40px]">
            <img width="40" height="40" :src="[partner.logo ? `https://avatars.dicebear.com/api/gridy/${partner.logo}.svg` : require('~/assets/logo/logo-dedi-abu-abu.svg')]" :alt="partner.name">
          </div>
          <div class="flex flex-col gap-[2px] flex-1">
            <div class="font-medium text-xs leading-[18px] text-blue-gray-200">
              Mitra
            </div>
            <div class="font-medium text-sm leading-[23px] text-blue-gray-600">
              {{ partner.name }}
            </div>
          </div>
          <a :href="partner.website" target="_blank" class="pl-[2px]">
            <jds-icon name="open-new-tab" size="20px" color="#069550" />
          </a>
        </div>
        <div class="mt-[12px] flex gap-4 w-full justify-between">
          <div class="flex flex-col gap-[2px]">
            <div class="font-medium text-xs leading-[18px] text-blue-gray-200">
              Bergabung sejak
            </div>
            <div class="font-medium text-sm leading-[23px] text-blue-gray-600">
              {{ joinedSince(partner.created_at) }}
            </div>
          </div>
          <div class="flex flex-col gap-[2px]">
            <div class="font-medium text-xs leading-[18px] text-blue-gray-200">
              Total desa dampingan
            </div>
            <div class="font-medium text-sm leading-[23px] text-blue-gray-600">
              {{ partner.total_village }} Desa
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

<style>

</style>
