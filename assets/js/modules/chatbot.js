const CHAT_API_BASE_URL = 'https://ai-persona-chatbot-uzdn.onrender.com';

let currentSessionId = sessionStorage.getItem('chatbot_session_id') || null;
let isChatRequestPending = false;

/**
 * Initialize chatbot UI interactions.
 */
export const initChatbot = () => {
  const chatbotBtn = document.getElementById('chatbot-btn');
  const chatbotPopup = document.getElementById('chatbot-popup');
  const closeChatbot = document.getElementById('close-chatbot');
  const chatbotOverlay = document.getElementById('chatbot-overlay');
  const userInput = document.getElementById('user-input');
  const chatBox = document.getElementById('chat-box');

  if (!chatbotBtn || !chatbotPopup || !closeChatbot || !chatbotOverlay || !userInput) return;

  const openChatbot = () => {
    chatbotPopup.style.display = 'flex';
    chatbotOverlay.style.display = 'block';
    document.body.classList.add('chatbot-open');
    userInput.focus();
    ensureChatbotInViewport(chatbotPopup);
  };

  const closeChatbotPopup = () => {
    chatbotPopup.style.display = 'none';
    chatbotOverlay.style.display = 'none';
    document.body.classList.remove('chatbot-open');
  };

  chatbotBtn.addEventListener('click', openChatbot);
  closeChatbot.addEventListener('click', closeChatbotPopup);
  chatbotOverlay.addEventListener('click', closeChatbotPopup);

  chatbotOverlay.addEventListener('wheel', (e) => {
    e.preventDefault();
  }, { passive: false });

  chatbotOverlay.addEventListener('touchmove', (e) => {
    e.preventDefault();
  }, { passive: false });

  userInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  });

  if (chatBox) {
    chatBox.addEventListener('click', (event) => {
      const button = event.target && event.target.closest
        ? event.target.closest('.chat-suggestion')
        : null;
      if (!button) return;

      const suggestion = button.getAttribute('data-suggestion') || '';
      const text = suggestion.trim();
      if (!text) return;

      userInput.value = text;
      sendMessage();
    });
  }

  setupDraggable(chatbotPopup);
  window.addEventListener('resize', () => ensureChatbotInViewport(chatbotPopup));
};

/**
 * Send user message and stream chatbot response.
 * @returns {Promise<void>}
 */
export const sendMessage = async () => {
  const inputField = document.getElementById('user-input');
  const sendButton = document.getElementById('send-button');
  if (!inputField) return;

  const message = inputField.value.trim();
  if (message === '' || isChatRequestPending) return;

  appendMessage('You', message);
  inputField.value = '';
  isChatRequestPending = true;
  if (sendButton) sendButton.disabled = true;

  const chatBox = document.getElementById('chat-box');
  if (!chatBox) {
    isChatRequestPending = false;
    if (sendButton) sendButton.disabled = false;
    return;
  }

  const botMessageElement = document.createElement('div');
  botMessageElement.classList.add('message', 'bot');
  botMessageElement.innerHTML = '<strong>Yash:</strong> <span class="typing-dots"><span>.</span><span>.</span><span>.</span></span>';
  chatBox.appendChild(botMessageElement);
  chatBox.scrollTop = chatBox.scrollHeight;

  try {
    const response = await fetch(`${CHAT_API_BASE_URL}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: message,
        session_id: currentSessionId
      })
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    if (!response.body) throw new Error('Readable stream is not available in this browser.');

    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let buffer = '';
    let answerText = '';
    let latestStatus = '';

    botMessageElement.innerHTML = '<strong>Yash:</strong> ';
    const textContainer = document.createElement('span');
    botMessageElement.appendChild(textContainer);

    const renderStatus = (status) => {
      latestStatus = status;
      textContainer.innerHTML = `<span class="chat-status">${formatBotMessage(status)}</span>`;
      chatBox.scrollTop = chatBox.scrollHeight;
    };

    const renderAnswer = (answer) => {
      answerText = answer;
      textContainer.innerHTML = formatBotMessage(answerText);
      chatBox.scrollTop = chatBox.scrollHeight;
    };

    const handleSseBlock = (block) => {
      const dataLines = block
        .split(/\r?\n/)
        .filter((line) => line.startsWith('data:'))
        .map((line) => line.slice(5).trimStart());

      if (!dataLines.length) return;

      const data = dataLines.join('\n').trim();
      if (!data || data === '[DONE]') return;

      try {
        const event = JSON.parse(data);

        if (event.session_id) {
          currentSessionId = event.session_id;
          sessionStorage.setItem('chatbot_session_id', currentSessionId);
        }

        if (event.status) renderStatus(event.status);
        if (event.answer) renderAnswer(event.answer);
        if (event.error) throw new Error(event.error);
      } catch (error) {
        if (error instanceof SyntaxError) {
          renderAnswer(data);
          return;
        }
        throw error;
      }
    };

    while (true) {
      const { value, done } = await reader.read();
      if (value) {
        const chunk = decoder.decode(value, { stream: !done });
        buffer += chunk;

        const blocks = buffer.split(/\r?\n\r?\n/);
        buffer = blocks.pop() || '';
        blocks.forEach(handleSseBlock);
      }

      if (done) break;
    }

    const remaining = buffer.trim();
    if (remaining) handleSseBlock(remaining);

    if (!answerText && latestStatus) {
      textContainer.innerHTML = '<span class="chat-status">Request finished, but no answer was returned.</span>';
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Chat error:', error);
    botMessageElement.innerHTML = '<strong>Yash:</strong> <span style="color: #d9534f;">Error connecting to the server. Please try again.</span>';
  } finally {
    isChatRequestPending = false;
    if (sendButton) sendButton.disabled = false;
    inputField.focus();
  }
};

/**
 * Escape and render supported markdown styles.
 * @param {string} text
 * @returns {string}
 */
const formatBotMessage = (text) => {
  let formatted = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  formatted = formatted.replace(
    /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
  );

  formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  formatted = formatted.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
  formatted = formatted.replace(/`(.*?)`/g, '<code>$1</code>');
  formatted = formatted.replace(/\n/g, '<br>');

  return formatted;
};

/**
 * Append a chat message.
 * @param {'You'|'Yash'} sender
 * @param {string} message
 */
const appendMessage = (sender, message) => {
  const chatBox = document.getElementById('chat-box');
  if (!chatBox) return;

  const messageElement = document.createElement('div');
  messageElement.classList.add('message', sender === 'You' ? 'user' : 'bot');
  messageElement.innerHTML = `<strong>${sender}:</strong> ${formatBotMessage(message)}`;
  chatBox.appendChild(messageElement);
  chatBox.scrollTop = chatBox.scrollHeight;
};

/**
 * Keep popup inside viewport bounds.
 * @param {HTMLElement} chatbotPopup
 */
const ensureChatbotInViewport = (chatbotPopup) => {
  if (chatbotPopup.style.display === 'none') return;

  const margin = 8;
  const rect = chatbotPopup.getBoundingClientRect();
  let left = rect.left;
  let top = rect.top;

  if (rect.right > window.innerWidth - margin) left -= rect.right - (window.innerWidth - margin);
  if (rect.bottom > window.innerHeight - margin) top -= rect.bottom - (window.innerHeight - margin);
  if (rect.left < margin) left = margin;
  if (rect.top < margin) top = margin;

  if (left !== rect.left || top !== rect.top) {
    chatbotPopup.style.transform = 'none';
    chatbotPopup.style.right = 'auto';
    chatbotPopup.style.bottom = 'auto';
    chatbotPopup.style.left = `${left}px`;
    chatbotPopup.style.top = `${top}px`;
  }
};

/**
 * Enable draggable popup behavior via chatbot header.
 * @param {HTMLElement} chatbotPopup
 */
const setupDraggable = (chatbotPopup) => {
  const dragHandle = chatbotPopup.querySelector('.chatbot-header');
  if (!dragHandle) return;

  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;

  const onPointerMove = (e) => {
    if (!isDragging) return;

    const rect = chatbotPopup.getBoundingClientRect();
    const margin = 8;

    let nextLeft = e.clientX - offsetX;
    let nextTop = e.clientY - offsetY;

    const maxLeft = window.innerWidth - rect.width - margin;
    const maxTop = window.innerHeight - rect.height - margin;

    nextLeft = Math.min(Math.max(margin, nextLeft), Math.max(margin, maxLeft));
    nextTop = Math.min(Math.max(margin, nextTop), Math.max(margin, maxTop));

    chatbotPopup.style.left = `${nextLeft}px`;
    chatbotPopup.style.top = `${nextTop}px`;
  };

  const stopDragging = () => {
    if (!isDragging) return;
    isDragging = false;
    chatbotPopup.classList.remove('dragging');
    document.removeEventListener('pointermove', onPointerMove);
    document.removeEventListener('pointerup', stopDragging);
  };

  dragHandle.addEventListener('pointerdown', (e) => {
    if (e.target && e.target.closest('#close-chatbot')) return;

    const rect = chatbotPopup.getBoundingClientRect();
    chatbotPopup.style.transform = 'none';
    chatbotPopup.style.right = 'auto';
    chatbotPopup.style.bottom = 'auto';
    chatbotPopup.style.left = `${rect.left}px`;
    chatbotPopup.style.top = `${rect.top}px`;

    isDragging = true;
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    chatbotPopup.classList.add('dragging');

    document.addEventListener('pointermove', onPointerMove);
    document.addEventListener('pointerup', stopDragging);
    e.preventDefault();
  });
};
