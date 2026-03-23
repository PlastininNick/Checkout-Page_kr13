import './styles.css';


const element1 = document.getElementById('Button1');
const element2 = document.getElementById('Button2');

element1.addEventListener('mouseenter', () => {
    const secondChild = element1.children[1]
    element1.firstElementChild.classList.add('hidden'); // Добавляем класс при наведении
    secondChild.classList.remove('hidden');
});
element1.addEventListener('mouseleave', () => {
    const secondChild = element1.children[1]
    element1.firstElementChild.classList.remove('hidden');
    secondChild.classList.add('hidden');
});

element2.addEventListener('mouseenter', () => {
    const secondChild = element2.children[1]
    element2.firstElementChild.classList.add('hidden'); // Добавляем класс при наведении
    secondChild.classList.remove('hidden');
});
element2.addEventListener('mouseleave', () => {
    const secondChild = element2.children[1]
    element2.firstElementChild.classList.remove('hidden');
    secondChild.classList.add('hidden');
});


