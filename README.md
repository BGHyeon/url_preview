
# React Native UrlMetadata
![아키텍처](./demo.gif)
## 소개
메타 데이터를 Native영역에서 요청하여 기존 JSThread나 UIThread에 영향없이 많은 URL의 메타 데이터를 수집할 수 있는 예제 프로젝트 입니다

## 개요

- React Native 기반의 채팅 앱 프로젝트
- Native Thread을 사용한 쓰레딩 처리
- BeautifulSoup를 사용한 html 파싱 

## 주요 기술 스택

- React Native
- TypeScript
- BeautifulSoup
- Kotlin (Android Native Module)
- Swift (Ios Native Module)

## 설치 및 실행 방법

1. 저장소 클론
   ```bash
   git clone https://github.com/yourname/chatapp.git
   cd chatapp
   ```

2. 의존성 설치
   ```bash
   npm install
   # or
   yarn install
   ```

3. ios인 경우 의존성 추가
   1. Xcode에서 프로젝트 열기 → 좌측 프로젝트 이름 선택
   2. Package Dependencies 탭 선택 → + 버튼 클릭
   3. https://github.com/scinfu/SwiftSoup.git 입력
   4. Version 선택 (최신 안정 버전) → Add Package 
   5. Target 선택 후 완료
<br><br>
4. 앱 실행
   ```bash
   npm run ios
   # or
   npm run android
   ```

## 프로젝트 구조

```
/src
  /components       # UI 컴포넌트
  /native           # 네이티브 모듈
```

## 주요 기능

- **멀티 쓰레딩**: URL의 메타 데이터 요청을 쓰레딩으로 관리
- **HTML 파싱**: BeautifulSoup를 사용여 html의 메타 데이터 파싱


