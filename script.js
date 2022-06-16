const $input = document.querySelector('.input-inputmoney');
const $inputButton = document.querySelector('.btn-inputmoney');
const $charge = document.querySelector('.txt-charge');
const $myMoney = document.querySelector('.txt-mymoney');
const $listItem = document.querySelector('.list-item');

let input;

//<입금 시 잔액 및 소지금 금액 증가>
const onInput = (event) => {
  //입력 된 값 저장
  input = parseInt(event.target.value);
  console.log(input);
}

const onClickButton = () => {
  //입력 된 값을 잔액과 소지금에 업데이트
  $charge.textContent = `${parseInt($charge.textContent.replace(',','')) + input} 원`;
  $myMoney.textContent = `${parseInt($myMoney.textContent.replace(',','')) + input} 원`;
  $input.value = '';
  $input.focus();
  input = 0;
}

$input.addEventListener('input', onInput);
$inputButton.addEventListener('click', onClickButton);
//</입금 시 잔액 및 소지금 금액 증가>

//<콜라 리스트 업>
class ColaData{
  constructor(img, title, price){
    this.img = img;
    this.title = title;
    this.price = price;
  }
}

//colaDataBase에 colaData 저장
let colaDataBase = [];
const original_Cola = new ColaData('./images/mediaquery/Original_Cola.png', 'Original_Cola', '1000원');
colaDataBase.push(original_Cola);
const violet_Cola = new ColaData('./images/mediaquery/Violet_Cola.png', 'Violet_Cola', '1000원');
colaDataBase.push(violet_Cola);
const yellow_Cola = new ColaData('./images/mediaquery/Yellow_Cola.png', 'Yellow_Cola', '1000원');
colaDataBase.push(yellow_Cola);
const cool_Cola = new ColaData('./images/mediaquery/Cool_Cola.png', 'Cool_Cola', '1000원');
colaDataBase.push(cool_Cola);
const green_Cola = new ColaData('./images/mediaquery/Green_Cola.png', 'Green_Cola', '1000원');
colaDataBase.push(green_Cola);
const orange_Cola = new ColaData('./images/mediaquery/Orange_Cola.png', 'Orange_Cola', '1000원');
colaDataBase.push(orange_Cola);

//colaDataBase에 colaData 꺼내와서 DOM에 전달하기

colaDataBase.forEach(cola => {
  const li = document.createElement('li');
  const listButton = document.createElement('button');
  listButton.classList.add('btn-item');
  
  //img
  const img = document.createElement('img');
  img.classList.add('img-item');
  img.src = cola.img;
  listButton.append(img);

  //title
  const title = document.createElement('strong');
  title.classList.add('title-item');
  title.textContent = cola.title;
  listButton.append(title);

  //price
  const price = document.createElement('span');
  price.classList.add('txt-price');
  price.textContent = cola.price;
  listButton.append(price);

  li.append(listButton);
  $listItem.append(li);
});
//</콜라 리스트 업>




//<콜라 선택 시 발생하는 이벤트>
