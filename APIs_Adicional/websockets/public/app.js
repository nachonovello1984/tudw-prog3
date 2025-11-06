// Elementos del DOM
const messagesContainer = document.getElementById('messages');
const messageInput = document.getElementById('message-input');
const usernameInput = document.getElementById('username');
const sendBtn = document.getElementById('send-btn');
const statusElement = document.getElementById('status');
const usersCountElement = document.getElementById('users-count');

// WebSocket
let ws = null;
let reconnectInterval = null;

// Conectar al servidor WebSocket
function connect() {
  const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  const wsUrl = `${protocol}//${window.location.host}`;
  
  ws = new WebSocket(wsUrl);

  ws.onopen = () => {
    console.log('Conectado al servidor WebSocket');
    updateStatus(true);
    sendBtn.disabled = false;
    
    // Limpiar intervalo de reconexión si existe
    if (reconnectInterval) {
      clearInterval(reconnectInterval);
      reconnectInterval = null;
    }
  };

  ws.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      handleMessage(data);
    } catch (error) {
      console.error('Error al procesar mensaje:', error);
    }
  };

  ws.onclose = () => {
    console.log('Desconectado del servidor WebSocket');
    updateStatus(false);
    sendBtn.disabled = true;
    
    // Intentar reconectar cada 3 segundos
    if (!reconnectInterval) {
      reconnectInterval = setInterval(() => {
        console.log('Intentando reconectar...');
        connect();
      }, 3000);
    }
  };

  ws.onerror = (error) => {
    console.error('Error en WebSocket:', error);
  };
}

// Actualizar estado de conexión
function updateStatus(connected) {
  if (connected) {
    statusElement.textContent = 'Conectado';
    statusElement.className = 'connected';
  } else {
    statusElement.textContent = 'Desconectado';
    statusElement.className = 'disconnected';
  }
}

// Manejar mensajes recibidos
function handleMessage(data) {
  switch (data.type) {
    case 'system':
      addSystemMessage(data.message);
      if (data.totalUsers !== undefined) {
        updateUsersCount(data.totalUsers);
      }
      break;
    case 'message':
      addChatMessage(data);
      break;
    default:
      console.log('Tipo de mensaje desconocido:', data.type);
  }
}

// Agregar mensaje del sistema
function addSystemMessage(message) {
  const messageElement = document.createElement('div');
  messageElement.className = 'message system';
  messageElement.textContent = message;
  messagesContainer.appendChild(messageElement);
  scrollToBottom();
}

// Agregar mensaje de chat
function addChatMessage(data) {
  const currentUsername = usernameInput.value.trim() || 'Anónimo';
  const isOwnMessage = data.username === currentUsername;
  
  const messageElement = document.createElement('div');
  messageElement.className = `message ${isOwnMessage ? 'own' : 'other'}`;
  
  const headerElement = document.createElement('div');
  headerElement.className = 'message-header';
  
  const usernameElement = document.createElement('span');
  usernameElement.className = 'username';
  usernameElement.textContent = data.username;
  
  const timestampElement = document.createElement('span');
  timestampElement.className = 'timestamp';
  timestampElement.textContent = formatTime(data.timestamp);
  
  headerElement.appendChild(usernameElement);
  headerElement.appendChild(timestampElement);
  
  const textElement = document.createElement('div');
  textElement.className = 'message-text';
  textElement.textContent = data.message;
  
  messageElement.appendChild(headerElement);
  messageElement.appendChild(textElement);
  
  messagesContainer.appendChild(messageElement);
  scrollToBottom();
}

// Formatear hora
function formatTime(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleTimeString('es-ES', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
}

// Actualizar contador de usuarios
function updateUsersCount(count) {
  usersCountElement.textContent = `${count} usuario${count !== 1 ? 's' : ''}`;
}

// Scroll al final
function scrollToBottom() {
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Enviar mensaje
function sendMessage() {
  const message = messageInput.value.trim();
  const username = usernameInput.value.trim() || 'Anónimo';
  
  if (!message) {
    return;
  }
  
  if (ws && ws.readyState === WebSocket.OPEN) {
    const data = {
      username: username,
      message: message
    };
    
    ws.send(JSON.stringify(data));
    messageInput.value = '';
    messageInput.focus();
  } else {
    addSystemMessage('No estás conectado al servidor');
  }
}

// Event listeners
sendBtn.addEventListener('click', sendMessage);

messageInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    sendMessage();
  }
});

// Guardar nombre de usuario en localStorage
usernameInput.addEventListener('change', () => {
  const username = usernameInput.value.trim();
  if (username) {
    localStorage.setItem('chatUsername', username);
  }
});

// Cargar nombre de usuario guardado
const savedUsername = localStorage.getItem('chatUsername');
if (savedUsername) {
  usernameInput.value = savedUsername;
}

// Conectar al cargar la página
connect();

// Mensaje de bienvenida
window.addEventListener('load', () => {
  addSystemMessage('Bienvenido al chat. Escribe tu nombre y comienza a chatear.');
});
