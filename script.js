const books = [
    { id: 1, title: "قرآن مجید (اردو ترجمہ)", category: "quran", price: 1500, img: "https://via.placeholder.com/200" },
    { id: 2, title: "صحیح بخاری", category: "hadees", price: 2000, img: "https://via.placeholder.com/200" },
    { id: 3, title: "تعلیم القرآن", category: "quran", price: 1200, img: "https://via.placeholder.com/200" },
    { id: 4, title: "بہشتی زیور", category: "fiqh", price: 1100, img: "https://via.placeholder.com/200" },
];

let cart = [];

function displayBooks(filter = 'all') {
    const grid = document.getElementById('books-grid');
    grid.innerHTML = '';
    const filtered = filter === 'all' ? books : books.filter(b => b.category === filter);
    
    filtered.forEach(book => {
        grid.innerHTML += `
            <div class="book-card">
                <img src="${book.img}" alt="${book.title}">
                <h3>${book.title}</h3>
                <p class="price">Rs. ${book.price}</p>
                <button class="add-btn" onclick="addToCart(${book.id})">+ کارٹ میں ڈالیں</button>
            </div>
        `;
    });
}

function addToCart(id) {
    const book = books.find(b => b.id === id);
    cart.push(book);
    updateCart();
}

function updateCart() {
    document.getElementById('cart-count').innerText = cart.length;
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    let total = 0;
    cart.forEach((item, index) => {
        total += item.price;
        cartItems.innerHTML += `<p>${item.title} - ${item.price} <button onclick="removeFromCart(${index})">❌</button></p>`;
    });
    document.getElementById('total-price').innerText = `ٹوٹل: ${total} روپے`;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

function toggleCart() {
    document.getElementById('cart-sidebar').classList.toggle('active');
}

function filterBooks(cat) {
    displayBooks(cat);
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
}

function orderViaWhatsApp() {
    let msg = "السلام علیکم، میں یہ کتابیں آرڈر کرنا چاہتا ہوں:\n";
    cart.forEach(item => msg += `- ${item.title} (${item.price} روپے)\n`);
    const win = window.open(`https://wa.me/923001234567?text=${encodeURIComponent(msg)}`, '_blank');
}

displayBooks();
