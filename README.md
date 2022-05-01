# cola-vending-machine
간단설명: 콜라 벤딩머신 제작</br>
vending-machine 페이지 확인 링크: https://minkyeongj.github.io/cola-vending-machine/

# 프로젝트 목표
음료를 선택하고 구매할 수 있는 콜라 벤딩머신을 제작합니다. PC와 Mobile 버전을 모두 아래와 같은 모습으로 구현합니다.
## 1. 구현해야 할 PC 화면
![구현해야 할 PC 화면](README_img/%ED%8C%8C%EC%9D%B4%EB%84%90%20%EC%BD%94%EB%94%A9%ED%85%8C%EC%8A%A4%ED%8A%B8_7%EB%B2%88_PC.png)

## 2. 구현해야 할 Mobile 화면
![구현해야 할 Mobile 화면](README_img/%ED%8C%8C%EC%9D%B4%EB%84%90%20%EC%BD%94%EB%94%A9%ED%85%8C%EC%8A%A4%ED%8A%B8_7%EB%B2%88_Mobile.png)

# 사용언어 : HTML/CSS

# 구현 시 어려웠던 내용
![처음 화면을 블록으로 나누었을 때 형태](README_img/%ED%99%94%EB%A9%B4%EB%B8%94%EB%A1%9D1.png)
처음 화면 블록을 나눌 때 왼쪽 section-box와 오른쪽 section-box를 11개의 행으로 나누어 위치를 조정하려고 시도했습니다.
구현을 하는 중 여러 문제점이 발생하여 앞선 방법을 철회하였습니다.</br>
문제점 1 : 콜라를 추가했을 때 grid 행의 높이가 망가져 다른 부분의 비율이 깨짐</br>
문제점 2 : overflow-scroll을 적용한 태그가 잘 작동하지 않음</br>
문제점 3 : 유지보수의 어려움이 예상됨</br>
문제점 4 : 반응형 화면을 구현하기가 어려움

위와 같은 문제점을 캐치하여 현재의 코드로 아래의 화면을 구현하였습니다.
# 구현 화면

## 1. 구현한 PC 화면

![구현한 PC 화면](README_img/%EA%B5%AC%ED%98%84%ED%99%94%EB%A9%B4_PC.PNG)

## 2. 구현한 Mobile 화면
![구현한 Mobile 화면](README_img/%EA%B5%AC%ED%98%84%ED%99%94%EB%A9%B4_%EB%AA%A8%EB%B0%94%EC%9D%BC.png)

