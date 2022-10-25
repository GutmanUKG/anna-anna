document.addEventListener('DOMContentLoaded', ()=>{
    let body = document.body



    function clearClass(elements, classActive){
        for(let i = 0; i < elements.length; i++){
            elements[i].classList.remove(classActive)
        }
    }
    //Основной слайдер
    try{
        let bannerSlider = document.querySelector('.banner_slider'),
            bannerItem = bannerSlider.querySelectorAll('.item');

        let bannerOwl = $('.banner_slider');
        $('.banner_slider').owlCarousel({
            loop:true,
            margin:0,
            nav:false,
            items:1,
            dots:true,
            autoplay:true,
            autoplayTimeout: 4000
        })



        // Go to the next item
        $('.btn_next_banner').click(function() {
            bannerOwl.trigger('next.owl.carousel');

        })
        // Go to the previous item
        $('.btn_prev_banner').click(function() {
            // With optional speed parameter
            // Parameters has to be in square bracket '[]'
            bannerOwl.trigger('prev.owl.carousel', [300]);

        })


        bannerItem.forEach(item=>{
            if(item.classList.contains('white')){
                item.parentNode.classList.add('white_slide')
            }
        })

        //Функционал смены темы при переключении слайдера
        let owlItem = bannerSlider.querySelectorAll('.owl-item')
        bannerOwl.on('changed.owl.carousel', function(event) {
            if(owlItem[event.item.index].classList.contains('white_slide')){
                body.classList.add('white_theme')
            }else{
                body.classList.remove('white_theme')
            }
        })

    }catch(e){
        console.error(e)
    }
    //Основной слайдер

    //Инициализация и настройка слайдеров для всех товаров
    class OwlSlider{
        constructor({itemEl = null, options = {}, customBtn = false,
                    btnNext = null, btnPrev = null, bannerOwl= null,
                    hoverTrigger = false}){
            this.itemEl = itemEl
            this.options = options
            this.customBtn = customBtn
            this.btnNext = document.querySelector(btnNext)
            this.btnPrev = document.querySelector(btnPrev)
            this.bannerOwl = bannerOwl
            this.hoverTrigger = hoverTrigger
        }
        init(){
            this.itemEl.classList.add('owl-carousel' , 'owl-theme')
            $(this.itemEl).owlCarousel({
                ...this.options
            })
            if(this.customBtn === true){
                let bannerOwl = $(this.itemEl),
                    nextPrev = ['prev','next'];
                this.itemEl.parentNode.querySelectorAll('.btn').forEach((item, id)=>{
                    item.addEventListener('click', ()=>{
                        bannerOwl.trigger(nextPrev[id]+ '.owl.carousel')
                    })
                })
            }
            if(this.hoverTrigger === true){
                let dots = this.itemEl.querySelectorAll('.owl-dot')
                let bannerOwl = $(this.itemEl)
                dots.forEach((item, id)=>{
                    item.addEventListener('mouseenter', (e)=>{
                        this.itemEl.trigger('to.owl.carousel' ,[id, 300])
                    })
                })
            }
        }
    }


    //Слайдер списка товаров
    try{
        const productItemsList = document.querySelectorAll('.product_item_slider')
        productItemsList.forEach(item=>{
            let nextBtn = item.parentNode.querySelector('.product_items_list_btn_next')
            let prevButton = item.parentNode.querySelector('.product_items_list_btn_prev')

            let slider = tns({
                container: item,
                items: 4,
                nextButton:nextBtn,
                prevButton:prevButton,
                nav:false,
                gutter:30,
                responsive: {
                    1024: {
                        items: 4
                    },
                  996:{
                      items: 3
                  },
                    700: {
                        items:2.3
                    }
                }
            })
        })
    }catch (e) {
        console.error(e)
    }

    //Слайдер картинок в товаре
    try{
        const TproductItemsList = document.querySelectorAll('.product_item_imgs')
        TproductItemsList.forEach(item=>{
            let slider = tns({
                container: item,
                items: 1,
                controls:false,
                nav: true
            })
            let dots = item.parentNode.parentNode.parentNode.querySelectorAll('button')
            dots.forEach((item,id)=>{
                item.addEventListener('mouseenter', ()=>{
                    slider.goTo(id)
                })
            })
        })
    }catch (e) {

    }
    //Слайдер коллекций
    try{
        let collectionListSlider = tns({
            container: '.collection_list',
            items: 6,
            gutter: 30,
            nav: false,
            controls:false,
            responsive: {
                1024: {
                    items: 6
                },
                1023: {
                    items: 4
                },
                700: {
                    items:3
                }
            }
        })
    }catch (e) {

    }
    //Cлайдер капсул и новостей
    try{
        const sliderList = document.querySelectorAll('.slider_list')
        sliderList.forEach(item=>{
            item = new OwlSlider({
                itemEl:item,
                customBtn:true,
                btnNext: '.btn_next_slider',
                btnPrev: '.btn_prev_slider',
                options: {
                    loop:false,
                    margin:30,
                    nav:false,
                    items:3,
                    dots:false,
                    responsive: {
                        1024: {
                            items: 3
                        },
                        1023: {
                            items: 3
                        },
                        700: {
                            items:1.3
                        }
                    }
                }
            })
            item.init();
        })
    }catch(e){
        console.error(e)
    }


    //Меню каталога
    try{
        const leftMenu = document.querySelector('.left_menu')
        const liElements = leftMenu.querySelectorAll('li')

        liElements.forEach(item=>{
            if(item.querySelector('ul')){
                item.classList.add('is_dropdown')
            }
        })
        leftMenu.addEventListener('click', (e)=>{
            let target = e.target
            e.preventDefault()
            e.stopPropagation()
            clearClass(liElements, 'active_drop')
            if(target.parentNode.classList.contains('is_dropdown')){
                target.parentNode.classList.add('active_drop')
            }
        })
    }catch(e){
        console.error(e)
    }


    //Выпадашки фильтров

    try{
        const filterList = document.querySelector('.filter_list'),
            filterItems = filterList.querySelectorAll('.item');
        filterItems.forEach(item=>{
            let filterDropVariant = item.querySelector('.drop');
            if(filterDropVariant != null){
                let  elementsDropVariant = filterDropVariant.querySelectorAll('a');
                console.log(elementsDropVariant.length)
                if(elementsDropVariant.length >= 10){
                    filterDropVariant.classList.add('grid_template')
                }
            }



                item.addEventListener('click', ()=>{
                clearClass(filterItems, 'active')
                item.classList.add('active')
            })
        })
    }catch(e){
        console.error(e)
    }

    //Выпадашки информации
   try{
       const infoListItems = document.querySelector('.info_list_items'),
           infoItems = infoListItems.querySelectorAll('.item');

       infoItems.forEach(item=>{
           item.addEventListener('click', ()=>{
               clearClass(infoItems, 'active')
               item.classList.add('active')
           })
       })
   }catch(e){
        console.error(e)
   }

    //Смена основной картинки при клике

    try{
       const dotsImgsList = document.querySelector('#dots_imgs_list'),
           dotsImgsListItem = dotsImgsList.querySelectorAll('.item'),
           sliderVertical = document.querySelector('.slider_vertical');
       let verticalSlider = tns({
           container: '.slider_vertical',
           nav: false,
           controls: false,
           axis: true,
           mouseDrag: true,

       })
        dotsImgsListItem[0].classList.add('active')
        dotsImgsListItem.forEach((i, id)=>{
            i.addEventListener('click', ()=>{
                clearClass(dotsImgsListItem, 'active')
                i.classList.add('active')
                verticalSlider.goTo(id)
            })
        })
    }catch (e) {
        console.error(e)
    }


    //Все для адаптива

    class RelocateElement{
        constructor({element = null, lastElement = null, appendClass = null, isClone = false}){
            this.element = document.querySelector(element)
            this.lastElement = document.querySelector(lastElement)
            this.appendClass = appendClass
            this.isClone = isClone
        }
        relocate(){
            if(this.isClone === true){
                this.lastElement.appendChild(this.element.cloneNode(true))
            }else{
                this.lastElement.appendChild(this.element)
            }
        }
    }

    //Меню каталога
    const headerDropMenu = document.querySelector('.header_drop_menu'),
        catalogBtn = document.querySelector('#catalog'),
        closeDropMenu = document.querySelector('.close_drop_menu');
    //Пк версия
    if(body.clientWidth > 1340){
        catalogBtn.addEventListener('click', (e)=>{
            e.preventDefault()

            if(headerDropMenu.classList.contains('active')){
                headerDropMenu.classList.remove('active')
            }else{
                headerDropMenu.classList.add('active')
            }
        })
        closeDropMenu.addEventListener('click', ()=>{
            headerDropMenu.classList.remove('active')
        })
    }

    const relocateMainMenu = new RelocateElement({
        element: '.main_menu',
        lastElement: '.burger_menu',

    })
    const relocateDropMenu = new RelocateElement({
        element: '.catalog_menu',
        lastElement: '.catalog_drop'
    })
    if(body.clientWidth <= 1340){
        relocateDropMenu.relocate()
        relocateMainMenu.relocate()
        const burgerMenu = document.querySelector('.burger_menu'),
            burgerBtn = document.querySelector('.burger_btn'),
            burgerLiElements = burgerMenu.querySelectorAll('li');
        burgerBtn.addEventListener('click', ()=>{
            burgerMenu.classList.toggle('fadeInLeft')
            if(burgerMenu.classList.contains('fadeInLeft')){
                body.classList.add('white_theme', 'active_burger')
                burgerBtn.classList.add('active')
                body.style.overflow = 'hidden'
            }else{
                body.classList.remove('white_theme', 'active_burger')
                burgerBtn.classList.remove('active')
                clearClass(burgerLiElements, 'is_dropdown')
                body.style.overflow = ''
            }
        })

        burgerLiElements.forEach(item=>{
            if(item.querySelector('ul')){
                item.classList.add('is_dropdown')
                item.addEventListener('click', (e)=>{
                    let target = e.target
                    if(item.classList.contains('is_dropdown')
                        || target.parentNode.classList.contains('is_dropdown')){
                        e.preventDefault()
                        item.classList.add('active_dropdown')
                    }
                    if(!target.parentNode.classList.contains('is_dropdown')
                        && !target.classList.contains('is_dropdown')
                        && !target.classList.contains('#catalog'))
                    {
                        document.location.href = target.href;
                    }
                })
            }
        })
    }

    if(body.clientWidth < 1200){
        const popupFilterBottom = document.querySelector('.popup_filter_bottom'),
            popupFilterList = popupFilterBottom.querySelector('.popup_filter_list'),
            topFilterList = document.querySelector('.filter_list'),
            topFilterListItem = topFilterList.querySelectorAll('.item'),
            filltersWrapper = document.querySelector('.fillters'),
            filterBtn = filltersWrapper.querySelector('span'),
            closeBtn = popupFilterBottom.querySelector('.close_btn');

        filterBtn.addEventListener('click', ()=>{
            popupFilterBottom.style.display = 'block'
        })
        closeBtn.addEventListener('click', ()=>{
            popupFilterBottom.style.display = ''
        })
        console.log(popupFilterList)
        popupFilterList.appendChild(topFilterList)

        topFilterListItem.forEach(item=>{
            let elementInTopFilterListItem = item.querySelector('ul');
            if(elementInTopFilterListItem != null){
                if(elementInTopFilterListItem.children.length > 10){
                    elementInTopFilterListItem.classList.add('grid_three_column')
                }
            }

            item.addEventListener('click', ()=>{
                clearClass(topFilterListItem, 'active')
                item.classList.add('active')
            })
        })
    }


});
