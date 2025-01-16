const getActualDate = () => {
  const date = new Date();
  let dia = String(date.getDate()).padStart(2, '0');
  let mes = String(date.getMonth() + 1).padStart(2, '0');
  let ano = date.getFullYear();

  let dataAtual = dia + '/' + mes + '/' + ano;
  return dataAtual;
}

const getActualHour = () => {
  const date = new Date();
  let hora = String(date.getHours()).padStart(2, '0');
  let min = String(date.getMinutes()).padStart(2, '0');
  let seg = String(date.getSeconds()).padStart(2, '0');

  let str_hora = hora + ':' + min + ':' + seg;
  return str_hora;
}

const getName = () => {
  const textInput = document.querySelector('#input-text');
  if (textInput.value.length === 0) {
    alert('Please fill in the search field');
    textInput.focus();
    return null;
  }
  else {
    return textInput.value; 
  }
}

function onTextReady(text) {
  console.log(text);
}
function onResponse(response) {
  return response.text();
}

const onSubmit = () => {

  if (getName() === null) {
    return;
  }
  const message = {
    name: getName(),
    hour: getActualHour()
  }
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      // 'Access-Control-Allow-Origin': '*',
      // 'Access-Control-Allow-Credentials': 'true',
      // 'mode': 'no-cors'
    },
    body: JSON.stringify(message)
  };

  fetch('/create', fetchOptions)
    .then(onResponse)
    .then(onTextReady);

  console.log('MESSAGE', message);
}

const submitButton = document.querySelector('button');
submitButton.addEventListener('click', onSubmit);



// fetch('http://localhost:3000')
//   .then(onResponse)
//   .then(onTextReady);
