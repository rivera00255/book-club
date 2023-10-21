# Book Club

도서 검색 및 독서감상문 기록

### 🌱 1. 설치 및 실행 방법

- .env

```
POSTGRES_URL=""
POSTGRES_PRISMA_URL=""
POSTGRES_URL_NON_POOLING=""

BLOB_READ_WRITE_TOKEN=""

LIBRARY_URL=""
LIBRARY_AUTH_KEY=""
```

- 설치 및 샐행

```
npm install
npm run dev
```

### ✨ 2. 구현 목록

- [x] 인기 대출 도서 목록 조회
- [x] 책 제목 또는 저자명으로 검색
      검색 결과에서 해당 도서 소장 도서관 목록 확인
- [x] 독서감상문 기록, 조회, 수정, 삭제
      wysiwyg 에디터에서 이미지 첨부
      마이페이지에서 내가 작성한 글 목록 확인
- [x] 회원가입 및 탈퇴, 로그인 / 로그아웃

### 💚 3. 사용한 프레임워크 및 라이브러리

Next, Typscript, Sass, Prisma, Toast UI Editor, Next Auth, Redux Toolkit, Vercel Blob
