// Set value from front end
let passwordLength = document.getElementById('length').value;

document.getElementById('length').addEventListener('change', event => {
  passwordLength = document.getElementById('length').value;
  document.getElementById('length-value').innerHTML = passwordLength;
  console.log(passwordLength);
});

let isUpperCase = document.getElementById('uppercase').checked;

document.getElementById('uppercase').addEventListener('change', event => {
  if (isUpperCase) {
    isUpperCase = false;
  } else {
    isUpperCase = true;
  }
  console.log('uppercase: ', isUpperCase);
});

let isLowerCase = document.getElementById('lowercase').checked;

document.getElementById('lowercase').addEventListener('change', event => {
  if (isLowerCase) {
    isLowerCase = false;
  } else {
    isLowerCase = true;
  }
  console.log('lowercase: ', isLowerCase);
});

let isNumber = document.getElementById('number').checked;

document.getElementById('number').addEventListener('change', event => {
  if (isNumber) {
    isNumber = false;
  } else {
    isNumber = true;
  }
  console.log('number: ', isNumber);
});

let isSymbol = document.getElementById('symbol').checked;

document.getElementById('symbol').addEventListener('change', event => {
  if (isSymbol) {
    isSymbol = false;
  } else {
    isSymbol = true;
  }
  console.log('symbol: ', isSymbol);
});

let username= '';

document.getElementById('username').addEventListener('change', event => {
  username = event.target.value;
});

function generateCase() {
  let kamus = 'abcdefghijklmnopqrstuvwxyz';
  let indexRandom = Math.floor(Math.random() * kamus.length);

  return kamus[indexRandom]
}

function generateNumber() {
  let number = '1234567890';
  let indexRandom = Math.floor(Math.random() * number.length);

  return number[indexRandom];
}

function generateSymbol() {
  let symbol = `~!@#$%^&*()_+[]\;',./{|}:"<>?`;
  let indexRandom = Math.floor(Math.random() * symbol.length);

  return symbol[indexRandom];
}

function generatePass(panjangPassword,isLower,isUpper,isNumber,isSymbol) {
  let pass = '';
  let index = 0;

  while (index < panjangPassword) {
    let random = Math.floor(Math.random() * 4); 

    if (random === 0 && isLower) {
      pass += generateCase();
      index++;
      continue;
    }

    if (random === 1 && isUpper) {
      pass += generateCase().toUpperCase();
      index++;
      continue;
    }

    if (random === 2 && isNumber) {
      pass += generateNumber();
      index++;
      continue;
    }

    if (random === 3 && isSymbol) {
      pass += generateSymbol();
      index++;
      continue;
    }

    if (index === 1000) {
      break;
    }
  }
  return pass;
}

// ! password
let pass = '';

document.getElementById('submit-button').addEventListener('click', event => {
  event.preventDefault();

  if (!isLowerCase && !isUpperCase && !isNumber && !isSymbol) {
    alert("Silahkan input pemilihan kombinasi Uppercase, Lowercase, Number, atau Symbol")
  } else {
    pass = generatePass(passwordLength,isLowerCase,isUpperCase,isNumber,isSymbol);
    console.log(pass);
    document.getElementById('passgenerate').value = pass;
  }
})

document.getElementById('passgenerate').addEventListener('change',event => {
  pass = event.target.value;
})

// !

document.getElementById('save-button').addEventListener('click', event => {
  event.preventDefault();
  
  if (!username || !pass) {
    alert(`You must input username and generate password to save`);

  } else {
    let object = 
    {
      name : username, pass : pass, situs
    }
  
    storage.push(object);
    console.log(storage);

    inputUsername(username,pass);
  }
})

// function nambahOrang() {
//   if(!username || !pass) {
//     return
//   }

//   else {
//     let object = 
//     {
//       name : username, pass : pass, situs
//     }
  
//     storage.push(object);
//     console.log(storage);
  
//     inputUsername(username,pass);
//   }
// }

let situs = '';

document.getElementById('sites').addEventListener('change', event => {
  situs = event.target.value;
});

let storage = [];

function inputUsername(username,password) {
  let table = document.getElementById("listpassword");
  let row = table.insertRow(1);
  let cell1 = row.insertCell(0);
  let cell2 = row.insertCell(1);
  let cell3 = row.insertCell(2);
  cell1.innerHTML = username;
  cell2.innerHTML = password;
  cell3.innerHTML = situs;
}

document.getElementById('reset').addEventListener('click', event => {
  event.preventDefault();
  
  pass = '';
  situs = '';
  document.getElementById('passgenerate').value = '';
  document.getElementById('sites').value = '';

})

document.getElementById("delete-row").addEventListener('click' ,event => {
  event.preventDefault();

  
  if (storage.length > 0) {
    storage.pop();
    document.getElementById("listpassword").deleteRow(1);

  }
})