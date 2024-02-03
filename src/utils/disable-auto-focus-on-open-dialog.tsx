export function disableAutoFocusOnOpenDialog(event: Event) {
  if (window.innerWidth < 768) {
    event.preventDefault()
  }
}
