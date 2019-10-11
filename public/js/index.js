const addButton = document.getElementById('add-review');

addButton.addEventListener('click', (e) => {
const fromdata = new FormData(document.getElementById('add-form')); 
  e.preventDefault();
    const review = {
      data: {
        name: fromdata.get('name'),
        city: fromdata.get('city'),
        email: fromdata.get('email'),
        text: fromdata.get('text'),
        raiting: fromdata.get('raiting')
      }
  }
  axios.post('/add-review', review)
  .then((e) = console.log(e))
  .catch((error) => console.log(review));
});


// bootstrap modal
$('#myModal').on('shown.bs.modal', function () {
  $('#myInput').trigger('focus')
});



