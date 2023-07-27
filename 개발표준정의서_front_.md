# 개발 표준 정의서(react)

# 프로젝트 개발 표준 정의서

---

## 코드 스타일 가이드

- 변수와 함수: 카멜 케이스(camelCase)를 사용한다.
- 상수: 대문자 스네이크 케이스(UPPER_CASE_SNAKE_CASE)를 사용한다.
- 클래스와 컴포넌트: 파스칼 케이스(PascalCase)를 사용한다.
- 들여쓰기와 줄바꿈
    - 들여쓰기는 공백 두 칸을 사용한다.
    - 줄바꿈은 80자를 넘지 않도록 한다.

**좋은 예:**

```jsx
function MyComponent() {
  return (
    <div>
      <span>This is a long text that stays within 80 characters</span>
    </div>
  );
}

```

**나쁜 예:**

```jsx
function MyComponent() {
  return <div><span>This is a long text that exceeds 80 characters and breaks the line</span></div>;
}

```

### 괄호 사용

- 중괄호(`{}`)는 여는 줄과 함께 사용하며, 중괄호 안에 공백을 넣지 않는다.
- JSX 태그의 속성 값을 감싸는 따옴표는 큰 따옴표(`""`)를 사용한다.

**좋은 예:**

```jsx
function MyComponent(props) {
  return <div className="container">{props.text}</div>;
}

```

**나쁜 예:**

```jsx
function MyComponent(props){
  return <div class= "container" >{props.text}</div>;
}

```

### 컴포넌트와 함수 선언

- 컴포넌트와 함수의 선언은 빈 줄로 구분한다.

**좋은 예:**

```jsx
function func1() {
  // code
}

function func2() {
  // code
}

```

**나쁜 예:**

```jsx
function func1() {
  // code
}
function func2() {
  // code
}

```

## 주석 작성 규칙

- 함수 설명: 각 함수에는 기능을 명확히 설명하는 주석을 작성한다. 파라미터와 반환값에 대해서도 설명한다.
- 클래스와 컴포넌트: 클래스나 컴포넌트가 하는 역할과 사용 방법에 대한 주석을 작성한다.
- 중요 사항: 특정 코드 부분이나 기능의 동작 방식에 중요한 영향을 미치는 경우, 주석으로 명시한다.
- 코드의 이해를 돕기 위해 주석을 사용한다.
- 주석은 문장의 끝에 위치하도록 한다. (코드 설명을 해야함)

**좋은 예:**

```jsx
function calculatePrice(price) {
  let tax = price * 0.1; // 세금은 가격의 10%로 계산
  return price + tax;
}

```

**나쁜 예:**

```jsx
function calculatePrice(price) {
  let tax = price * 0.1; // 계산해서 세금을 구한다.
  return price + tax;
}

```

### 기타 규칙

- 한 줄에는 하나의 구문만 작성한다.
- 불필요한 공백을 사용하지 않는다.

**좋은 예:**

```jsx
const a = 10;

function MyComponent() {
  return <div>Content</div>;
}

```

**나쁜 예:**

```jsx
const a=10;
function MyComponent() {return <div>Content</div>;}

```

## 폴더 구조 예시

```
/src
  /components
    /Header
      Header.js
      Header.css
    /Footer
      Footer.js
      Footer.css
  /pages
    HomePage.js
    AboutPage.js
  /utils
    api.js
  App.js
  index.js

```

## 테스팅 규칙

- 각 기능은 테스트 코드를 작성한다.
- 테스트 커버리지를 유지하기 위해 새로운 기능이나 버그 수정이 이루어질 때마다 테스트를 추가하거나 수정한다.

## 보안 규정

- 민감한 정보를 로그에 남기지 않도록 주의한다.
- 사용자 인증과 권한 부여에 대한 처리는 보안적인 측면을 고려하여 구현한다.

---