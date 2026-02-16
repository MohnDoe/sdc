export const useGameTimerStore = defineStore('gameTimer', {
  state: () => ({
    elapsedTime: 0, // in ms
    isRunning: false,
    startTime: null as number | null,
    timeoutId: null as number | null,
  }),

  getters: {
    // Format elapsed time as HH:MM:SS
    formattedTime(): string {
      const totalSeconds = Math.floor(this.elapsedTime / 1000)
      const hours = Math.floor(totalSeconds / 3600)
      const minutes = Math.floor((totalSeconds % 3600) / 60)
      const seconds = totalSeconds % 60

      return [minutes, seconds]
        .map(unit => String(unit).padStart(2, '0'))
        .join(':')
    },
  },

  actions: {
    // Internal: Update time precisely, chain 1s timeouts
    updateTime() {
      if (this.startTime !== null) {
        const now = performance.now()
        this.elapsedTime += now - this.startTime
        this.startTime = now
      }
      if (this.isRunning) {
        this.timeoutId = window.setTimeout(() => this.updateTime(), 750)
      }
    },

    /** Start or resume timer (adds pause delta first) */
    start() {
      if (this.isRunning) return
      this.isRunning = true

      // Add any pause delta on resume
      if (this.startTime !== null) {
        const now = performance.now()
        this.elapsedTime += now - this.startTime
      }
      this.startTime = performance.now()
      this.updateTime()
    },

    /** Pause and finalize elapsed time */
    pause() {
      if (!this.isRunning) return
      this.isRunning = false

      if (this.startTime !== null) {
        const now = performance.now()
        this.elapsedTime += now - this.startTime
        this.startTime = null
      }
      this.cleanup()
    },

    /** Reset to zero */
    reset() {
      this.pause()
      this.elapsedTime = 0
      this.startTime = null
    },

    /** Clear timeout */
    cleanup() {
      if (this.timeoutId !== null) {
        window.clearTimeout(this.timeoutId)
        this.timeoutId = null
      }
    },
  },
})
