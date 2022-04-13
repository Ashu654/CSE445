import axios from 'axios'
import Noty from 'noty'
import moment from 'moment'
import {initAdmin} from './admin'
let addToCart = document.querySelectorAll('.add-to-cart')
let cartCounter=document.querySelector('#cartCounter')
let counter=document.querySelector('#counter')//

function updateCart(product) {
    axios.post('/update-cart', product).then(res => {
        cartCounter.innerText= res.data.totalQty
        new Noty({
            type:'success',
            timeout:1000,
            text: "Item added to cart",
            progressBar:false,
          }).show();
        }).catch(err => {
            new Noty({
                type: 'error',
                timeout: 1000,
                text: 'Something went wrong',
                progressBar: false,
            }).show();
        })
    }

addToCart.forEach((btn) => {
   btn.addEventListener('click', (e) => {
    let product= JSON.parse(btn.dataset.product)
      updateCart(product)
    })
})


let increase = document.querySelectorAll('.increase') //
function updateQty1(product){                          //
    axios.post('/updateQty1',product).then(res=>{       //
    console.log(res)  
    counter.innerText= res.data.updatedQty1   // 
                                                 //
    })                                                //
}                                                     //


increase.forEach((btn) => {                          //
    btn.addEventListener('click', (e) => {           //  
     let product= JSON.parse(btn.dataset.product)
     updateQty1(product)
     //console.log(product) 
                                                          //
     })                                              //
 })                                                  //







//remove alert messages after X seconds
const alertMsg=document.querySelector('#success-alert')
if (alertMsg){
    setTimeout(()=>{
        alertMsg.remove()
    },2000)
}
// Change order status
let statuses = document.querySelectorAll('.status_line')
let hiddenInput = document.querySelector('#hiddenInput')
let order = hiddenInput ? hiddenInput.value : null
order = JSON.parse(order)
let time = document.createElement('small')

function updateStatus(order) {
    statuses.forEach((status) => {
        status.classList.remove('step-completed')
        status.classList.remove('current')
    })
    let stepCompleted = true;
    statuses.forEach((status) => {
       let dataProp = status.dataset.status
       if(stepCompleted) {
            status.classList.add('step-completed')
       }
       if(dataProp === order.status) {
            stepCompleted = false
            time.innerText = moment(order.updatedAt).format('hh:mm A')
            status.appendChild(time)
           if(status.nextElementSibling) {
            status.nextElementSibling.classList.add('current')
           }
       }
    })

}

updateStatus(order);

//chat app


initAdmin() 