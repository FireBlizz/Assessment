Vue.component('product', {//the component, it's the whole main part of the page, allowing it to be coppied and repeated mutilples times with ease.
    props: { //used to define the user as "premium" moslt to indicat if the shipping is free or pay.
      premium: {
        type: Boolean,
        required: true
      }
    },
    template: //in this template holds most of the html code that you see on the website alowing it to be reprated on the website with ease
    ` 
     <div class="product">
          
        <div class="product-image"> <!--used to ask for an image from the java script-->
          <img :src="image" />
        </div>
  
        <div class="product-info">
            <h1>{{ title }}</h1>
            <p v-if="inStock">In Stock</p> <!-- if there is stock show or else not show not-->
            <p v-else>Out of Stock</p>
            <p>Shipping: {{ shipping }}</p> <!--this calls for hte shopping computed proccess-->
  
            <ul>
              <li v-for="detail in details">{{ detail }}</li> <!--calls for the list of details-->
            </ul>
  
            <div class="color-box" 
                 v-for="(variant, index) in variants" 
                 :key="variant.variantId"
                 :style="{ backgroundColor: variant.variantColor }"
                 @mouseover="updateProduct(index)"
                 > <!--creats a coloured box the has a color based on the image its is tied to, when hoved over it changes teh image-->
            </div> 
   
            <button v-on:click="addToCart"  
              :disabled="!inStock"
              :class="{ disabledButton: !inStock }"
              ><!--button to increase the cart and decrease the quantity-->
            Add to cart
            </button>
  
         </div>  
      
      </div>
     `,
    data() { //the data that is used to store basic information that can be called
      return {
          product: 'Socks',
          brand: 'Vue Mastery',
          selectedVariant: 0,
          details: ['80% cotton', '20% polyester', '10% style'],
          variants: [ //a list of detail products
            {
              variantId: 2234,
              variantColor: 'green',
              variantImage: 'images/vmSocks-green-onWhite.jpg',
              variantQuantity: 10,
              variantCost: 2 
            },
            {
              variantId: 2235,
              variantColor: 'blue',
              variantImage: 'images/vmSocks-blue-onWhite.jpg',
              variantQuantity: 2,
              variantCost: 10     
            }
          ]
      }
    },
      methods: { //used to store sperate methods used to certin actions like increase or decrease certin things or set other things.
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
            this.$emit('add-to-cost', this.variants[this.selectedVariant].variantCost)
            this.variants[this.selectedVariant].variantQuantity -= 1
            
        },
        updateProduct(index) {  
            this.selectedVariant = index
        }
      },
      computed: { //used to computed informatuion when called upon, and retrun information.
          title() {
              return this.brand + ' ' + this.product  
          },
          image(){
              return this.variants[this.selectedVariant].variantImage
          },
          inStock(){
              return this.variants[this.selectedVariant].variantQuantity
          },
          shipping() {
            if (this.premium) {
              return "Free"
            }
              return 2.99
          }
      },
    },
)


  var app = new Vue({//used ad a gobel java script function for Vue for stuff like the card.
      el: '#app',
      data: {
        premium: true,
        cart: [],
        cost: [],
        total: 0
      },
      methods: {
        updateCart(id) {
          this.cart.push(id)
        },
        updateCost(costs) {
          this.cost.push(' $' + costs)
          this.total += costs
        },
      }
    }
  )