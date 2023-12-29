function generateUniqueId() {
    const timestamp = new Date().getTime().toString(16); // Convert current timestamp to hexadecimal
    const randomValue = Math.random().toString(16).slice(2); // Generate a random hexadecimal value

    return `${timestamp}_${randomValue}`;
}

const tToaster = {}

tToaster.removeFunction = function () {
    const toasterContainer = document.querySelector('#tailwind-toaster-container')
    const alreadyExist = document.querySelector('#t-toaster-remove-function-script')
    if (!alreadyExist) {
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.id = 't-toaster-remove-function-script'
        script.innerHTML = `
        function remove_t_toast(remove_toast_element){
            const toasterContainer = document.getElementById('tailwind-toaster-container')
            const t_toast_to_remove = document.getElementById(remove_toast_element)
            toasterContainer.removeChild(t_toast_to_remove)
            console.log("removeed")
        }
        function remove_t_toast_after_3sec(remove_toast_element){
            setTimeout(()=>{
                remove_t_toast(remove_toast_element)
            },3000)
        }
        `
        toasterContainer.appendChild(script)
    }

}

const removeElementTimer = (elid)=>{
    setTimeout(() =>{
        function remove_t_toast(remove_toast_element){
            const toasterContainer = document.getElementById('tailwind-toaster-container')
            const t_toast_to_remove = document.getElementById(remove_toast_element)
            toasterContainer.removeChild(t_toast_to_remove)
            console.log("removeed")
        }
        remove_t_toast(elid)
    },5000)
}

tToaster.success = function (toastContent) {
    tToaster.removeFunction()
    const uniqueId = generateUniqueId();
    const toasterContainer = document.querySelector('#tailwind-toaster-container')
    const successDiv = document.createElement('div')
    successDiv.id = `t-toast-${uniqueId}`
    successDiv.style = `animation-iteration-count: 1;`
    successDiv.role = "alert"
    successDiv.className = "animate-bounce transition duration-150 flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow"
    successDiv.innerHTML = `
      <div
      class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg"
    >
      <svg
        class="w-5 h-5"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"
        />
      </svg>
      <span class="sr-only">Check icon</span>
    </div>
    <div class="ms-3 text-sm font-normal">${toastContent ? toastContent : 'Success!'}</div>
    <button
      type="button"
      class="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8"
      data-dismiss-target="#toast-success"
      aria-label="Close"
      onclick="remove_t_toast('t-toast-${uniqueId}')"
    >
      <span class="sr-only">Close</span>
      <svg
        class="w-3 h-3"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 14 14"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
        />
      </svg>
    </button>
    `
    toasterContainer.appendChild(successDiv)
    removeElementTimer(`remove_t_toast('t-toast-${uniqueId}')`)
}
tToaster.error = function (toastContent) {
    tToaster.removeFunction()
    const uniqueId = generateUniqueId();
    const toasterContainer = document.querySelector('#tailwind-toaster-container')
    const successDiv = document.createElement('div')
    successDiv.id = `t-toast-${uniqueId}`
    successDiv.role = "alert"
    successDiv.className = "flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow"
    successDiv.innerHTML = `
      
    <div
    class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg"
  >
    <svg
      class="w-5 h-5"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path
        d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"
      />
    </svg>
    <span class="sr-only">Error icon</span>
  </div>
  <div class="ms-3 text-sm font-normal">${toastContent ? toastContent : 'Error!'}</div>
  <button
    type="button"
    class="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8"
    data-dismiss-target="#toast-danger"
    aria-label="Close"
    onclick="remove_t_toast('t-toast-${uniqueId}')"
  >
    <span class="sr-only">Close</span>
    <svg
      class="w-3 h-3"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 14 14"
    >
      <path
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
      />
    </svg>
  </button>
    `
    toasterContainer.appendChild(successDiv)
}
tToaster.warn = function (toastContent) {
    tToaster.removeFunction()
    const uniqueId = generateUniqueId();
    const toasterContainer = document.querySelector('#tailwind-toaster-container')
    const successDiv = document.createElement('div')
    successDiv.id = `t-toast-${uniqueId}`
    successDiv.role = "alert"
    successDiv.className = "flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow"
    successDiv.innerHTML = `
    <div
    class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg"
  >
    <svg
      class="w-5 h-5"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path
        d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z"
      />
    </svg>
    <span class="sr-only">Warning icon</span>
  </div>
  <div class="ms-3 text-sm font-normal">${toastContent ? toastContent : 'Warning!'}</div>
  <button
    type="button"
    class="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8"
    data-dismiss-target="#toast-warning"
    aria-label="Close"
    onclick="remove_t_toast('t-toast-${uniqueId}')"
    ontransitionend="remove_t_toast_after_3sec('t-toast-${uniqueId}')"
  >
    <span class="sr-only">Close</span>
    <svg
      class="w-3 h-3"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 14 14"
    >
      <path
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
      />
    </svg>
  </button>
    `
    toasterContainer.appendChild(successDiv)
}

export default tToaster