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
    modeToggle = document.querySelector(".mode-toggle")
    body = document.querySelector("body");

    if(getMode && getMode ==="dark"){
        body.classList.toggle("dark");
    }
    modeToggle.addEventListener("click", () =>{
        body.classList.toggle("dark");
        if(body.classList.contains("dark")){
            localStorage.setItem("mode", "dark");
        }else{
            localStorage.setItem("mode", "light");
        }
    });
    //--------------------------- projects filters ---------------------------//
    const filters = document.querySelectorAll('.filters span');
    for( let i=0;i<filters.length;i++){
        filters[i].addEventListener('click', function(){
            filters.forEach(filter=>{
                filter.classList.remove('active');
            })
            this.classList.add('active');
            let metadata = filters[i].getAttribute('metadata').toLocaleLowerCase();
            console.log(metadata)
        })
    }
    
    //--------------------------- onload window functions ---------------------------//
    window.onload=()=>{
        filters[0].classList.add('active');
        nav_links[0].classList.add('selected');
    }
    //--------------------------- input validation functions ---------------------------//
    const form = document.querySelector('form');
    const inputs = document.querySelectorAll('input')
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
    const close_win = document.getElementById('close-win');
    const windowcon = document.querySelector('.window');
    const hirebtn = document.querySelectorAll('#hirebtn');
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