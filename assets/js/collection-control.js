document.querySelectorAll('.product').forEach(function (form) {
    form.addEventListener('click', function (event) {
      event.preventDefault();
      form.submit();
    });
  });

  const input = document.getElementById('titleFilter');
  const products = document.querySelectorAll('.product');

  input.addEventListener('input', function() {
    const query = input.value.toLowerCase();

    console.log('Filtering products with query:', query);

    products.forEach(product => {
      const title = product.querySelector('.product-title').textContent.toLowerCase();
      if (title.includes(query)) {
        product.style.display = '';
      } else {
        product.style.display = 'none';
      }
    });
  });