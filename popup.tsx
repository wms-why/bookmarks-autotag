import { useEffect } from "react"

function IndexPopup() {
  useEffect(() => {
    chrome.tabs.create({ url: chrome.runtime.getURL("tabs/bookmarks.html") })
  }, [])

  return null
}

export default IndexPopup