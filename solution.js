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
  
  generateButton.addEventListener('click', createFurnitureView);

  buyButton.addEventListener('click', furnituresReport);

  function furnituresReport(e) {

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
      hardCodedHTML = `
<tr>
                                        <td>
                                            <img
                                                src="${element.img}">
                                        </td>
                                        <td>
                                            <p>${element.name}</p>
                                        </td>
                                        <td>
                                            <p>${element.price}</p>
                                        </td>
                                        <td>
                                            <p>${element.decFactor}</p>
                                        </td>
                                        <td>
                                            <input id="decorationBox" type="checkbox"/>
                                        </td>
                                        <td>
                                            <input id="deleteBox" type="checkbox"/>
                                        </td>
</tr>`;
      tbodyEl.innerHTML += hardCodedHTML;
    });
  }

}