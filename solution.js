function solve() 
{
  let totalPrice = 0;
  let furnitureArr = [];
  let decorationFactor = 0;
  let checkedFurnitures = 0;
  let inputTextArea = document.querySelector('div > textarea');
  let outputTextArea = document.querySelector('#output');
  let tbodyEl = document.querySelector('tbody');
  let generateButton = document.querySelector('#generate');
  let buyButton = document.querySelector('#buy');

  generateButton.addEventListener('click', createFurnitureView);

  buyButton.addEventListener('click', furnituresReport);

  event.target.addEventListener('click', deleteTableRowData);

  function furnituresReport() {

      let trFurnitures = document.querySelectorAll('tbody tr');
      outputTextArea.value = '';

      trFurnitures.forEach(element => {

        if (element.querySelector('td input[id="decorationBox"]').checked) {

          inputTextArea.value = '';
          totalPrice += Number(element.querySelector('td p[class="price"]').innerText);
          furnitureArr.push(element.querySelector('td p[class="name"]').innerText);
          decorationFactor += Number(element.querySelector('td p[class="decFactor"]').innerText);
          checkedFurnitures++;
        } else {
          outputTextArea.value = '';
        }
      });

      if (checkedFurnitures !== 0) {
        
        let purchasedFurnitures = furnitureArr.join(', ');
        outputTextArea.value += `Bought furniture: ${purchasedFurnitures}\n`;
        outputTextArea.value += `Total price: ${totalPrice.toFixed(2)}\n`;
        outputTextArea.value += `Average decoration factor: ${(decorationFactor/checkedFurnitures).toFixed(1)}\n`;
        clearFurnitureReport();
      }
      sortEl();
    }
  
  function IsJsonString(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  function deleteTableRowData(e) {

    if (e.target.id == 'deleteBox') {
      e.target.parentNode.parentNode.remove();
      outputTextArea.value = '';
    }
  }
  
  function clearFurnitureReport() {
    totalPrice = 0;
    checkedFurnitures = 0;
    decorationFactor = 0;
    furnitureArr = [];
  }

  function createFurnitureView() {
    let furnitureInput = `${inputTextArea.value}`;
    
    if (!IsJsonString(furnitureInput) || furnitureInput == '') {
      inputTextArea.value = "Please enter valid data!!! Copy from furniture.json";
      return;
    }
    JSON.parse(furnitureInput).forEach(element => {
      tbodyEl.innerHTML  += `
<tr>
    <td>
        <img
            src="${element.img}">
    </td>
    <td>
        <p class="name">${element.name}</p>
    </td>
    <td>
        <p class="price">${element.price}</p>
    </td>
    <td>
        <p class="decFactor">${element.decFactor}</p>
    </td>
    <td>
        <input id="decorationBox" type="checkbox"/>
    </td>
    <td>
        <input id="deleteBox" type="checkbox"/>
    </td>
</tr>`;
    });
  }

  function sortEl(){
    let compareArr =[];
    let compareTRbyName = document.querySelectorAll('tbody tr');
    let newArrResultIndexes = [];
    compareTRbyName.forEach(el => compareArr.push(el.querySelectorAll('td p.name')[0].innerText));
    compareArr.sort((a, b) => a.localeCompare(b));

    for (let j = 0; j < compareTRbyName.length; j++) {
     for (let d = 0; d < compareArr.length; d++) {
       if ( compareTRbyName[j].querySelectorAll('td p.name')[0].innerText == compareArr[d]) {
         newArrResultIndexes.push(d);
       }
     }
    }
    for (let a = 0; a < compareTRbyName.length; a++) {
      let createDoc = document.createElement('tr');
      createDoc = compareTRbyName[newArrResultIndexes.indexOf(a)];
      tbodyEl.appendChild(createDoc);
    }
    console.log(compareTRbyName)
    console.log(newArrResultIndexes);
    console.log(compareArr)
  }
}
