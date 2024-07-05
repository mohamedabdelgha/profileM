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
    //--------------------------- onload window functions ---------------------------//
    window.onload=()=>{
        filters[0].classList.add('active');
        nav_links[0].classList.add('selected');
    }
    //--------------------------- input validation functions ---------------------------//
    const form = document.querySelector('form');
    const inputs = document.querySelectorAll('.textarea')
    const validate = [0,1,2,3,4,5,6,7,8,9,'/','*','-','+','=','.','@','{','}','[',']','(',')',"'",'?','<','>'];
    for(let i=0; i<validate.length;i++){
        inputs.forEach(input=>{
            input.addEventListener('keyup', ()=>{
                if(input.value.includes(validate[i])){
                    console.log('invalid')
                    input.style.border='1px solid red'
                }
            })
            })
        }
    //--------------------------- close window functions ---------------------------//
    const close_win = document.querySelector('.window #close-win');
    const windowcon = document.querySelector('.window');
    const hirebtn = document.querySelector('#hirebtn');
    close_win.onclick=()=>{
        windowcon.classList.add('hidden')
    }
    hirebtn.onclick=()=>{
        windowcon.classList.remove('hidden')
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