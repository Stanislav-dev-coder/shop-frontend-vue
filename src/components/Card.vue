<template>
  <div class="card" @click="openCatalogCategory(name)">
    <div class="card-wrapper">
      <div class="card__item card__img">
        <img :src=image>
      </div>
      <div class="card__item card__title">
        <h1>{{ name }}</h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props:{
    name: String,
    image: String,
    color: String
  },
  methods:{
    openCatalogCategory(catalogParameter) {
      this.$router.push({ name: 'catalog-page', params: {catalogParameter: catalogParameter} });
    }
  }
}
</script>

<style lang="scss" scoped>
  .card{
    background: #fff;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.25);
    border-radius: 25px;
    transition: 0.3s;
    .card-wrapper{
      padding: 20px;
      display: grid;
      grid-template-columns: repeat(2,1fr);
      justify-items: center;
    }
    .card__item{
      h1{
        color: #000;
      }
      img{
        /* еще больше контроля с max-width */
        max-width: 100%;
      }
    }
    .card__img{

    }
    &:hover{
      box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.25);
      transform: scale(1.05);
      transition: 0.3s;
    }
  }
</style>
