document.addEventListener('DOMContentLoaded', () => {
    let token = localStorage.getItem('token');
    const menuContainer = document.getElementById('menu-items');
    const itemSelect = document.getElementById('item');
    const loginButton = document.getElementById('login-btn');
    const logoutButton = document.getElementById('logout-btn');
    const adminSection = document.getElementById('admin');

    if (token) {
        loginButton.style.display = 'none';
        logoutButton.style.display = 'block';
        checkAdmin();
    } else {
        loginButton.style.display = 'block';
        logoutButton.style.display = 'none';
        adminSection.style.display = 'none';
    }

    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('token');
        window.location.reload();
    });

    fetch('/api/menu')
        .then(response => response.json())
        .then(data => {
            data.forEach(item => {
                // Add menu item to the page
                const div = document.createElement('div');
                div.classList.add('menu-item');
                div.innerHTML = `
                    <h3>${item.name}</h3>
                    <p>Price: $${item.price}</p>
                `;
                menuContainer.appendChild(div);

                // Add item to the order select
                const option = document.createElement('option');
                option.value = item.name;
                option.text = item.name;
                itemSelect.appendChild(option);
            });
        });

    document.getElementById('order-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const selectedItem = itemSelect.value;

        if (!selectedItem) {
            alert('Please select an item to order.');
            return;
        }

        fetch('/api/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ item: selectedItem }),
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById('order-status').textContent = 'Order placed successfully!';
        })
        .catch(err => {
            console.error(err);
            document.getElementById('order-status').textContent = 'Error placing order.';
        });
    });

    function checkAdmin() {
        fetch('/api/admin', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.isAdmin) {
                adminSection.style.display = 'block';
                document.getElementById('add-item-form').addEventListener('submit', (e) => {
                    e.preventDefault();
                    const name = document.getElementById('new-item-name').value;
                    const price = document.getElementById('new-item-price').value;

                    fetch('/api/menu', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify({ name, price }),
                    })
                    .then(response => response.json())
                    .then(data => {
                        window.location.reload();
                    });
                });
            }
        });
    }

    loginButton.addEventListener('click', () => {
        const email = prompt('Enter email:');
        const password = prompt('Enter password:');
        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.token) {
                localStorage.setItem('token', data.token);
                window.location.reload();
            } else {
                alert('Login failed');
            }
        });
    });
});
