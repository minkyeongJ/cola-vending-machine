const $input = document.querySelector('.input-inputmoney');
const $inputButton = document.querySelector('.btn-inputmoney');
const $charge = document.querySelector('.txt-charge');
const $myMoney = document.querySelector('.txt-mymoney');
const $listItem = document.querySelector('.list-item');
const $listStaged = document.querySelector('.list-staged');
const $btnGet = document.querySelector('.btn-get');
const $listGet = document.querySelector('.list-get');
const $totalItemPrice = document.querySelector('.total-itemPrice');

let input;

//<입금 시 잔액 및 소지금 금액 증가>
const onInput = (event) => {
  //입력 된 값 저장
  input = parseInt(event.target.value);
  console.log(input);
}

const onClickButton = () => {
  //입력 된 값을 잔액과 소지금에 업데이트
  $myMoney.textContent = `${parseInt($myMoney.textContent.replaceAll(',','')) + input} 원`;
  $charge.textContent = $myMoney.textContent;
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
    this.stock = 10;
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

const onClickBtnItem = (event) => {
  let charge = parseInt($charge.textContent.replaceAll(',',''));
  const clickedBtn = event.target;
  const price = parseInt(clickedBtn.querySelector('.txt-price').textContent);
  const myMoney = parseInt($myMoney.textContent.replaceAll(',',''));
  //잔액 감소 및 리스트에 콜라 추가
  if (charge - price < 0) {
    console.log($charge.textContent.replaceAll(',','').replaceAll(' ','').replaceAll('원',''));
    console.log(parseInt('10000'));
    // charge - price가 < 0 일 때
    alert("잔액이 부족합니다.");
    console.log(charge);
    console.log(myMoney);
    console.log(price);
  } else {
    charge = charge - price;
    $charge.textContent = `${charge} 원`;
    onClickBtnItemList(event);
  }
}

$btnlist.forEach(btn => btn.addEventListener('click', onClickBtnItem));
//</콜라 선택 시 잔액 감소>

//<콜라 선택 시 결제 대기 목록에 추가>
class PendingColaCount{
  constructor(img, title, price){
    this.img = img;
    this.title = title;
    this.price = price;
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
  const price = colaData.querySelector('.txt-price').textContent;

  //중복 처리
  //penndingColaList[0].title 이렇게 배열에 저장된 title 값을 불러올 수 있다
  // 첫 번째 추가할 때
  if (!pendingColaList) {
    pendingColaList = [];
    pendingColaList.push(new PendingColaCount(img, title, price));
    pendingCompareArr = [...pendingColaList];
    setPending = new Set(pendingCompareArr.map(cola => cola.title));
  } else {
    pendingCompareArr.push(new PendingColaCount(img, title, price));
    console.log(pendingColaList);
    console.log("==============");
    setPending = new Set(pendingCompareArr.map(cola => cola.title));
    if (pendingCompareArr.length !== setPending.size) {
      //새로 들어온 값이 기존 데이터와 중복 될 때 => 갯수(count)를 상승
      // penndingColaList[i].count++;
      console.log('중복!');
      pendingColaList.push(new PendingColaCount(img, title, price));
      for (let i = 0; i < pendingColaList.length; i++){
        const colaFirstIndex = pendingColaList.map(cola => cola.title).indexOf(pendingColaList[i].title);
        const colaLastIndex = pendingColaList.map(cola => cola.title).lastIndexOf(pendingColaList[i].title);
        if (colaFirstIndex !== colaLastIndex) {
          console.log("중복값");
          pendingColaList[colaFirstIndex].count++;
          pendingColaList.splice(colaLastIndex, 1);
          console.log(pendingColaList[i].title);
          break;
        }
      }
    } else {
      //중복 안 될 때 => 목록을 추가
      console.log('중복 아님');
      pendingColaList.push(new PendingColaCount(img, title, price)); 
    }
  }
  
  // 콜라 리스트 화면에 보여주기
  $listStaged.textContent = '';
  pendingColaList.forEach(cola => {
    const li = document.createElement('li');
    li.classList.add('list-btn');
    const listButton = document.createElement('button');
    listButton.classList.add('btn-staged');
  
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
    
    //count
    const count = document.createElement('span');
    count.classList.add('num-counter');
    count.textContent = cola.count;
    listButton.append(count);
    
    li.append(listButton);
    $listStaged.prepend(li);
  });
  console.log(pendingColaList);
}

// $btnlist.forEach(btn => btn.addEventListener('click', onClickBtnItemList));
//</콜라 선택 시 결제 대기 목록에 추가>

//<획득 버튼 동작>
const onClickBtnGet = () => {
  //장바구니에 담긴 colaList를 획득한 음료로 이동
  const getColaList =  [...pendingColaList];
  getColaList.forEach(cola => {
    const li = document.createElement('li');
    li.classList.add('list-btn');
    const listButton = document.createElement('button');
    listButton.classList.add('btn-staged');
  
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
    
    //count
    const count = document.createElement('span');
    count.classList.add('num-counter');
    count.textContent = cola.count;
    listButton.append(count);
    
    li.append(listButton);
    $listGet.prepend(li);
    //획득 시 장바구니 초기화
    $listStaged.textContent = '';
    pendingColaList = [];
    console.log(pendingColaList);
  });
  
  //소지금 가격을 잔액 가격과 동일하게 변경
  $myMoney.textContent = $charge.textContent;

  //총금액 변경
  const colasPriceArr = getColaList.map( colaPrice => parseInt(colaPrice.count) * parseInt(colaPrice.price));

  let sumItemsPrice = 0;
  for (price of colasPriceArr){
    sumItemsPrice += price;
  }

  $totalItemPrice.textContent = sumItemsPrice;

  //재고 갯수 변경
  //colaDataBase에서 이름이 같은 콜라를 찾고 획득으로 이동한 갯수 만큼 stock 감소
  // for(let i = 0; i < colaDataBase.length; i++){
  //   for(let j = 0; j < getColaList.length; j++){
  //     if(colaDataBase[i].title == getColaList[j].title){
  //       colaDataBase[i].stock = colaDataBase[i].stock - getColaList[j].count;
  //       console.log(colaDataBase[i].stock);
  //       break;
  //     }
  //   }
  // }
};

$btnGet.addEventListener('click', onClickBtnGet);
//</획득 버튼 동작>