# CLAUDE.md

이 문서는 Claude 코드 도우미가 이 프로젝트에서 일관된 스타일과 아키텍처를 유지할 수 있도록 안내합니다.

---

## ✅ 프로젝트 개요
- **도메인**: 채용 플랫폼
- **아키텍처**: Layered Architecture
- **ORM**: Prisma 사용
- **순환 참조**: 순환 참조 발생 시 별도 공유 모듈(`@shared` 등)을 생성하여 분리 관리

---

## ✅ 코드 스타일 가이드

### 📁 레이어별 네이밍 규칙
- `Controller`, `Service` 계층:
    - 데이터 조회: `get`으로 시작 (`getApplicantList`, `getJobDetail`)
- `Repository` 계층:
    - 조회: `find` (`findById`, `findByEmail`)
    - 생성: `insert` (`insertApplicant`)
    - 수정: `update` (`updateJobStatus`)
    - 삭제: `delete` (`deleteResumeById`)

### 🧹 코드 포맷팅
- `Prettier` 사용
    - `.prettierrc` 설정에 따름
    - 파일 저장 시 자동 포맷팅 적용 권장

### 🚫 금지 사항
- `any` 타입 사용 금지 (구체적인 타입 또는 `unknown` 사용 권장)
- 암묵적 타입 추론보다는 명시적 타입 선언 지향

---

## 🔁 순환 참조 방지 전략
- 도메인 간 직접 참조 대신, `@shared` 또는 `@common` 디렉터리로 분리하여 공통 타입/로직 관리
- 예: `src/shared/dto/common.dto.ts`

---

## 📦 기타 규칙
- `Exception` 및 `ValidationPipe`, `Interceptor`는 전역 또는 공용 모듈에서 관리
- `DTO`는 `@nestjs/swagger` 사용하여 API 명세 작성

---

이 가이드는 Claude가 자동 리팩터링, 문맥 추천, 타입 제안 등을 할 때 참고하는 기준입니다.
