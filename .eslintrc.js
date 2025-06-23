module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off', // (deprecated) 인터페이스 이름을 'IUser'처럼 'I'로 시작하도록 강제하는 규칙
    '@typescript-eslint/explicit-function-return-type': 'off', // 함수의 반환 타입을 명시적으로 지정하도록 강제하는 규칙
    '@typescript-eslint/explicit-module-boundary-types': 'off', // 외부로 노출되는 함수(export)의 반환 타입을 명시하도록 강제
    '@typescript-eslint/no-explicit-any': 'off', // 'any' 타입 사용을 금지하는 규칙

    // Prettier 코드 포맷팅 규칙을 ESLint 오류로 처리
    'prettier/prettier': [
      'error',
      {
        semi: true,              // 명령문 끝에 세미콜론 사용
        tabWidth: 4,             // 들여쓰기 시 공백 4칸 사용
        useTabs: false,          // 탭 대신 공백 사용
        singleQuote: true,       // 문자열에 작은따옴표 사용
        trailingComma: 'all',    // 가능한 경우 항상 후행 쉼표 사용 (예: 객체 마지막 요소 뒤)
        printWidth: 100          // 한 줄 최대 길이 제한 (자동 줄바꿈 기준)
      },
    ],
  }
};
