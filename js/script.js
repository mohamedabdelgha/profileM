    //--------------------------- menu transition ---------------------------//
    document.addEventListener("DOMContentLoaded", function() {
        setTimeout(() => {
            const loader = document.querySelector('.loading-container');
            loader.style.display = 'none'; // Hide the loader
        }, 1000); // 3 seconds
    });
    //--------------------------- menu transition ---------------------------//
    const nav_links = document.querySelectorAll('.nav-links li a');
    for( let x=0;x<nav_links.length;x++){
        nav_links[x].addEventListener('click', function(){
            nav_links.forEach(link=>{
                link.classList.remove('selected');
            })
            this.classList.add('selected');
        });
    }
    //--------------------------- text transition ---------------------------//
    const text=document.getElementById("sec-text");
    var styleElem = document.head.appendChild(document.createElement("style"));
    const textanime=document.getElementById("textanime");
    const timeLoad=()=>{
        setTimeout(() => {
            text.textContent="Web Developer."
        }, 0);
        setTimeout(() => {
            text.textContent="Mobile Developer."
        }, 4000);
        setTimeout(() => {
            text.textContent="Graphic Designer."
        }, 8000);
    }
    timeLoad();
    setInterval(timeLoad, 12000)
    const menuopen = document.getElementById('menuopen');
    menuopen.onclick=()=>{
        const navigation = document.querySelector('nav')
        navigation.classList.toggle('open')
    }
    //--------------------------- dark mode ---------------------------//
    let getMode = localStorage.getItem("mode")
    let modeToggle = document.querySelectorAll(".mode-toggle")
    let body = document.querySelector("body");
    if(getMode && getMode ==="dark"){
        body.classList.toggle("dark");
    }
    modeToggle.forEach(modeToggle=>{
        modeToggle.addEventListener("click", () =>{
            body.classList.toggle("dark");
            if(body.classList.contains("dark")){
                localStorage.setItem("mode", "dark");
            }else{
                localStorage.setItem("mode", "light");
            }
        });
    })
    //--------------------------- projects filters ---------------------------//
    const filters = document.querySelectorAll('.filters span');
    for( let i=0;i<filters.length;i++){
        filters[i].addEventListener('click', function(){
            filters.forEach(filter=>{
                filter.classList.remove('active');
            })
            this.classList.add('active');
        })
    }

    //--------------------------- input validation functions ---------------------------//
    const form = document.querySelector('form');
    const inputs = document.querySelectorAll('.textarea')
    const validate = [0,1,2,3,4,5,6,7,8,9,'/','*','-','+','=','.','@','{','}','[',']','(',')',"'",'?','<','>'];
    for(let i=0; i<validate.length;i++){
        inputs.forEach(input=>{
            input.addEventListener('keyup', ()=>{
                if(input.value.includes(validate[i])){
                    input.style.border='1px solid red'
                }
            })
            })
        }
    //--------------------------- close window functions ---------------------------//
    const close_win = document.querySelector('.window #close-win');
    const windowcon = document.querySelector('.window');
    const hirebtn = document.querySelectorAll('#hirebtn');
    close_win.onclick=()=>{
        windowcon.classList.add('hidden')
    }
    hirebtn.forEach(btn=>{
        btn.onclick=()=>{
            windowcon.classList.remove('hidden')
        }
    })
    //--------------------------- close details_window functions ---------------------------//
    const close_details_window = document.querySelector('.details_window #close-win');
    const details_window = document.querySelector('.details_window');
    close_details_window.onclick=()=>{
        details_window.classList.add('hidden')
    }
    //--------------------------- navbar customization functions ---------------------------//
    const sections = document.querySelectorAll('.section');
    window.onscroll=()=>{
        sections.forEach(sec =>{
            let top = window.scrollY;
            let offset = sec.offsetTop;
            let height = sec.offsetHeight;
            let id = sec.getAttribute('id');
            if(top >= offset && top < offset + height){
                nav_links.forEach(link =>{
                    link.classList.remove('selected');
                    document.querySelector('.nav-links li a[href*='+id+']').classList.add('selected')
                    })
                }
        })
    }
    //--------------------------- search_input functions ---------------------------//
    const search_input = document.querySelector('.search-input input');
    const search_window = document.querySelector('.search_window');
    const search_window_close = document.querySelector('.search_window #close-win');
    const search_input_con = document.querySelector('.search-input');
    search_input.onfocus=()=>{
        search_input_con.classList.add("active");
        search_window.classList.remove('hidden');
    }    
    search_window_close.onclick=()=>{
        search_window.classList.add('hidden');
        search_input_con.classList.remove("active");
    }
    //--------------------------- options button functions ---------------------------//
    const options_btn = document.querySelector('.options');
    const options_menu = document.querySelector('.options_menu');
    const options_menu_li = document.querySelectorAll('.options_menu ul li');
    options_btn.onclick=()=>{
        options_menu.classList.toggle('active');
    };
    options_menu_li.forEach(options_menu_li=>{
        options_menu_li.onclick=()=>{
            options_menu.classList.remove('active');
        }
    })
    //--------------------------- footer functions ---------------------------//
    const footerItems = document.querySelectorAll('.footer #hireme i');
    const footerLists = document.querySelectorAll('.footer .lists ul');
    for(let x=0;x<footerItems.length;x++){
        footerItems[x].addEventListener('click',function(){
            footerItems.forEach(item=>{
                item.classList.remove('selected')
            })
            footerItems[x].classList.add('selected')
            let metadata = footerItems[x].getAttribute('meta-data');
            footerLists.forEach(list=>{
                list.classList.add('hiddenUL')
            })
            document.getElementById(metadata).classList.remove('hiddenUL')
        })
    }
    //--------------------------- onload window functions ---------------------------//
    window.onload=()=>{
        filters[0].classList.add('active');
        nav_links[0].classList.add('selected');
        footerItems[0].classList.add('selected')
        let ULmetadata = footerItems[0].getAttribute('meta-data');
        footerLists.forEach(list=>{
            list.classList.add('hiddenUL')
        })
        document.getElementById(ULmetadata).classList.remove('hiddenUL')
    }
    //portofolio slider functions -------------------------------------------------------------------------------------------------
    const cardsWraper = document.querySelector('.cardsWraper');
    const cardsCon = document.querySelector('.comments');
    const arrowsScroll = document.querySelectorAll('.cardsWraper i');
    const firstCardWidth = cardsCon.querySelector('.comment-card').offsetWidth;
    console.log(firstCardWidth)
    const secondCardWidth = firstCardWidth+70;
    const cardsConChildren = [...cardsCon.children];
    let cardPreview = Math.round(cardsCon.offsetWidth / secondCardWidth);
    let isDragging = false , startX , startScrollLeft , timeoutId;
    cardsConChildren.slice(-cardPreview).reverse().forEach(card =>{
        cardsCon.insertAdjacentHTML('afterbegin', card.outerHTML);
    })
    cardsConChildren.slice(0, cardPreview).forEach(card =>{
        cardsCon.insertAdjacentHTML('beforeend', card.outerHTML);
    })
    arrowsScroll.forEach( btn =>{
        btn.addEventListener('click' , ()=>{
            cardsCon.scrollLeft+=btn.id === 'left' ? -secondCardWidth : secondCardWidth ;
        });
    });
    const dragstart = (e)=>{
        isDragging=true;
        cardsCon.classList.add('dragging');
        startX = e.pageX;
        startScrollLeft = cardsCon.scrollLeft;
    };
    const dragging = (e)=>{
        if(!isDragging) return;
        cardsCon.scrollLeft =startScrollLeft- (e.pageX - startX);
    }
    const dragstop = ()=>{
        isDragging=false;
        cardsCon.classList.remove('dragging');
    }
    const infiniteScroll =  ()=>{
        if(cardsCon.scrollLeft === 0){
            cardsCon.classList.add('notransition')
            cardsCon.scrollLeft = cardsCon.scrollWidth - (2*cardsCon.offsetWidth);
            cardsCon.classList.remove('notransition')
        }else if(Math.ceil(cardsCon.scrollLeft) === cardsCon.scrollWidth - cardsCon.offsetWidth){
            cardsCon.classList.add('notransition')
            cardsCon.scrollLeft = cardsCon.offsetWidth;
            cardsCon.classList.remove('notransition')
        }
        clearTimeout(timeoutId);
        if(!cardsWraper.matches(':hover')) autoPlay();
    }
    const autoPlay = ()=>{
        if(window.innerWidth <800) return;
        timeoutId = setTimeout(()=> cardsCon.scrollLeft += secondCardWidth,2500)
    }
    autoPlay();
    cardsCon.addEventListener( 'mousedown', dragstart );
    cardsCon.addEventListener( 'mousemove', dragging );
    document.addEventListener( 'mouseup', dragstop );
    cardsCon.addEventListener( 'scroll', infiniteScroll );
    cardsWraper.addEventListener( 'mouseenter', ()=>{clearTimeout(timeoutId);} );
    cardsWraper.addEventListener( 'mouseleave', autoPlay );
