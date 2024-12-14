
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get } from "firebase/database";

// Sua configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBJMFl4EIXVAs7INbq1GHKccN6gAPijLnY",
  authDomain: "perfil-cc0ca.firebaseapp.com",
  projectId: "perfil-cc0ca",
  storageBucket: "perfil-cc0ca.firebasestorage.app",
  messagingSenderId: "843534794888",
  appId: "1:843534794888:web:6d3bee22a721c03ed69f3d",
  measurementId: "G-175Z0ZXQMX"
};

// Inicializando o Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Obter o ID do usuário da URL
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('id');

// Carregar os dados do usuário do Firebase
get(ref(database, 'users/' + userId)).then((snapshot) => {
  const userData = snapshot.val();
  if (userData) {
    // Exibindo as informações do usuário na página
    document.getElementById('username-display').textContent = userData.username;
    document.getElementById('about-display').textContent = userData.about;
  } else {
    alert("Usuário não encontrado.");
  }
}).catch((error) => {
  console.error("Erro ao carregar os dados: ", error);
});
