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






//<콜라 선택 시 발생하는 이벤트>
