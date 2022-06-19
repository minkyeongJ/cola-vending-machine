const $input = document.querySelector('.input-inputmoney');
const $inputButton = document.querySelector('.btn-inputmoney');
const $charge = document.querySelector('.txt-charge');
const $myMoney = document.querySelector('.txt-mymoney');
const $listItem = document.querySelector('.list-item');
const $listStaged = document.querySelector('.list-staged');

let input;

$charge.textContent = `${parseInt($myMoney.textContent.replace(',',''))} 원`;

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
  li.classList.add('list-btn');
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

//<콜라 선택 시 잔액 감소>
const $btnlist = document.querySelectorAll('.list-btn');

let charge = parseInt($charge.textContent.replace(',',''));

const onClickBtnItem = (event) => {
  const clickedBtn = event.target;
  const price = parseInt(clickedBtn.querySelector('.txt-price').textContent);
  const myMoney = parseInt($myMoney.textContent.replace(',',''));
  //잔액 감소 및 리스트에 콜라 추가
  if (charge - price < 0) {
    // charge - price가 < 0 일 때
    alert("잔액이 부족합니다.");
    console.log(myMoney);
    console.log(price);
  } else {
    charge = charge - price;
    $charge.textContent = `${charge} 원`;
  }
}

$btnlist.forEach(btn => btn.addEventListener('click', onClickBtnItem));
//</콜라 선택 시 잔액 감소>

//<콜라 선택 시 결제 대기 목록에 추가>
class PendingColaCount{
  constructor(img, title){
    this.img = img;
    this.title = title;
    this.count = 1;
  }
}

let pendingColaList;
let pendingCompareArr; 
let setPending;

const onClickBtnItemList = (cola) => {
  const colaData = cola.target;
  const img = colaData.querySelector('.img-item').src;
  const title = colaData.querySelector('.title-item').textContent;

  //중복 처리
  //penndingColaList[0].title 이렇게 배열에 저장된 title 값을 불러올 수 있다
  // 첫 번째 추가할 때
  if (!pendingColaList) {
    pendingColaList = [];
    pendingColaList.push(new PendingColaCount(img, title));
    pendingCompareArr = [...pendingColaList];
    setPending = new Set(pendingCompareArr.map(cola => cola.title));
  } else {
    pendingCompareArr.push(new PendingColaCount(img, title));
    console.log(pendingColaList);
    console.log("==============");
    setPending = new Set(pendingCompareArr.map(cola => cola.title));
    if (pendingCompareArr.length !== setPending.size) {
      //새로 들어온 값이 기존 데이터와 중복 될 때 => 목록을 추가
      // penndingColaList[i].count++;
      pendingColaList.push(new PendingColaCount(img, title)); 
      console.log('중복!');
    } else {
      //중복 안 될 때 => 갯수(count)를 상승
      pendingColaList.push(new PendingColaCount(img, title)); 
      console.log('중복 아님');
    }
  }
}


$btnlist.forEach(btn => btn.addEventListener('click', onClickBtnItemList));
//</콜라 선택 시 결제 대기 목록에 추가>