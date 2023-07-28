## ERD

![erd](/img/erd2.png)

## JPA - Domain

- @Entity

- @Table

- @Column

- @Id

- @GeneratedValue

- @Enumerated

### 값 타입

- @Embeddable

- @Embeded

  @Setter를 제거하고 생성자에서 값을 모두 초기화 -> 변경 불가<br>
  기본 생성자를 public 또는 protected로 설정

### 연관관계

외래키가 있는 곳이 연관관계의 주인
연관관계의 주인이 아닌 객체에서 mappedBy 속성 사용해서 주인 지정

- @OneToOne

- @OneToMany

- @ManyToOne

- @ManyToMany

  ```
  mappedBy = "???"
  cascade = CascadeType.ALL
  fetch = FetchType.LAZE
    모든 연관관계는 지연로딩(LAZE)으로 설정
    @XToOne 관계는 기본이 즉시로딩(EAGER)이므로 직접 지연로딩으로 설정
  ```

- @JoinColumn

- @JoinTable

### 상속관계

- @Inheritance(strategy = InheritanceType.SINGLE_TABLE)

상속 구현 전략 선택

- SINGLE_TABLE (default) : 단일 테이블 전략. 통합 테이블로 변환

  DiscriminatorColumn를 선언하지 않아도 기본으로 DTYPE 칼럼이 생성된다.<br>
  DTYPE 칼럼 없이는 테이블을 판단할 수 없다.<br>
  ![jpa_enheritance_singletable](/img/jpa_enheritance_singletable.png)

- JOINED : 각각의 테이블로 변환

  DiscriminatorColumn 선언하지 않으면 DTYPE 칼럼이 생성되지 않는다.<br>
  ![jpa_enheritance_joined](/img/jpa_enheritance_joined.png)

- TABLE_PER_CLASS : 구현 클래스마다 테이블을 생성
  ![jpa_enheritance_tableperclass](/img/jpa_enheritance_tableperclass.png)

- @DiscriminatorColumn(name = "DTYPE")

  부모 클래스에 선언한다.<br>
  하위 클래스를 구분하는 용도의 칼럼이다.<br>

- @DiscriminatorValue("XXX")

  하위 클래스에 선언한다.<br>
  엔티티를 저장할 때 슈퍼타입의 구분 칼럼에 저장할 값을 지정한다.<br>
  어노테이션을 선언하지 않을 경우 기본값으로 클래스 이름이 들어간다.

## JPA - Repository

- @Repository : 스프링 빈으로 등록. JPA 예외를 스프링 기반 예외로 예외 변환
- @PersistenceContext : 엔티티 매니저(EntityManager) 주입
- @PersistenceUnit : 엔티티 매니저 팩토리(EntityManagerFactory) 주입

- save()
- findOne()
- findAll()
- findByName()

## JPA - Service

- @Service
- @Transactional: 트랜잭션, 영속성 컨텍스트
  readOnly = true : 데이터의 변경이 없는 읽기 전용 메소드에 사용
- @Autowired : 필드 주입
  생성자 injection 많이 사용. 생성자가 하나면 생략 가능

  ```java
  // 필드 주입
  public class MemberService {
    @Autowired // 생성자가 하나면 생략 가능
    MemberRepository memberRepository;
    ...
  }

  // 생성자 주입 - 권장
  public class MemberService {
    MemberRepository memberRepository;

    public MemberService(MemberRepository memberRepository) {
      this.memberRepository = memberRepository;
    }
    ...
  }
  // 생성자 주입 - lombok
  @RequiredArgsConstructor
  public class MemberService {
    private final MemberRepository memberRepository;
    ...
  }
  ```

- join()
- findMembers()
- findOne()

## Test

- @RunWith(SpringRunner.class) : 스프링과 테스트 통합
- @SpringBootTest: 스프링 부트 띄우고 테스트 (없으면 @Autowired 실패)
- @Transactional: 반복 가능한 테스트 지원, 각각의 테스트를 실행할 때마다 트랜잭션을 시작하고 테스트가 끝나면 트랜잭션을 강제로 롤백

# MediaPipe PoseLandmarker

### Model

- Pose landmarker (lite) 3MB size
- Pose landmarker (Full) 6MB size
- Pose landmarker (Heavy) 26MB size

### Options

| Option Name                   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Value Range                 | Default Value |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- | ------------- |
| running mode                  | Sets the running mode for the task. The landmarker has the following modes: <br> <b>IMAGE</b>: The mode for recognizing pose landmarks on single image inputs. <br> <b>VIDEO</b>: The mode for recognizing pose landmarks on the decoded frames of a video. <br> <b>LIVE_STREAM</b>: The mode for recognizing pose landmarks on a live stream of input data, such as from camera. In this mode, you must call the <b>result_callback</b> listener to receive the segmentation results asynchronously. | {IMAGE, VIDEO, LIVE_STREAM} | IMAGE         |
| num_poses                     | The maximum number of poses that can be detected by the the Pose Landmarker.                                                                                                                                                                                                                                                                                                                                                                                                                          | Integer > 0                 | 1             |
| min_pose_detection_confidence | The minimum confidence score for the pose detection to be considered successful.                                                                                                                                                                                                                                                                                                                                                                                                                      | Float [0.0,1.0]             | 0.5           |
| min_pose_presence_confidence  | The minimum confidence score of pose presence score in the pose landmark detection.                                                                                                                                                                                                                                                                                                                                                                                                                   | Float [0.0,1.0]             | 0.5           |
| min_tracking_confidence       | The minimum confidence score for the pose tracking to be considered successful.                                                                                                                                                                                                                                                                                                                                                                                                                       | Float [0.0,1.0]             | 0.5           |
| output_segmentation_masks     | Whether Pose Landmarker outputs a segmentation mask for the detected pose.                                                                                                                                                                                                                                                                                                                                                                                                                            | Boolean                     | False         |
| result_callback               | Sets the result listener to receive the landmarker results asynchronously when Pose Landmarker is in the live stream mode. Can only be used when running mode is set to <b>LIVE_STREAM </b>                                                                                                                                                                                                                                                                                                           | ResultListener              | N/A           |

# Blazepose

[tfjs - pose detection](https://github.com/tensorflow/tfjs-models/tree/master/pose-detection)
