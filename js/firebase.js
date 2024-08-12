  // Import the functions you need from the SDKs you need
    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
    import { getFirestore,collection,addDoc, onSnapshot,doc,getDocs,getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
        apiKey: "AIzaSyCDpXrS_k-iHG37ivY3thDpyy89ZoFuzRg",
        authDomain: "my-profile-7ce30.firebaseapp.com",
        projectId: "my-profile-7ce30",
        storageBucket: "my-profile-7ce30.appspot.com",
        messagingSenderId: "212076683427",
        appId: "1:212076683427:web:56e48bef4b8691e026df16",
        measurementId: "G-Y926GHCGF8"
    };
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const docref1 = collection(db,'projects');
  const docref2 = collection(db,'comments');
  const docref3 = collection(db,'contacts');
  const date = new Date();



  //--------------------------- notifications functions ---------------------------//
  document.getElementById('closeNotification').addEventListener('click', function() {
    hideNotification();
  });
  function showNotification(message) {
    const notification = document.getElementById('notification');
    const notificationMessage = document.getElementById('notificationMessage');
    notificationMessage.textContent = message;
    notification.classList.remove('hidden');

    // Hide the notification after 3 seconds
    setTimeout(hideNotification, 5000);
  }

  function hideNotification() {
      const notification = document.getElementById('notification');
      notification.classList.add('hidden');
  }
  //--------------------------- get projects functions ---------------------------//
  function getProjects(){
    onSnapshot(docref1,(snapshot)=>{
        let projects=[]
        let prodiv=''
        snapshot.docs.forEach(doc=>{
          projects.push({id:doc.id,...doc.data()})
          let timestamp = doc.data().date;
          let status = doc.data().status;
          const milliseconds = timestamp.seconds * 1000 + Math.floor(timestamp.nanoseconds / 1000000);
          const comdate = new Date(milliseconds); 
          const day = String(comdate.getDate()).padStart(2, '0');
          const month = String(comdate.getMonth() + 1).padStart(2, '0'); // Months are 0-based
          const year = comdate.getFullYear();
          // Format the date as DD/MM/YYYY       
          const formattedDate = `${day}/${month}/${year}`; 
          prodiv+=`
          <div class="pro-card" metadata="${doc.data().status}">
          <div class="pro-head">
          <span class="status">${doc.data().status}</span>
          <span class="label">${doc.data().pro_name}</span>
          </div>
          <p class="discreprion">${doc.data().discripe}</p>
          <span class="date"> ${formattedDate}</span>
          <div class="shadow">
            <a meta-id="${doc.id}"><i class="fa-solid fa-link"></i> see more</a>
          </div>
          </div>
          `;
        })
        document.querySelector('.pro-cards').innerHTML=prodiv;
        //--------------------------- product details functions ---------------------------//
        const links = document.querySelectorAll('.shadow a');
        const details_window = document.querySelector('.details_window');
        links.forEach(link=>{
          link.addEventListener('click',async function(){
            const pro_id= link.getAttribute('meta-id');
            try {
              const parentdocref=doc(db , 'projects', pro_id)
              const docsnap = await getDoc(parentdocref);
              document.querySelector('.details_window .win-content .right .title').innerHTML=docsnap.data().pro_name
              document.querySelector('.details_window .win-content .right .disc').innerHTML=docsnap.data().discripe
              document.querySelector('.details_window .win-content .right .date').innerHTML=docsnap.data().date
              document.querySelector('.details_window .win-content .right .repo_link').href=docsnap.data().link
            } catch (error) {
              console.log(error)
            }
            details_window.classList.remove('hidden')
          })
        })
        //--------------------------- status color functions ---------------------------//
        const statuscol = document.querySelectorAll('.status');
        statuscol.forEach(statecol=>{
            if(statecol.innerHTML.toLocaleLowerCase()=='completed'){
                statecol.style.background=' var(--completed)'
                statecol.innerHTML='<i class="fa-solid fa-circle-check"></i>'
              }
              if(statecol.innerHTML.toLocaleLowerCase()=='not started'){
                statecol.style.background=' var(--not-started)'
                statecol.innerHTML='<i class="fa-solid fa-hourglass-end"></i>'
              }
              if(statecol.innerHTML.toLocaleLowerCase()=='in progress'){
                statecol.style.background=' var(--in-prog)'
                statecol.innerHTML='<i class="fa-solid fa-spinner"></i>'
            }
        })
        //--------------------------- projects filters ---------------------------//
        const cards = document.querySelectorAll('.pro-card');
        const filters = document.querySelectorAll('.filters span');
        for( let i=0;i<filters.length;i++){
            filters[i].addEventListener('click', function(){
              let metadata = filters[i].getAttribute('metadata').toLocaleLowerCase();
                cards.forEach(card => {
                    let cardmeta = card.getAttribute('metadata').toLocaleLowerCase();
                    if (metadata === cardmeta) {
                        card.classList.remove('hidden');
                    } else {
                      card.classList.add('hidden');
                    }                    
                    if (metadata === 'all') {
                      card.classList.remove('hidden');
                    }
                });
            })
        }      
    })
  }
  getProjects();
  //--------------------------- get Comments functions ---------------------------//
  function getComments() {
    onSnapshot(docref2, (snapshot) => {
      let comments = [];
      let comdiv = '';
  
      snapshot.docs.forEach(doc => {
        comments.push({ id: doc.id, ...doc.data() });
        let timestamp = doc.data().date;
        const milliseconds = timestamp.seconds * 1000 + Math.floor(timestamp.nanoseconds / 1000000);
        const comdate = new Date(milliseconds);
        const day = String(comdate.getDate()).padStart(2, '0');
        const month = String(comdate.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const year = comdate.getFullYear();
        // Format the date as DD/MM/YYYY       
        const formattedDate = `${day}/${month}/${year}`;
        let rateNum = doc.data().stars;
        comdiv += `
            <div class="comment-card">
              <div class="comment-img"></div>
              <span>${doc.data().client_name}</span>
              <div class='starsdiv' data-rating="${rateNum}"></div>
              <p>${doc.data().feedback}</p>
              <span>${formattedDate}</span>
            </div>
        `;
      });
      document.querySelector('.comments').innerHTML = comdiv;
      document.querySelectorAll('.starsdiv').forEach(starsdiv => {
        let rateNum = starsdiv.getAttribute('data-rating');
        starsNumber(rateNum, starsdiv);
      });
    });
  }
  getComments();
  function starsNumber(num, starsdiv) {
    for (let i = 0; i < num; i++) {
      const star = document.createElement('label');
      star.classList.add('stars');
      starsdiv.appendChild(star);
    }
  }
  //--------------------------- add Comments functions ---------------------------//
  let comname = document.getElementById('name')
  let comtext = document.getElementById('Feedback')
  let addcom = document.getElementById('submitcom')
  const ratingInputs = document.querySelectorAll('.star-rating input');
  let userRate = 0;
  ratingInputs.forEach(input => {
      input.addEventListener('change', function() {
        userRate = this.value
      });
  });
  function addComment(){
    if(comname.value==''|| comtext.value==''){
        return showNotification("please enter your name and comment")
    }else{
      try {
        addDoc(docref2,{
            client_name:comname.value,
            feedback:comtext.value,
            date:date,
            stars:userRate,
        })
        comname.value='';
        comtext.value='';
    } catch (error) {
      console.log(error)
    }
    showNotification('Thanks for your feedback 🖤')
  }
  }
  addcom.onclick=()=>{
      addComment()
  }
  //--------------------------- contacts functions ---------------------------//
  const email = document.getElementById('email')
  const username = document.getElementById('username')
  const phone = document.getElementById('phone')
  const budget = document.getElementById('budget')
  const taskdisc = document.getElementById('taskdisc');
  const startDate = document.getElementById('startDate')
  const endDate = document.getElementById('endDate')
  const sendHire = document.getElementById('sendHire')
  function sendContact(){
    if(email.value==''||
      username.value==''||
      phone.value==''||
      budget.value==''||
      taskdisc.value==''){
        return showNotification("please complete all the fields")
    }else{
      try {
        addDoc(docref3,{
          email:email.value,
          username:username.value,
          phone:phone.value,
          budget:budget.value,
          taskdisc:taskdisc.value,
          startDate:startDate.value,
          endDate:endDate.value,
          date:date,
        })
        email.value='',
        username.value='',
        phone.value='',
        budget.value='',
        taskdisc.value=''
        startDate.value='',
        endDate.value=''
    } catch (error) {
      console.log(error)
    }
    showNotification('Thanks for your hiring me, i will contact you soon 🖤');
    const windowcon = document.querySelector('.window');
    windowcon.classList.add('hidden')
  }
  }
  sendHire.onclick=()=>{
    sendContact();
}
//--------------------------- count Documents functions ---------------------------//
async function countDocuments(collectionRef) {
  try { // Use query with limit  
      const snapshot = await getDocs(collectionRef);
      // Empty check and size for total count
      return snapshot.empty ? 0 : snapshot.size;
      } catch (error) {
          console.error("Error counting documents:", error);
      return 0; // Return 0 on error for safety
      }
}
const number1 = document.getElementById('number1');
countDocuments(docref1).then((count) => {
  const interval = 500;
  let startValue1 = -1;
  const endValue = count;
  let duration = Math.floor(interval / endValue);
  let counter =setInterval(function(){
      startValue1 +=1;
      number1.innerHTML = startValue1;
      if(startValue1 ==endValue){
          clearInterval(counter);
      }
  },duration);
});
const number2 = document.getElementById('number2');
countDocuments(docref2).then((count) => {
  const interval = 500;
  let startValue1 = -1;
  const endValue = count;
  let duration = Math.floor(interval / endValue);
  let counter =setInterval(function(){
      startValue1 +=1;
      number2.innerHTML = startValue1;
      if(startValue1 ==endValue){
          clearInterval(counter);
      }
  },duration);
});
const number3 = document.getElementById('number3');
countDocuments(docref3).then((count) => {
  const interval = 500;
  let startValue1 = -1;
  const endValue = count;
  let duration = Math.floor(interval / endValue);
  let counter =setInterval(function(){
      startValue1 +=1;
      number3.innerHTML = startValue1;
      if(startValue1 ==endValue){
          clearInterval(counter);
      }
  },duration);
});