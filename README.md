# 2주차 과제: React Todo
# 서론

안녕하세요 🙌🏻 23기 프론트엔드 운영진 **원채영**입니다.

다들 1주차 미션인 Vanilla Todo를 만드시느라 수고 많으셨습니다! 1주차 미션을 통해 Vanilla JS로 SPA를 구현하면서 React를 사용하지 않을 때의 불편함을 느껴보셨을 것이라 생각합니다.

그리하여 이번 미션은, 1주차 스터디 미션으로 주어진 Todo list 만들기를 **React**로 리팩토링하는 것입니다❗️

기존에 React를 어느 정도 사용해보신 분들께는 더 효율적인 구조와 디자인 패턴을 고민해보는 주차가 될 것이고,
아직 React를 깊게 접해보지 못한 분들께는 기존 애플리케이션을 React로 포팅하는 과정을 통해 왜 React가 등장하게 되었는지, 그리고 React의 방식이 왜 Vanilla JS보다 효율적인지 체감해보는 주차가 될 것이라 생각합니다.

비교적 가벼운 미션인 만큼 코드를 짜는 데 있어 여러분의 **창의성**을 충분히 발휘해보시기 바랍니다. _❕작동하기만 하면 되는 것보다 같은 코드를 짜는 여러가지 방식과 패턴에 대해 많이 고민해보시고, 본인이 작성할 수 있는 가장 창의적인 방법으로 코드를 작성해주셨으면 합니다.❕_ 여러분이 미션을 수행하면서 한 고민과 선택들이 많을수록, 이번 스터디에서 더 많은 것을 얻어가실 수 있을 거라 기대합니다.

또한 이번 과제에서는 React 프로젝트 생성 시 **Vite 사용이 필수입니다.**
기존 React 프로젝트 생성 방식 중 하나였던 Create React App(CRA) 은 2025년에 공식적으로 지원 종료가 발표되었습니다.
추가로 공식 문서에서도 Vite 기반의 프로젝트 생성을 권장하고 있으며, 과제를 진행하면서 Vite를 활용한 프로젝트 환경 세팅, 빌드 툴, 번들링 등에 대해 자연스럽게 익혀보는 경험이 도움이 될 것이라 생각합니다.

과제를 진행하다가 막히는 부분이 있더라도, 우선은 스스로 공부하고 찾아보며 해결해보는 과정을 권장드립니다.
다만 미션과 관련해 운영진의 도움이 필요하다면, 언제든 프론트엔드 카카오톡방에 질문 남겨주세요!

# 미션

## 예시

- [리액트 투두 예시](https://react-todo-21th-snowy.vercel.app/)

## 미션 목표

- VSCode, Prettier를 이용하여 개발환경을 관리합니다.
- React의 기초를 이해합니다.
- React를 통한 어플리케이션 상태 관리 방법을 이해합니다.
- React Hooks에 대한 기초를 이해합니다. 
- Vite를 통한 React 프로젝트 개발환경 구축을 익힙니다.
- Tailwind CSS를 활용한 유틸리티 클래스 기반 스타일링 방식을 익힙니다.

## 기한

- 2026년 3월 21일 토요일 23:59까지

## Review Questions

- Virtual-DOM은 무엇이고, 이를 사용함으로서 얻는 이점은 무엇인가요?
- React.memo(), useMemo(), useCallback() 함수로 진행할 수 있는 리액트 렌더링 최적화에 대해 설명해주세요. 다른 방식이 있다면 이에 대한 소개도 좋습니다.
- React 컴포넌트 생명주기에 대해서 설명해주세요.

## 필수 요건
- 1주차 미션의 결과물을 그대로 React로 구현합니다. (‼️ todo / done 개수 잊지 마세요 ‼️)
- Tailwind CSS를 사용합니다
- React Hooks만을 사용해 상태를 관리합니다.(전역 상태관리 라이브러리 사용 XX) 
- Vite를 활용하여 React 프로젝트 환경 구축을 진행합니다

## 선택 요건

- 기존 Todo-list에 여러분들이 추가하고 싶은 기능과 디자인을 자유롭게 추가해보세요. 
- TypeScript를 활용하여 프로젝트를 진행해보세요.

## 로컬 실행방법
`npm run dev`: Vite 개발 서버를 실행하고, 변경 사항이 저장될 때마다 자동으로 반영됩니다.

# 링크 및 참고자료

- [create react app (CRA)](https://create-react-app.dev/docs/getting-started/)
- [리액트 docs 주요 개념 1-12](https://react.dev/learn)
- [리액트 docs Hook 1-3](https://react.dev/reference/react)
- [리액트 useEffect 완벽 가이드](https://overreacted.io/ko/a-complete-guide-to-useeffect/)
- [컴포넌트 네이밍을 위한 자바스크립트 네이밍 컨벤션](https://velog.io/@cada/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EC%8A%A4%ED%83%80%EC%9D%BC-%EA%B0%80%EC%9D%B4%EB%93%9C-%EB%84%A4%EC%9D%B4%EB%B0%8D-%EC%BB%A8%EB%B2%A4%EC%85%98-%ED%8E%B8)
- [useState, useEffect hooks](https://velog.io/@velopert/react-hooks#1-usestate)
- [tailwind 공식 문서](https://tailwindcss.com/docs/installation/using-vite)
- [vscode prettier 설정](https://velog.io/@gangk_99/VS-Code-Prettier-%EC%84%A4%EC%A0%95%ED%95%98%EA%B8%B0)
- [create react app (CRA) 지원종료 공식문서](https://react.dev/blog/2025/02/14/sunsetting-create-react-app) 
- [create react app 지원종료관련 okky 커뮤니티 게시글](https://okky.kr/articles/1527414) 
- [cra 대신에 vite로 React 프로젝트 시작하기](https://www.daleseo.com/vite-react/) 
- [Vite 실무 적용기 - 설명 + 프로젝트 설정](https://blog.hectodata.co.kr/bonjour-vite/)
