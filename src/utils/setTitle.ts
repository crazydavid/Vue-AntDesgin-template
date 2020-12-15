import { ref, watchEffect } from 'vue'

export function usetTitle(title: string) {
  const titleRef = ref(title)
  watchEffect(() => {
    document.title = titleRef.value
  })
  const setTitle = (title: string) => {
    titleRef.value = title
  }
  return setTitle
}
