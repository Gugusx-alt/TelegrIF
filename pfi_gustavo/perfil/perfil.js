
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js';
import { getDatabase, ref, set } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js';

//configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBJMFl4EIXVAs7INbq1GHKccN6gAPijLnY",
  authDomain: "perfil-cc0ca.firebaseapp.com",
  projectId: "perfil-cc0ca",
  storageBucket: "perfil-cc0ca.firebasestorage.app",
  messagingSenderId: "843534794888",
  appId: "1:843534794888:web:6d3bee22a721c03ed69f3d",
  measurementId: "G-175Z0ZXQMX"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


const db = getDatabase(app);

// Função para salvar os dados do perfil
document.getElementById("profile-form").addEventListener("submit", function(event) {
    event.preventDefault();

   
    const username = document.getElementById("username").value;
    const about = document.getElementById("about").value;

    
    const userRef = ref(db, 'users/' + username);

    // Salvar os dados no Firebase
    set(userRef, {
        username: username,
        about: about
    }).then(() => {
        
        window.location.href = './perfil_usuario.html'; //Manda para a página de perfil exclusiva 
    }).catch((error) => {
        console.error("Erro ao salvar os dados: ", error);
    });
});
