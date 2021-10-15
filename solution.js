function solve() {
// WILL REFACTOR THAT LATES
  let totalPrice = 0;
  let furnitureArr = [];
  let decorationFactor = 0;
  let checkedFurnitures = 0;
  let inputTextArea = document.getElementsByTagName('textarea')[0];
  let outputTextArea = document.getElementsByTagName('textarea')[1];
  let tbodyEl = document.getElementsByTagName('tbody')[0];
  let generateButton = document.getElementsByTagName('button')[0];
  let buyButton = document.getElementsByTagName('button')[1];
  let officeChairTD = document.getElementsByTagName('td')[4];
  let inputChair = officeChairTD.childNodes[1];
  inputChair.disabled = false;
  outputTextArea.disabled = false;

  document.addEventListener('click', checkClickedButton);

  function checkClickedButton(e) {

    if (e.target == generateButton) {
      let furnitureInput = `${inputTextArea.value}`;
      createFurnitureView(furnitureInput);

    } else if (e.target == buyButton) {

      let trFurnitures = document.querySelectorAll('tbody tr');

      trFurnitures.forEach(element => {
        
        if (element.cells[4].children[0].checked) {

          inputTextArea.value = '';
          totalPrice += Number(element.cells[2].children[0].innerText);
          furnitureArr.push(element.cells[1].children[0].innerText);
          decorationFactor += Number(element.cells[3].children[0].innerText);
          checkedFurnitures++;
        } else {
          outputTextArea.value = '';
        }
        
      });
      if (checkedFurnitures !==0 ) {
        outputTextArea.value = '';
        let purchasedFurnitures = furnitureArr.join(', ');
        outputTextArea.value += `Bought furniture: ${purchasedFurnitures}\n`;
        outputTextArea.value += `Total price: ${totalPrice.toFixed(2)}\n`;
        outputTextArea.value += `Average decoration factor: ${(decorationFactor/checkedFurnitures).toFixed(1)}\n`;
        totalPrice = 0;
        checkedFurnitures = 0;
        decorationFactor = 0;
        furnitureArr = [];
      }
    }
  }

  function IsJsonString(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  function createFurnitureView(jsonObjectOfFurnitures) {
     
    if (!IsJsonString(jsonObjectOfFurnitures) || jsonObjectOfFurnitures == '') {
      inputTextArea.value = "Please enter valid data!!! Copy from furniture.json"
      return;
    }
    let furnitures = JSON.parse(jsonObjectOfFurnitures);

    furnitures.forEach(element => {
      
      let tr = document.createElement('tr');
      let tdImg = document.createElement('td');
      //let imgForTd = document.createElement('img');
      let tdName = document.createElement('td');
      let pElwithName = document.createElement('p');
      let tdprice = document.createElement('td');
      let pPrice = document.createElement('p');
      let tdDecFactor = document.createElement('td');
      let pDecFactor = document.createElement('p');
      let tdForInputCheckBox = document.createElement('td');
      let inputCheckBox = document.createElement('input');

      inputCheckBox.type = "checkbox";
      //imgForTd.src = element.img;
      tdImg.appendChild(document.createElement('img')).src = element.img;
      tr.appendChild(tdImg);
      pElwithName.innerText = element.name;
      tdName.appendChild(pElwithName);
      tr.appendChild(tdName);
      pPrice.innerText = element.price;
      tdprice.appendChild(pPrice);
      tr.appendChild(tdprice);
      pDecFactor.innerText = element.decFactor;
      tdDecFactor.appendChild(pDecFactor);
      tr.appendChild(tdDecFactor);
      tdForInputCheckBox.appendChild(inputCheckBox);
      tr.appendChild(tdForInputCheckBox);

      tbodyEl.appendChild(tr);
    });
  }
}