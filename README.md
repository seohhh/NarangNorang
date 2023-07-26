## ERD

![erd](/img/erd2.png)

## JPA

- @Entity

- @Table

### 상속관계

- @Inheritance(strategy = InheritanceType.SINGLE_TABLE)

  상속 구현 전략 선택

  - SINGLE_TABLE (default) : 단일 테이블 전략

    통합 테이블로 변환<br>
    DiscriminatorColumn를 선언하지 않아도 기본으로 DTYPE 칼럼이 생성된다.
    DTYPE 칼럼 없이는 테이블을 판단할 수 없다.
    ![jpa_enheritance_singletable](/img/jpa_enheritance_singletable.png)

  - JOINED : 각각의 테이블로 변환

    DiscriminatorColumn 선언하지 않으면 DTYPE 칼럼이 생성되지 않는다.
    ![jpa_enheritance_joined](/img/jpa_enheritance_joined.png)

  - TABLE_PER_CLASS

- @DiscriminatorColumn(name = "DTYPE")

  부모 클래스에 선언한다.<br>
  하위 클래스를 구분하는 용도의 칼럼이다.<br>

- @DiscriminatorValue("XXX")

  하위 클래스에 선언한다.<br>
  엔티티를 저장할 때 슈퍼타입의 구분 칼럼에 저장할 값을 지정한다.<br>
  어노테이션을 선언하지 않을 경우 기본값으로 클래스 이름이 들어간다.

<!--
## 프로젝트 소개

- 프로젝트명: 그룹 비디오 컨퍼런스 서비스
- 서비스 특징: 웹/모바일(웹 기술) 프로젝트를 위한 스켈레톤 프로젝트
- 주요 기능
  - 회원 관리
  - 화상 미팅룸
  - 그룹 채팅
- 주요 기술
  - WebRTC
  - WebSocket
  - JWT Authentication
  - REST API
- 참조 리소스
  - Vuetify: 디자인 전반 적용
  - Vue Argon Design System: 디자인 전반 적용
  - Vue Black Dashboard Pro(유료): 캘린더 컴포넌트 사용
  - AR Core: 구글에서 제공하는 AR 지원 라이브러리. 이미지 인식 및 오버레이 영상에 활용
  - Color Thief: 이미지 색상 추출 라이브러리. 커버 사진 색상 추출 및 배경 변경에 활용
  - Animation.css: CSS 애니메이션 지원 라이브러리. 메인 페이지 진입 애니메이션에 활용
- 배포 환경
  - URL: // 웹 서비스, 랜딩 페이지, 프로젝트 소개 등의 배포 URL 기입
  - 테스트 계정: // 로그인이 필요한 경우, 사용 가능한 테스트 계정(ID/PW) 기입

자유 양식

## 팀 소개

- 김ㅇㅇ: 팀장, 프론트엔드 개발
- 이ㅇㅇ: 부팀장, 기획 및 와이어프레임 작성, 프론트엔드 개발
- 박ㅇㅇ: 백엔드 개발 및 QA 담당
- 홍ㅇㅇ: 백엔드 개발, Swagger API 문서 관리
- 전ㅇㅇ: 코드 리뷰 및 인프라 담당, CI/CD, HTTPS, Docker 구성

자유 양식

## 프로젝트 상세 설명

// 개발 환경, 기술 스택, 시스템 구성도, ERD, 기능 상세 설명 등
 -->
