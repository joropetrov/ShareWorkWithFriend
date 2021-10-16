function solve() {

  let totalPrice = 0;
  let furnitureArr = [];
  let decorationFactor = 0;
  let checkedFurnitures = 0;
  let inputTextArea = document.querySelector('div > textarea');
  let outputTextArea = document.querySelector('#output');
  let tbodyEl = document.querySelector('tbody');
  let generateButton = document.querySelector('#generate');
  let buyButton = document.querySelector('#buy');
  let objToUseLater = [];
  
  generateButton.addEventListener('click', createFurnitureView);

  buyButton.addEventListener('click', furnituresReport);

  function furnituresReport(e) {

      let trFurnitures = document.querySelectorAll('tbody tr');
      // add eventListener for trFurnitures ili if elementa e klicked otdolu napravo, predi if-a
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

  function IsJsonString(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
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
}