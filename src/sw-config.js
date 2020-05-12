export default {
    onUpdate: registration => {
      const waitingServiceWorker = registration.waiting
  
      if (waitingServiceWorker) {
        waitingServiceWorker.addEventListener("statechange", event => {
          if (event.target.state === "activated") {
            window.location.reload()
          }
        });
        waitingServiceWorker.postMessage({ type: "SKIP_WAITING" });
      }
    }
  }