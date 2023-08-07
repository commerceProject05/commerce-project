# 슈퍼코딩 1주차 프론트엔드 팀프로젝트(커머스)
## 🚀프로젝트 요구사항
1. (필수) React, JavaScript 스택을 사용한다.
2. (선택) TypeScript, Next.js 스택을 사용한다.
3. (필수) Redux 또는 Context API를 통해 전역 상태를 관리한다.
4. (필수) 커스텀 훅을 통해 공통으로 사용하는 로직을 관리한다.
5. (선택) 스타일링은 styled-components 또는 tailwindcss 사용을 권장한다.
6. 프론트엔드 직군끼리 진행하는 프로젝트이므로 mock 데이터나 공공으로 쓸 수 있는 오픈 API 등을 사용한다.

## 🚀 네이밍 규칙
- 폴더명: 소문자만 사용 (ex) => hooks
- 함수명, 변수명: camelCase
- 컴포넌트, 생성자 함수, Class: PascalCase
- className: snake_case

## 🚀 코드
- api 연결: json 파일의 dummy data 사용
- css 적용: styled-components 사용
- 코드는 최대한 함수형으로 작성

## 🚀 커밋 컨벤션
- 기능 별로 커밋(최대한 상세히)
- pull request시에는 팀원들과 이야기
- feat **#이슈번호** : 새로운 기능 추가
- fix **#이슈번호** : 버그 수정
- style **#이슈번호** : 스타일 수정
- docs **#이슈번호** : 문서 수정
- test **#이슈번호** : 테스트 코드 추가
- refactor **#이슈번호** : 코드 리펙토링

## 🚀 Git Branch 전략
- 브랜치명은 camelCase로 작성 (ex) => infiniteScroll
- main: 기준이 되는 브랜치로 제품을 배포하는 브랜치
- dev: 개발 브랜치로 개발자들이 이 브랜치를 기준으로 각자 작업한 기능들을 Merge
- 각 기능명: 단위 기능을 개발하는 브랜치로 기능 개발이 완료되면 **dev 브랜치에 Merge**
- [참조]: https://velog.io/@kw2577/Git-branch-%EC%A0%84%EB%9E%B5
