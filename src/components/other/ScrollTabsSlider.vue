<template>
    <div class="slider-container">
      <!-- Левая кнопка -->
      <button class="arrow left-arrow" @click="scrollLeft">
        <span class="arrow-text">‹</span>
      </button>
  
      <!-- Слайдер -->
      <div class="slider" ref="slider">
        <div 
          class="slider-item" 
          v-for="(item, index) in items" 
          :key="index"
          @click="handleItemClick(item)"
        >
          <span class="slider-item-text">{{ item }}</span>
        </div>
      </div>
  
      <!-- Правая кнопка -->
      <button class="arrow right-arrow" @click="scrollRight">
        <span class="arrow-text">›</span>
      </button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      items: {
        type: Array,
        required: true
      }
    },
    methods: {
      scrollLeft() {
        const slider = this.$refs.slider;
        slider.scrollBy({ left: -200, behavior: 'smooth' });
      },
      scrollRight() {
        const slider = this.$refs.slider;
        slider.scrollBy({ left: 200, behavior: 'smooth' });
      },
      handleItemClick(item) {
        alert(`Clicked on: ${item}`);
        // Здесь вы можете добавить логику обработки клика на элемент
      }
    }
  };
  </script>
  
  <style scoped>
  .slider-container {
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
  }
  
  .slider {
    display: flex;
    overflow-x: auto;
    scroll-behavior: smooth;
    width: 100%;
  }
  
  .slider-item {
    min-width: 150px;
    margin: 10px;
    padding: 0.25rem 0.75rem; /* px-3 py-1 */
    background-color: #e5e7eb; /* bg-gray-200 */
    border-radius: 0.5rem; /* rounded-lg */
    cursor: pointer;
    text-align: center;
    font-size: 1.125rem; /* text-lg */
    font-weight: bold; /* font-bold */
    flex-shrink: 0;
  }
  
  .slider-item:hover {
    background-color: #d1d5db; /* hover:bg-gray-300 */
  }
  
  .dark .slider-item {
    background-color: #374151; /* bg-gray-700 для темной темы */
  }
  
  .slider-item-text {
    color: #000;
  }
  
  .arrow {
    background: none;
    border: none;
    padding: 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .arrow-text {
    font-weight: bold;
    background-color: #e5e7eb; /* bg-gray-200 */
    padding: 0.25rem 0.75rem; /* px-3 py-1 */
    border-radius: 0.5rem; /* rounded-lg */
  }
  
  .arrow:hover .arrow-text {
    background-color: #d1d5db; /* hover:bg-gray-300 */
  }
  
  .dark .arrow-text {
    background-color: #374151; /* bg-gray-700 */
  }
  
  .right-arrow {
    position: absolute;
    right: 0;
  }
  
  .left-arrow {
    position: absolute;
    left: 0;
  }
  </style>
  