import './styles.css';
import {LoremIpsum} from "lorem-ipsum";

// console.log('Happy developing ✨')

const chatContainer = document.getElementById('chat');
const chatLinksContainer = document.getElementById('chat-links-container');
const mainSidebar2 = document.getElementById('main-toggle2');
const mainSidebar = document.getElementById('main-sidebar');
const chatLinks = [];
const sendMessage = document.getElementById('send-message');
const overlay = document.getElementById('overlay');
let currentChatId = 0;

const lorem = new LoremIpsum({});

const editable = document.getElementById('write-to-chat');
editable.addEventListener('input', (e) => {
    if (editable.innerText.trim() === '') {
        editable.innerHTML = '';
    }
});
editable.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage.click();
    }
});

document.getElementById('main-toggle-mobile').addEventListener('click', (e) => {
    if(mainSidebar.classList.contains('hidden')) {
        mainSidebar.classList.remove('hidden');
        mainSidebar.classList.add('flex');
        overlay.classList.remove('hidden');
    } else {
        mainSidebar.classList.add('hidden');
        mainSidebar.classList.remove('flex');
        overlay.classList.add('hidden');
    }

});

document.getElementById('close-toggle').addEventListener('click', (e) => {
    mainSidebar.classList.add('hidden');
    mainSidebar.classList.remove('flex');
    overlay.classList.add('hidden');
});

document.getElementById('main-toggle').addEventListener('click', (e) => {
    mainSidebar.classList.add('sidebar-closed');
    mainSidebar2.classList.remove('sidebar-closed');

});
document.getElementById('main-toggle2').addEventListener('click', (e) => {
    mainSidebar.classList.remove('sidebar-closed');
    mainSidebar2.classList.add('sidebar-closed');
});

const chats = [
    {
        id: 0,
        name: 'Что такое Tailwind?',
        history: [
            {from: 'user', text: 'Что такое Tailwind?'},
            {
                from: 'bot',
                text: '                Tailwind CSS — это утилитарный CSS-фреймворк, который позволяет быстро создавать адаптивный и\n' +
                    '                современный интерфейс, используя готовые CSS-классы прямо в HTML-разметке.\n' +
                    '                <br><br>\n' +
                    '                В отличие от традиционных фреймворков вроде Bootstrap, где есть готовые компоненты (кнопки, модальные\n' +
                    '                окна и т.п.), Tailwind делает упор на микро-классы, каждый из которых отвечает за одно конкретное\n' +
                    '                CSS-свойство (например, отступ, цвет, размер текста и т.д.).\n' +
                    '                <br><br>\n' +
                    '                Tailwind особенно популярен среди фронтенд-разработчиков, которые используют React, Vue, Next.js и\n' +
                    '                другие современные фреймворки.'
            },
            {from: 'user', text: ' Какие популярные сайты сделаны на tailwind? Перечисли простым списком.'},
            {
                from: 'bot', text: 'Вот список популярных сайтов и сервисов, использующих Tailwind CSS:\n' +
                    '                <ul class="list-disc pl-5">\n' +
                    '                    <li >GitHub Copilot Docs</li>\n' +
                    '                    <li >Vercel (и их дашборд)</li>\n' +
                    '                    <li >Tailwind UI (официальная библиотека компонентов)</li>\n' +
                    '                    <li >Laravel (оф. сайт фреймворка)</li>\n' +
                    '                    <li > Statamic (CMS на Laravel)</li>\n' +
                    '                    <li >Plausible Analytics</li>\n' +
                    '                    <li >Linear (система управления задачами)</li>\n' +
                    '                    <li >Tailscan (инспектор Tailwind-классов в браузере)</li>\n' +
                    '                    <li >Transistor.fm (подкаст-хостинг)</li>\n' +
                    '                    <li >Refactoring UI (сайт одноимённой книги от авторов Tailwind)</li>\n' +
                    '                </ul>\n' +
                    '                Эти сайты варьируются от документации и панелей управления до SaaS-продуктов и маркетинговых лендингов — Tailwind гибко подходит под любой тип интерфейса.'
            },
            {from: 'user', text: 'users'},
            {from: 'bot', text: 'users'},

        ]
    },
    {
        id: 1,
        name: 'Как создаются сайты?',
        history: [
            {from: 'user', text: 'ЧКак создаются сайты?'},
            {from: 'bot', text: 'Сайты создаются с помощью HTML, CSS, JavaScript, Node.js'},

        ]
    },
    {
        id: 2,
        name: 'Расскажи что такое фронтенд-разработка?',
        history: [
            {from: 'user', text: 'Расскажи что такое фронтенд-разработка?'},
            {
                from: 'bot',
                text: 'Фронтенд-разработка (frontend development) — это создание внешней, пользовательской части веб-сайтов и приложений: всего, что открывается в браузере, выглядит как интерфейс, кнопки, анимации и меню. Фронтенд-разработчик превращает дизайн-макет в интерактивный, адаптивный код, который работает на смартфонах и ПК, используя HTML, CSS и JavaScript.'
            },

        ]
    },
    {
        id: 3,
        name: 'Для чего нужен дизайнер сайтов?',
        history: [
            {from: 'user', text: 'Для чего нужен дизайнер сайтов?'},
            {
                from: 'bot',
                text: 'Дизайнер сайтов (веб-дизайнер) проектирует удобные и привлекательные интерфейсы, превращая цели бизнеса в визуальную структуру. Он создает прототипы, подбирает цвета и шрифты, верстает макеты (в Figma), обеспечивая понятность навигации (UX) и эстетику (UI) для удержания клиентов, повышения конверсии и адаптации сайта под мобильные устройства.'
            },

        ]
    }
];

function renderChat(chatId) {
    chatContainer.innerHTML = '';

    const chat = chats.find((chat) => chat.id === chatId);

    if (!chat) return;

    if (chat.history.length === 0) {
        const emptyChat = document.createElement('div');
        emptyChat.innerText = 'Готов ответить на все ваши вопросы!';
        emptyChat.className = 'flex items-center justify-center h-full text-center text-base font-bold';

        chatContainer.appendChild(emptyChat);
    } else {
        chat.history.forEach(chat => {
            addMessageToContainer(chat.text, chat.from);
        });
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }


}

function addMessageToContainer(message, from = 'user', addTypingEffect = false) {
    const wrapper = document.createElement('article');
    wrapper.className = from === 'user'
        ? 'flex justify-end w-full'
        : 'pb-9 mt-5';

    const bubble = document.createElement('div');
    bubble.className = from === 'user'
        ? 'max-w-full px-4 py-3 rounded-3xl bg-(--chat-user-massage-color) md:max-w-[70%] '
        : '';

    if (addTypingEffect) {
        typeText(bubble, message);
    } else {
        bubble.innerHTML = message;
    }
    wrapper.appendChild(bubble);
    chatContainer.appendChild(wrapper);

}

function typeText(targetElement, text) {
    let index = 0;
    targetElement.innerHTML = '';
    const interval = setInterval(() => {
        if (index < text.length) {
            targetElement.innerHTML += text[index];
            index = index + 1;
            chatContainer.scrollTop = chatContainer.scrollHeight;
        } else {
            clearInterval(interval);
        }

    }, 6);


}

document.querySelectorAll('[data-new-chat]').forEach(chat => {
    chat.addEventListener('click', e => {
        const newId = chats.length;
        const name = 'Новый чат ' + (newId + 1);
        currentChatId = newId;

        chatLinksContainer.innerHTML = '';
        chats.unshift({id: newId, name, history: []});
        populateChatLinks(newId);
        renderChat(newId)

    });
});

// const newChat = document.getElementById('new-chat');
// newChat.addEventListener('click', e => {
//     const newId = chats.length;
//     const name = 'Новый чат ' + (newId + 1);
//     currentChatId = newId;
//
//     chatLinksContainer.innerHTML = '';
//     chats.unshift({id: newId, name, history: []});
//     populateChatLinks(newId);
//     renderChat(newId)


function populateChatLinks(activeChatId) {
    chats.forEach(chat => {
        const li = document.createElement('li');

        const a = document.createElement('a');
        a.href = '#';
        a.innerText = chat.name;
        a.className = chat.id === activeChatId
            ? 'block p-3 rounded-lg truncate leading-none  hover:cursor-pointer bg-neutral-600'
            : 'block p-3  rounded-lg truncate leading-none   hover:cursor-pointer hover:bg-neutral-600';

        a.addEventListener('click', e => {
            currentChatId = chat.id;
            renderChat(chat.id);
            chatLinks.forEach(link => link.classList.remove('bg-neutral-600'))
            e.target.classList.add('bg-neutral-600');
        });

        li.appendChild(a);
        chatLinksContainer.appendChild(li);
        chatLinks.push(a)
    });
}


sendMessage.addEventListener('click', e => {
    const text = editable.innerText.trim();
    if (!text) return;

    const chat = chats.find((chat) => chat.id === currentChatId);
    if (!text) return;

    if (chat.history.length === 0) {
        chatContainer.innerHTML = '';
        const link = document.querySelector('nav ul li:first-child a');
        if (link) {
            link.textContent = text;
        }
        chat.name = text;

    }

    chat.history.push({from: 'user', text});
    editable.innerText = '';
    addMessageToContainer(text);

    const response = lorem.generateParagraphs(Math.floor(Math.random() * 5 + 1));
    chat.history.push({from: 'bot', text: response});
    addMessageToContainer(response, 'bot', true);

});

populateChatLinks(currentChatId);
renderChat(currentChatId);