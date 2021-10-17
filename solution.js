function solve() 
{
  //fix correctSortedNameIndex indexes when adding new furnitures;
  let totalPrice = 0;
  let furnitureArr = [];
  let decorationFactor = 0;
  let checkedFurnitures = 0;
  let inputTextArea = document.querySelector('div > textarea');
  let outputTextArea = document.querySelector('#output');
  let tbodyEl = document.querySelector('tbody');
  let generateButton = document.querySelector('#generate');
  let buyButton = document.querySelector('#buy');
  let sortButton = document.querySelector('#sort');
  let tbodyTrData;

  generateButton.addEventListener('click', createFurnitureView);

  buyButton.addEventListener('click', furnituresReport);

  sortButton.addEventListener('click', sortEl);

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
    } //refactor this , it must append child, not crash everything . 
    JSON.parse(furnitureInput).forEach(element => {
      let trEl = document.createElement('tr');
      trEl.innerHTML  = `
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
      tbodyEl.appendChild(trEl);
    });
  }

  function sortEl(){
    let sortedFurnitureNames = [];
    let correctSortedNameIndex = [];
    tbodyTrData = document.querySelectorAll('tbody tr');
    
    tbodyTrData.forEach(el => sortedFurnitureNames.push(el.querySelectorAll('td p.name')[0].innerText));
    sortedFurnitureNames.sort((a, b) => a.localeCompare(b));
    
    for (let j = 0; j < tbodyTrData.length; j++) {
     for (let d = 0; d < sortedFurnitureNames.length; d++) {
       let currentTrTdname = tbodyTrData[j].querySelector('td p.name').innerText;
        
       if (currentTrTdname == sortedFurnitureNames[d]) {
         correctSortedNameIndex.push(d);
         sortedFurnitureNames[d] = '';
         break;
       }
     }
    }

    for (let a = 0; a < tbodyTrData.length; a++) {
      let createDoc = document.createElement('tr');
      createDoc = tbodyTrData[correctSortedNameIndex.indexOf(a)];
      tbodyEl.appendChild(createDoc);
    }
    
  }
  
}
