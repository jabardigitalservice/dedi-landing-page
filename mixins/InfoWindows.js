export default {
  methods: {
    /**
     *
     * @param {*} item
     * @returns template
     */
    templateInfoWindow (item) {
      return `
        <div class="p-2 flex flex-col justify-start items-start w-full">
          <div class="w-full max-w-[260px]">
            <img class="w-full sm:w-[244px] h-[90px] rounded-lg object-cover" width="100%" height="90" src="${item.images.length ? item.images[0] : require('~/assets/logo/logo-dedi-abu-abu.svg')}" alt="Logo Dedi Abu Abu" />
          </div> 
          <div class="mt-2 font-roboto text-blue-gray-800 font-bold text-base leading-[26px]">${item.name}</div>
          <div class="w-full flex justify-between items-center font-sans flex-wrap gap-3">
            <div class="text-gray-500 text-sm leading-[23px]">
              ${item.city.name}
            </div>
            <div 
              class="${this.classStyleBgLevel(item)}"
            >
              <div 
                class="${this.classStyleTextLevel(item)}"
              >Level ${item.level ? item.level : ''}</div>
            </div>
          </div>
        </div>
      `
    },
    /**
     *
     * @param {*} item
     * @returns classes
     */
    classStyleBgLevel (item) {
      const classes = 'py-[2px] px-2 rounded-[6px] box-border'.split(' ')

      if (item.level === null || item.level === 4) {
        classes.push('bg-green-100')
      }

      if (item.level === 3) {
        classes.push('bg-blue-100')
      }

      if (item.level === 2) {
        classes.push('bg-yellow-100')
      }

      if (item.level === 1) {
        classes.push('bg-pink-100')
      }

      return classes.join(' ')
    },
    /**
     *
     * @param {*} item
     * @returns classes
     */
    classStyleTextLevel (item) {
      const classes = 'text-xs leading-[19px] font-medium'.split(' ')

      if (item.level === null || item.level === 4) {
        classes.push('text-green-800')
      }

      if (item.level === 3) {
        classes.push('text-blue-800')
      }

      if (item.level === 2) {
        classes.push('text-yellow-900')
      }

      if (item.level === 1) {
        classes.push('text-pink-800')
      }

      return classes.join(' ')
    }
  }
}
