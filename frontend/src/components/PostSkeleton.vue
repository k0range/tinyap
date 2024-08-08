<template>
  <div class="border-b border-[#D7D7D7] py-4 px-5">
    <div class="flex w-full max-w-full">
      <div class="bg-skeleton w-12 h-12 mr-4 rounded-full"></div>
      <div class="mt-0.5 text-[1.05em] flex-grow">
        <div class="flex justify-between">
          <div class="flex">
            <div class="bg-skeleton font-medium h-[1.05em] w-28 rounded-2xl"></div>
            <div class="flex flex-col justify-center">
              <div class="bg-skeleton ml-2 h-[0.875rem] w-16 rounded-2xl"></div>
            </div>
          </div>
        </div>
        <div class="bg-skeleton h-[1.05em] w-64 rounded-2xl mt-1.5 break-all"></div>
        <!--
        <div class="w-full flex mt-1.5 overflow-x-scroll whitespace-nowrap max-w-full">
          <div class="flex flex-nowrap w-full max-w-full">
            <span class="bg-[#E8E8E8] text-[#838383] rounded-full px-2.5 py-0.5 text-[12.7px] font-medium mr-1.5">#introduction</span>
          </div>
        </div>
        -->
      </div>
    </div>
  </div>
</template>

<style>
.bg-skeleton {
  animation: bg-skeleton 2s infinite;
}

@keyframes bg-skeleton {
  0% {
    background-color: #dedede;
  }
  50% {
    background-color: #ececec;
  }
  100% {
    background-color: #dedede;
  }
}
</style>