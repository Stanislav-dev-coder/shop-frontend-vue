<template>
  <div class="catalog">
    <Header
    :test="test"
    />
    <main class="container">
      <section class="heading">
        <h1>Каталог</h1>
      </section>
      <section class="product_sort">
      </section>
      <section class="card_section">
        <div class="product_filter__wrapper">
          <newMenuInCatalog/>
        </div>
        <div class="product_card_list__wrapper">
          <div class="card_list card_list-catalog">
            <product-card
                v-for="product in products"
                :key="product.id"
                :product="product"
                :sale="sales"
                :productUUID="productsUUID"
            />
          </div>
          <nav class="page">
            <ul class="page__list">
              <li class="list__el" @click="changePageNoIndex('first')">
                <a class="el__content" >&laquo;</a>
              </li>
              <li class="list__el" @click="changePageNoIndex('previous')">
                <a class="el__content" >Предыдущая</a>
              </li>
              <li class="list__el" @click="changePage(pageIndex)" v-for="pageIndex in filter.totalPages" :key="pageIndex">
                <a class="el__content">{{pageIndex}} </a>
              </li>
              <li class="list__el" @click="changePageNoIndex('next')">
                <a class="el__content" >Следующая</a>
              </li>
              <li class="list__el" @click="changePageNoIndex('last')">
                <a class="el__content" >&raquo;</a>
              </li>
            </ul>
          </nav>
        </div>
      </section>



  </main>
  <Footer/>
  </div>
</template>

<script>
import ProductCard from '@/components/ProductCard'
import newMenuInCatalog from "@/components/newMenuInCatalog";
import Header from '../components/Sections/Header'
import Footer from '../components/Sections/Footer'
import { eventBus } from '@/main'
import CatalogService from '../services/catalog.service'
import SaleService from "@/services/sale.service";
import CartService from "@/services/cart.service";

export default {
  name: 'Catalog',
  components: {
    ProductCard,
    Header,
    Footer,
    newMenuInCatalog
  },
  data() {
    return {
      productsUUID: [],
      content: {},
      products: [],
      productsFromServer: {},
      text: 'Все товары',
      filter: {
        sale: false,
        categories: [],
        priceFrom: 1,
        priceTo: 99999,
        pageNumber: 0,
        pageSize: 6,
        totalPages: null,
        sortBy: 'name',
        sortDirection: 'ASC',
        searchText: null,
      },
      sales: undefined,
      test: true
    }
  },
methods: {
    getUserProducts() {
      CartService.getUserProducts().then(
          response => {
            this.productsUUID = response.data
          }
      )
    },
    getSales() {
      SaleService.getSales().then(
          response => {
            this.sales = response.data.content
          })
    },

  getFilteredProducts() {
    CatalogService.getByUserFilter(this.filter).then(
        response => {
          this.productsFromServer = response;
          this.products = this.productsFromServer.data.content;
          this.filter.totalPages = this.productsFromServer.data.totalPages;
        }
    )
  },
  sortProducts(event) {
    let value = event.target.value;
    let values = value.split(",",2);
    this.filter.sortBy = values[0];
    this.filter.sortDirection = values[1];
    this.getFilteredProducts();
  },
  changePage(pageIndex) {
    this.filter.pageNumber = pageIndex - 1;
    this.getFilteredProducts()
    window.scrollTo(0, 0);
  },
  async changePageNoIndex(parameter) {
    switch (parameter) {
      case 'first':
        this.filter.pageNumber = 0;
        break;
      case 'previous':
        if (this.filter.pageNumber > 0) {
          this.filter.pageNumber = this.filter.pageNumber - 1;
        }
        break;
      case 'next':
        if (this.filter.pageNumber !== this.filter.totalPages - 1) {
          this.filter.pageNumber = this.filter.pageNumber + 1;
        }
        break;
      case 'last':
        this.filter.pageNumber = this.filter.pageNumber - 1;
        break;
    }
    await this.getFilteredProducts()
    window.scrollTo(0, 0);
  },
},
  created() {
    if (this.$route.params.catalogParameter !== undefined) {
      this.filter.categories.push(this.$route.params.catalogParameter)
    }
    if (this.$route.params.isDeal === 'true') {
      this.filter.sale = true
    }
    this.getSales()
    this.getFilteredProducts()
    this.getUserProducts()
    eventBus.$on('createUserFilter', payload => {
      this.filter.sale = payload.isSale;
      this.filter.categories = payload.categories;
      this.filter.priceFrom = payload.priceFrom;
      this.filter.priceTo = payload.priceTo;
      this.getFilteredProducts();
    });
    eventBus.$on('searchProducts', data => {
      this.$router.push('/catalog')
      this.filter.searchText = data;
      this.getFilteredProducts()
    });
    eventBus.$on('changePage', data => {
      this.filter.pageNumber = data
      this.getFilteredProducts()
    });
    eventBus.$on('sortProducts', data => {
      this.filter.pageNumber = data;
      this.getFilteredProducts()
    });
    eventBus.$on('reloadCard', this.getUserProducts)
  },
}
</script>

<style lang="scss">
  .card_section{
    display: grid;
    justify-items: center;
    row-gap: 30px;
    grid-template-columns: repeat(auto-fit, minmax(290px, auto));
  }
  .card_list{
    min-width: 304px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));
    gap: 20px 10px;
    align-items: center;
  }
  .card_list-catalog{
    width: 70vw;
    justify-items: left;
  }
  .card_list-index{
    justify-items: left;
  }
  .product_filter__wrapper{
    display: grid;
    width: 100%;
    //justify-self: end;
    //width: 15vw;
  }
    .page{
      -ms-user-select: none;
      -moz-user-select: none;
      -khtml-user-select: none;
      -webkit-user-select: none;
      user-select: none;
      display: grid;
      width: 300px;
      margin-top: 30px;
      .page__list{
        display: grid;
        justify-items: center;
        grid-template-columns: repeat(6, 1fr);
        .list__el{
          cursor: pointer;
          padding: 5px 10px;
          border: 1px solid #ccc;
          transition: .3s ease;
          .el__content{
            font-weight: bold;
          }
          &:hover{
            background-color: #3D3D3D;
            color: #FFFFFF;
            transition: .3s ease;
            .el__content{
              color: #FFFFFF;
            }
          }
        }
      }
    }
  @media (max-width: 768px) {
    .product_filter__wrapper{
      justify-items: center;
    }
    .card_list{
      justify-items: center;
    }
    .page{

      width: 200px;
      .page__list{
        .list__el{
          padding: 1px 5px;
        }
      }
    }
  }
</style>
