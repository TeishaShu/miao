<template>
  <div>
    <ul>
      <li v-for="(item,index) in categoryItem" 
      @click="selectCategory(`${item.value}`, true)" :key="index">
        <i class="fas fa-cookie"></i>{{item.label}}
      </li>
    </ul>
  </div>
</template>