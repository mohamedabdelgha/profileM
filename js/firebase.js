  // Import the functions you need from the SDKs you need
    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
    import { getFirestore,collection,addDoc, onSnapshot,doc,getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
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



  //--------------------------- get projects functions ---------------------------//
  function getProjects(){
    onSnapshot(docref1,(snapshot)=>{
        let projects=[]
        let prodiv=''
        snapshot.docs.forEach(doc=>{
            projects.push({id:doc.id,...doc.data()})
            let timestamp = doc.data().date;
        const milliseconds = timestamp.seconds * 1000 + Math.floor(timestamp.nanoseconds / 1000000);
        const comdate = new Date(milliseconds); 
        const day = String(comdate.getDate()).padStart(2, '0');
        const month = String(comdate.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const year = comdate.getFullYear();
        // Format the date as DD/MM/YYYY       
        const formattedDate = `${day}/${month}/${year}`; 

            prodiv+=`
            <div class="pro-card">
                        <div class="pro-head">
                            <span class="label">${doc.data().pro_name}</span>
                            <span class="status">${doc.data().status}</span>
                        </div>
                        <p class="discreprion">${doc.data().discripe}</p>
                        <span class="date"> ${formattedDate}</span>
            </div>
            `;
        })
        document.querySelector('.pro-cards').innerHTML=prodiv;
        //--------------------------- status color functions ---------------------------//
        const statuscol = document.querySelectorAll('.status');
        statuscol.forEach(statecol=>{
            if(statecol.innerHTML.toLocaleLowerCase()=='completed'){
                statecol.style.background=' var(--completed)'
            }
            if(statecol.innerHTML.toLocaleLowerCase()=='not started'){
                statecol.style.background=' var(--not-started)'
            }
            if(statecol.innerHTML.toLocaleLowerCase()=='in progress'){
                statecol.style.background=' var(--in-prog)'
            }
        })
    })
  }
  getProjects();
  
  
  //--------------------------- get Comments functions ---------------------------//
  function getComments(){
    onSnapshot(docref2,(snapshot)=>{
      let comments=[]
      let comdiv=''
      snapshot.docs.forEach(doc=>{
        comments.push({id:doc.id,...doc.data()})
        let timestamp = doc.data().date;
        const milliseconds = timestamp.seconds * 1000 + Math.floor(timestamp.nanoseconds / 1000000);
        const comdate = new Date(milliseconds); 
        const day = String(comdate.getDate()).padStart(2, '0');
        const month = String(comdate.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const year = comdate.getFullYear();
        // Format the date as DD/MM/YYYY       
        const formattedDate = `${day}/${month}/${year}`; 

        comdiv+=`
        <div class="comment">
        <i class="fa-solid fa-circle-user"></i>
        <div class="comment-card">
        <span>${doc.data().client_name}</span>
        <span>${formattedDate}</span>
        <p>${doc.data().feedback}</p>
        </div>
            </div>
            `;
          })
          document.querySelector('.comments').innerHTML=comdiv;
        })
      }
      getComments();
  
      
  //--------------------------- add Comments functions ---------------------------//
  let comname = document.getElementById('name')
  let comtext = document.getElementById('Feedback')
  let addcom = document.getElementById('submitcom')
  function addComment(){
    if(comname.value==''|| comtext.value==''){
        return alert("please enter your name and comment")
    }else{
    try {
        addDoc(docref2,{
            client_name:comname.value,
            feedback:comtext.value,
            date:date,
            stars:2,
        })
        comname.value='';
        comtext.value='';
    } catch (error) {
        console.log(error)
    }}
  }
  addcom.onclick=()=>{
      addComment();
  }
